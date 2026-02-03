"use client";

import Image from "next/image";
import styles from "../app/page.module.css";

export default function EmailUsTab() {
  return (
    <a
      href="mailto:office@jhrisrael.com?subject=Inquiry%20from%20JHR%20website"
      className={styles.tab}
      aria-label="Email us"
    >
      <span className={styles.inner}>
        <span className={styles.icon} aria-hidden="true">
          <Image
            src="/icons/email-symbol-logo.svg"
            alt=""
            width={40}
            height={40}
          />
        </span>
        <span className={styles.label}>Email Us</span>
      </span>
    </a>
  );
}
