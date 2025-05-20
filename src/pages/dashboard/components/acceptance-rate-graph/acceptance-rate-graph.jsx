import React from "react";
import styles from "./acceptance-rate-graph.module.css";

const AcceptanceRateGraph = ({ data }) => {
  // Calculate maximum rate for scaling
  const maxRate = Math.max(...data.map((item) => item.acceptanceRate), 0);

  return (
    <div className={styles.graphContainer}>
      <h2 className={styles.title}>Program Acceptance Rates</h2>
      <div className={styles.graph}>
        {data.map((program) => {
          const barHeight =
            maxRate > 0 ? (program.acceptanceRate / maxRate) * 100 : 0;

          return (
            <div key={program.name} className={styles.barContainer}>
              <div className={styles.barWrapper}>
                <div
                  className={styles.bar}
                  style={{ height: `${barHeight}%` }}
                  title={`${program.acceptanceRate}%`}
                >
                  <span className={styles.rateLabel}>
                    {program.acceptanceRate}%
                  </span>
                </div>
              </div>
              <div className={styles.programLabel}>{program.name}</div>
            </div>
          );
        })}
      </div>
      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <span className={styles.legendColor}></span>
          <span>Acceptance Rate</span>
        </div>
      </div>
    </div>
  );
};

// Default props in case none are provided
AcceptanceRateGraph.defaultProps = {
  data: [
    { name: "Computer Science", acceptanceRate: 15 },
    { name: "Business", acceptanceRate: 25 },
    { name: "Engineering", acceptanceRate: 20 },
    { name: "Arts", acceptanceRate: 40 },
    { name: "Medicine", acceptanceRate: 10 },
  ],
};

export default AcceptanceRateGraph;
