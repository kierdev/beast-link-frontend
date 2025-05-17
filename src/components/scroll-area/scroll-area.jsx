"use client";

import styles from "./scroll-area.module.css";

export default function ScrollArea({ children, maxHeight = "400px" }) {
  return (
    <div className={styles.scrollArea} style={{ maxHeight }}>
      <div className={styles.scrollContent}>{children}</div>
    </div>
  );
}
