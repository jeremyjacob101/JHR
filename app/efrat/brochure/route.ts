import { readFile } from "node:fs/promises";
import { join } from "node:path";
import {
  EFRAT_BROCHURE_FILENAME,
  EFRAT_BROCHURE_PATH,
} from "@/lib/efrat";

export async function GET() {
  const brochureFile = join(
    process.cwd(),
    "public",
    EFRAT_BROCHURE_PATH.replace(/^\//, ""),
  );
  const file = await readFile(brochureFile);

  return new Response(file, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${EFRAT_BROCHURE_FILENAME}"`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
