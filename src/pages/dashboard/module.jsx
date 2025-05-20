import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './dashboard.module.css';

const ModuleNotice = ({ moduleName = "Other System Module" }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.iconContainer}>
          <div className={styles.icon}>🚧</div>
        </div>
        <h2 className={styles.title}>{moduleName}</h2>
        <p className={styles.message}>
          This route is part of the <strong>{moduleName}</strong> system.
          <br />
          Please navigate to the appropriate section to access this feature.
        </p>
        <div className={styles.buttonGroup}>
          <button 
            className={`${styles.button} ${styles.primaryButton}`}
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
          <button 
            className={`${styles.button} ${styles.secondaryButton}`}
            onClick={() => navigate('/dashboard/applicant')}
          >
            Return Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModuleNotice;