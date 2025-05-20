import React from "react";
import styles from "./interview-results-graph.module.css";

const InterviewResultsGraph = ({ data }) => {
  const maxTotal = Math.max(
    ...data.map((item) => item.passed + item.failed),
    10
  );

  return (
    <div className={styles.graphContainer}>
      <h2 className={styles.title}>Interview Results by Program</h2>
      <div className={styles.graph}>
        {data.map((program) => {
          const passedHeight = ((program.passed / maxTotal) * 100).toFixed(2);
          const failedHeight = ((program.failed / maxTotal) * 100).toFixed(2);

          return (
            <div key={program.name} className={styles.barContainer}>
              <div className={styles.barWrapper}>
                <div
                  className={`${styles.bar} ${styles.passedBar}`}
                  style={{ height: `${passedHeight}%` }}
                  title={`Passed: ${program.passed}`}
                >
                  {program.passed > 0 && (
                    <span className={styles.passedLabel}>{program.passed}</span>
                  )}
                </div>
                <div
                  className={`${styles.bar} ${styles.failedBar}`}
                  style={{ height: `${failedHeight}%` }}
                  title={`Failed: ${program.failed}`}
                >
                  {program.failed > 0 && (
                    <span className={styles.failedLabel}>{program.failed}</span>
                  )}
                </div>
              </div>
              <div className={styles.programLabel}>{program.name}</div>
              <div className={styles.totalLabel}>
                Total: {program.passed + program.failed}
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <span
            className={`${styles.legendColor} ${styles.passedLegend}`}
          ></span>
          <span>Passed</span>
        </div>
        <div className={styles.legendItem}>
          <span
            className={`${styles.legendColor} ${styles.failedLegend}`}
          ></span>
          <span>Failed</span>
        </div>
      </div>
    </div>
  );
};

// Default props in case none are provided
InterviewResultsGraph.defaultProps = {
  data: [
    { name: "CS", passed: 45, failed: 55 },
    { name: "Business", passed: 60, failed: 40 },
    { name: "Engineering", passed: 35, failed: 65 },
    { name: "Arts", passed: 70, failed: 30 },
    { name: "Medicine", passed: 25, failed: 75 },
  ],
};

export default InterviewResultsGraph;
