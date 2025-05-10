// LoadingSpinner.jsx
import React from "react";
import styles from "./loading.module.css";

export const LoadingSpinner = () => {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.spinner}></div>
    </div>
  );
};
