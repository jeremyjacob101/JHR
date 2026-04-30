import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  EFRAT_BROCHURE_DOWNLOAD_PATH,
  EFRAT_CALENDLY_URL,
  EFRAT_OFFICE_EMAIL,
} from "@/lib/efrat";

type ContactPayload = Record<string, unknown>;

function textField(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function absoluteUrl(href: string, origin: string) {
  try {
    return new URL(href, origin).toString();
  } catch {
    return href;
  }
}

function isEfratLead(body: ContactPayload) {
  const page = textField(body.page).toLowerCase();
  const project = textField(body.project).toLowerCase();
  return page === "efrat" || project === "efrat";
}

function requestOrigin(req: Request) {
  const configuredOrigin =
    process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "";

  if (configuredOrigin) return configuredOrigin;

  try {
    return new URL(req.url).origin;
  } catch {
    return "https://jhrisrael.com";
  }
}

async function sendEfratFollowUps(body: ContactPayload, origin: string) {
  const apiKey = process.env.JHR_RESEND_API_KEY_1 || process.env.RESEND_API_KEY;
  if (!apiKey) return;

  const resend = new Resend(apiKey);
  const firstName = textField(body.firstName) || "there";
  const lastName = textField(body.lastName);
  const fullName =
    textField(body.name) || [firstName, lastName].filter(Boolean).join(" ");
  const email = textField(body.email);
  const phone = textField(body.phone);
  const buyerType = textField(body.buyerType) || "Not provided";
  const source = textField(body.source) || "Efrat landing page";
  const from =
    process.env.JHR_EMAIL_FROM ||
    process.env.RESEND_FROM ||
    `Jerusalem Heritage Realty <${EFRAT_OFFICE_EMAIL}>`;
  const notifyTo = (
    process.env.JHR_LEAD_NOTIFY_EMAILS ||
    "nm@jhrisrael.com,yaakov@jhrisrael.com,office@jhrisrael.com"
  )
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  const brochureUrl = absoluteUrl(
    process.env.EFRAT_BROCHURE_URL ||
      process.env.NEXT_PUBLIC_EFRAT_BROCHURE_URL ||
      EFRAT_BROCHURE_DOWNLOAD_PATH,
    origin,
  );
  const pricingUrl = absoluteUrl(
    process.env.EFRAT_PRICING_URL ||
      process.env.NEXT_PUBLIC_EFRAT_PRICING_URL ||
      "/efrat/thank-you#pricing-summary",
    origin,
  );
  const scheduleUrl =
    process.env.EFRAT_CALENDLY_URL ||
    process.env.NEXT_PUBLIC_EFRAT_CALENDLY_URL ||
    EFRAT_CALENDLY_URL;

  const safeFirstName = escapeHtml(firstName);
  const safeFullName = escapeHtml(fullName || "Unknown lead");
  const safeEmail = escapeHtml(email || "Not provided");
  const safePhone = escapeHtml(phone || "Not provided");
  const safeBuyerType = escapeHtml(buyerType);
  const safeSource = escapeHtml(source);

  const sends = [];

  if (email) {
    sends.push(
      resend.emails.send({
        from,
        to: email,
        replyTo: EFRAT_OFFICE_EMAIL,
        subject: "Your Efrat brochure and project details",
        html: `
          <p>Hi ${safeFirstName},</p>
          <p>Thank you for your interest in the Efrat project.</p>
          <p>You can access the brochure and project details below:</p>
          <p><a href="${brochureUrl}">Download Brochure</a></p>
          <p><a href="${pricingUrl}">View Pricing Summary</a></p>
          <p><a href="${scheduleUrl}">Schedule a Call</a></p>
          <p>This opportunity is in the Zayit neighborhood of Efrat, with pricing starting at only 1.8M NIS and from 20,000 NIS per sqm.</p>
          <p>If you'd like, reply to this email or contact us directly.</p>
          <p>
            Best,<br />
            Natanel Moshe Junger<br />
            +972-58-320-5970<br />
            nm@jhrisrael.com
          </p>
          <p>
            Yaakov Mechlovitz<br />
            +972-52-616-6178<br />
            yaakov@jhrisrael.com
          </p>
          <p>Jerusalem Heritage Realty</p>
        `,
        text: `Hi ${firstName},

Thank you for your interest in the Efrat project.

You can access the brochure and project details below:

Download Brochure
${brochureUrl}

View Pricing Summary
${pricingUrl}

Schedule a Call
${scheduleUrl}

This opportunity is in the Zayit neighborhood of Efrat, with pricing starting at only 1.8M NIS and from 20,000 NIS per sqm.

If you'd like, reply to this email or contact us directly.

Best,
Natanel Moshe Junger
+972-58-320-5970
nm@jhrisrael.com

Yaakov Mechlovitz
+972-52-616-6178
yaakov@jhrisrael.com

Jerusalem Heritage Realty`,
      }),
    );
  }

  if (notifyTo.length > 0) {
    sends.push(
      resend.emails.send({
        from,
        to: notifyTo,
        replyTo: email || EFRAT_OFFICE_EMAIL,
        subject: `New Efrat lead: ${fullName || "Website lead"}`,
        html: `
          <p>A new Efrat landing page lead was submitted.</p>
          <ul>
            <li><strong>Name:</strong> ${safeFullName}</li>
            <li><strong>Email:</strong> ${safeEmail}</li>
            <li><strong>Phone:</strong> ${safePhone}</li>
            <li><strong>Buyer Type:</strong> ${safeBuyerType}</li>
            <li><strong>Source:</strong> ${safeSource}</li>
          </ul>
        `,
        text: `A new Efrat landing page lead was submitted.

Name: ${fullName || "Unknown lead"}
Email: ${email || "Not provided"}
Phone: ${phone || "Not provided"}
Buyer Type: ${buyerType}
Source: ${source}`,
      }),
    );
  }

  const results = await Promise.allSettled(sends);
  results.forEach((result) => {
    if (result.status === "rejected") {
      console.error("Efrat follow-up email failed:", result.reason);
      return;
    }

    if (result.value.error) {
      console.error("Efrat follow-up email returned error:", result.value.error);
    }
  });
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ContactPayload;

    const endpoint = process.env.GOOGLE_SHEET_WEB_APP_URL;
    const secret = process.env.GOOGLE_SHEET_SECRET;

    if (!endpoint || !secret) {
      return NextResponse.json(
        { error: "Missing GSHEET_WEBAPP_URL or GSHEET_SECRET in env vars" },
        { status: 500 }
      );
    }

    const resp = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...body, secret, page: body?.page || "contact" }),
      redirect: "follow",
    });

    const raw = await resp.text();

    let data: { ok?: boolean; error?: unknown } | null = null;
    try {
      data = JSON.parse(raw);
    } catch {
      // not JSON (often HTML from Google auth/deploy issues)
    }

    if (!resp.ok) {
      return NextResponse.json(
        { error: `Apps Script HTTP ${resp.status}`, details: raw.slice(0, 500) },
        { status: 500 }
      );
    }

    if (!data || data.ok !== true) {
      return NextResponse.json(
        {
          error: "Apps Script returned not-ok",
          details:
            typeof data?.error === "string" ? data.error : raw.slice(0, 500),
        },
        { status: 500 }
      );
    }

    if (isEfratLead(body)) {
      await sendEfratFollowUps(body, requestOrigin(req));
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
