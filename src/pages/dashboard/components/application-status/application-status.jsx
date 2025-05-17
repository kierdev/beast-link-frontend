"use client";

import { useState } from "react";
import styles from "./application-status.module.css";

export default function ApplicationStatus({ applications }) {
  const [activeStatus, setActiveStatus] = useState("pending");

  const filteredApplications = applications.filter(
    (app) => app.status === activeStatus
  );

  return (
    <div className={styles.sectionCard}>
      <h2>Application Status</h2>
      <div className={styles.statusTabs}>
        <button
          className={`${styles.statusTab} ${
            activeStatus === "pending" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveStatus("pending")}
        >
          Pending
        </button>
        <button
          className={`${styles.statusTab} ${
            activeStatus === "approved" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveStatus("approved")}
        >
          Approved
        </button>
        <button
          className={`${styles.statusTab} ${
            activeStatus === "rejected" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveStatus("rejected")}
        >
          Rejected
        </button>
      </div>

      {filteredApplications.length > 0 ? (
        <div className={styles.statusList}>
          {filteredApplications.map((app) => (
            <div key={app.id} className={styles.statusItem}>
              <div>
                <h3>{app.courseTitle || "Unknown Course"}</h3>
                <p>Applied: {app.submittedDate}</p>
                {app.documents && <p>Documents: {app.documents.join(", ")}</p>}
              </div>
              <span className={`${styles.statusBadge} ${styles[app.status]}`}>
                {app.status}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className={styles.emptyState}>
          No {activeStatus} applications found
        </p>
      )}
    </div>
  );
}
