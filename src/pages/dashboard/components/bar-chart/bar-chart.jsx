import React from "react";
import styles from "./bar-chart.module.css";

const BarChart = ({
  data,
  width = 600,
  height = 400,
  barColor = "#36A2EB",
  axisColor = "#666",
  labelColor = "#333",
  showValues = true,
  padding = 40,
}) => {
  // Calculate maximum value for scaling
  const maxValue = Math.max(...data.map((item) => item.value), 0);

  // Calculate dimensions
  const graphWidth = width - padding * 2;
  const graphHeight = height - padding * 2;
  const barWidth = (graphWidth / data.length) * 0.7;
  const gapWidth = (graphWidth / data.length) * 0.3;

  // Generate bars
  const bars = data.map((item, index) => {
    const barHeight = maxValue > 0 ? (item.value / maxValue) * graphHeight : 0;
    const x = padding + index * (barWidth + gapWidth);
    const y = height - padding - barHeight;

    return (
      <g key={index}>
        <rect
          x={x}
          y={y}
          width={barWidth}
          height={barHeight}
          fill={item.color || barColor}
          className={styles.bar}
        />
        {showValues && (
          <text
            x={x + barWidth / 2}
            y={y - 5}
            textAnchor="middle"
            fill={labelColor}
            className={styles.valueLabel}
          >
            {item.value}
          </text>
        )}
        <text
          x={x + barWidth / 2}
          y={height - padding / 2}
          textAnchor="middle"
          fill={labelColor}
          className={styles.axisLabel}
        >
          {item.label}
        </text>
      </g>
    );
  });

  // Generate y-axis ticks
  const numTicks = 5;
  const ticks = [];
  for (let i = 0; i <= numTicks; i++) {
    const value = (maxValue / numTicks) * i;
    const y = height - padding - (value / maxValue) * graphHeight;

    ticks.push(
      <g key={`tick-${i}`}>
        <line
          x1={padding - 5}
          y1={y}
          x2={padding}
          y2={y}
          stroke={axisColor}
          className={styles.tick}
        />
        <text
          x={padding - 10}
          y={y + 4}
          textAnchor="end"
          fill={labelColor}
          className={styles.tickLabel}
        >
          {Math.round(value)}
        </text>
      </g>
    );
  }

  return (
    <div className={styles.container}>
      <svg width={width} height={height} className={styles.graph}>
        {/* Background */}
        <rect width={width} height={height} fill="#f9f9f9" rx="4" />

        {/* Bars and labels */}
        {bars}

        {/* Axes */}
        <line
          x1={padding}
          y1={height - padding}
          x2={width - padding}
          y2={height - padding}
          stroke={axisColor}
          strokeWidth="1.5"
          className={styles.axis}
        />
        <line
          x1={padding}
          y1={height - padding}
          x2={padding}
          y2={padding / 2}
          stroke={axisColor}
          strokeWidth="1.5"
          className={styles.axis}
        />

        {/* Y-axis ticks */}
        {ticks}

        {/* Optional title */}
        {data.title && (
          <text
            x={width / 2}
            y={padding / 2}
            textAnchor="middle"
            fill={labelColor}
            className={styles.title}
          >
            {data.title}
          </text>
        )}
      </svg>
    </div>
  );
};

export default BarChart;
