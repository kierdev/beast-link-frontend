"use client";

import styles from "./progress-tracker.module.css";

const steps = [
  { label: "Application", key: "application" },
  { label: "Document", key: "document" },
  { label: "Exam", key: "exam" },
  { label: "Interview", key: "interview" },
  { label: "Decision", key: "decision" },
  { label: "Enrollment", key: "enrollment" },
];

export default function ProgressTracker({ currentStep = "application" }) {
  const currentIndex = steps.findIndex((step) => step.key === currentStep);

  return (
    <div className={styles.progressTracker}>
      <div className={styles.progressLine}></div>
      {steps.map((step, index) => {
        let status;
        if (index < currentIndex) status = "completed";
        else if (index === currentIndex) status = "current";
        else status = "upcoming";

        return (
          <div key={step.key} className={styles.progressStep}>
            <div className={`${styles.stepCircle} ${styles[status]}`}>
              {status === "completed" && "✓"}
            </div>
            <div className={styles.stepLabel}>{step.label}</div>
          </div>
        );
      })}
    </div>
  );
}
