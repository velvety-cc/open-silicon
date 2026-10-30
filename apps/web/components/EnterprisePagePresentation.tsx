"use client";

import { useState, type ReactNode } from "react";
import styles from "./EnterprisePage.module.css";

export default function EnterprisePagePresentation({ children }: { children: ReactNode }) {
  const [input, setInput] = useState<"pointer" | "keyboard">("pointer");

  return (
    <div
      className={styles.page}
      data-composition="enterprise"
      data-input={input}
      onKeyDownCapture={() => setInput("keyboard")}
      onPointerDownCapture={() => setInput("pointer")}
    >
      {children}
    </div>
  );
}
