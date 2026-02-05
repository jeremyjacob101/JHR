"use client";

import Image from "next/image";
import styles from "../app/page.module.css";

export default function ScheduleCallTab() {
  return (
    <a
      href="https://calendly.com/nm-jhrisrael/25min"
      target="_blank"
      rel="noopener noreferrer"
      className={styles.tabRight}
      aria-label="Schedule a call"
    >
      <span className={styles.innerRight}>
        <span className={styles.iconRight}>
          <Image
            src="/icons/calendly-logo.svg"
            alt="Calendly logo"
            width={42}
            height={42}
          />
        </span>
        <span className={styles.labelRight}>Schedule a Call</span>
      </span>
    </a>
  );
}
