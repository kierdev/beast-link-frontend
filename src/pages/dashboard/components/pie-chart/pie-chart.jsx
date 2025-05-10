import React from "react";
import styles from "./pie-chart.module.css";

const PieChart = ({ data, width = 200, height = 200 }) => {
  // Check if data is an array
  if (!Array.isArray(data)) {
    console.error("Data provided to PieChart is not an array");
    return null;
  }

  // Calculate total value for percentage calculations
  const total = data.reduce((sum, item) => sum + item.value, 0);

  // Generate SVG path data for each segment
  let cumulativePercent = 0;

  const segments = data.map((item, index) => {
    const percent = item.value / total;
    const startX = Math.cos(2 * Math.PI * cumulativePercent);
    const startY = Math.sin(2 * Math.PI * cumulativePercent);
    cumulativePercent += percent;
    const endX = Math.cos(2 * Math.PI * cumulativePercent);
    const endY = Math.sin(2 * Math.PI * cumulativePercent);

    // Large arc flag (1 if percent > 0.5, 0 otherwise)
    const largeArcFlag = percent > 0.5 ? 1 : 0;

    // Create path data
    const pathData = [
      `M ${width / 2} ${height / 2}`, // Move to center
      `L ${width / 2 + (startX * width) / 2} ${
        height / 2 + (startY * height) / 2
      }`, // Line to start point
      `A ${width / 2} ${height / 2} 0 ${largeArcFlag} 1 ${
        width / 2 + (endX * width) / 2
      } ${height / 2 + (endY * height) / 2}`, // Arc
      "Z", // Close path back to center
    ].join(" ");

    // Check if pathData is valid
    if (pathData.includes("NaN")) {
      console.error("Invalid path data generated for PieChart");
      return null;
    }

    return (
      <path
        key={index}
        d={pathData}
        fill={item.color || getDefaultColor(index)}
        className={styles.segment}
      />
    );
  });

  // Generate legend
  const legendItems = data.map((item, index) => (
    <div key={index} className={styles.legendItem}>
      <div
        className={styles.legendColor}
        style={{ backgroundColor: item.color || getDefaultColor(index) }}
      />
      <span className={styles.legendLabel}>
        {item.label}: {item.value} ({((item.value / total) * 100).toFixed(1)}%)
      </span>
    </div>
  ));

  return (
    <div className={styles.pieChartContainer}>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className={styles.pieChart}
      >
        {segments}
      </svg>
      <div className={styles.legend}>{legendItems}</div>
    </div>
  );
};

// Helper function for default colors
function getDefaultColor(index) {
  const colors = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4BC0C0",
    "#9966FF",
    "#FF9F40",
    "#8AC24A",
    "#F06292",
  ];
  return colors[index % colors.length];
}

export default PieChart;
