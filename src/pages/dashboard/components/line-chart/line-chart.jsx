import React from "react";
import styles from "./line-chart.module.css";

const LineChart = ({
  data,
  width = 600,
  height = 400,
  lineColor = "#4BC0C0",
  dotColor = "#FF6384",
  axisColor = "#666",
  labelColor = "#333",
  padding = 40,
  strokeWidth = 2.5,
  showDots = true,
  showArea = false,
  gridLines = true,
}) => {
  // Calculate maximum value for scaling
  const maxValue = Math.max(...data.map((item) => item.value), 0);
  const minValue = Math.min(...data.map((item) => item.value), 0);
  const valueRange = maxValue - minValue;

  // Calculate dimensions
  const graphWidth = width - padding * 2;
  const graphHeight = height - padding * 2;

  // Generate path data
  let pathData = "";
  let areaData = `M ${padding} ${height - padding} `;

  data.forEach((item, index) => {
    const x = padding + (index / (data.length - 1)) * graphWidth;
    const y =
      height - padding - ((item.value - minValue) / valueRange) * graphHeight;

    if (index === 0) {
      pathData += `M ${x} ${y} `;
      areaData += `L ${x} ${y} `;
    } else {
      pathData += `L ${x} ${y} `;
      areaData += `L ${x} ${y} `;
    }
  });

  areaData += `L ${padding + graphWidth} ${height - padding} Z`;

  // Generate dots
  const dots = showDots
    ? data.map((item, index) => {
        const x = padding + (index / (data.length - 1)) * graphWidth;
        const y =
          height -
          padding -
          ((item.value - minValue) / valueRange) * graphHeight;

        return (
          <circle
            key={index}
            cx={x}
            cy={y}
            r="5"
            fill={dotColor}
            className={styles.dot}
          />
        );
      })
    : null;

  // Generate y-axis ticks
  const numTicks = 5;
  const ticks = [];
  for (let i = 0; i <= numTicks; i++) {
    const value = minValue + (valueRange / numTicks) * i;
    const y =
      height - padding - ((value - minValue) / valueRange) * graphHeight;

    ticks.push(
      <g key={`tick-${i}`}>
        {gridLines && (
          <line
            x1={padding}
            y1={y}
            x2={width - padding}
            y2={y}
            stroke="#eee"
            className={styles.gridLine}
          />
        )}
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
          {Math.round(value * 10) / 10}
        </text>
      </g>
    );
  }

  return (
    <div className={styles.container}>
      <svg width={width} height={height} className={styles.graph}>
        {/* Background */}
        <rect width={width} height={height} fill="#f9f9f9" rx="4" />

        {/* Area fill (optional) */}
        {showArea && (
          <path
            d={areaData}
            fill={lineColor}
            fillOpacity="0.2"
            className={styles.area}
          />
        )}

        {/* Grid lines */}
        {gridLines && (
          <line
            x1={padding}
            y1={height - padding}
            x2={width - padding}
            y2={height - padding}
            stroke="#eee"
            className={styles.gridLine}
          />
        )}

        {/* Line path */}
        <path
          d={pathData}
          fill="none"
          stroke={lineColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={styles.line}
        />

        {/* Dots (optional) */}
        {dots}

        {/* X-axis labels */}
        {data.map((item, index) => {
          const x = padding + (index / (data.length - 1)) * graphWidth;
          return (
            <text
              key={`label-${index}`}
              x={x}
              y={height - padding / 2}
              textAnchor="middle"
              fill={labelColor}
              className={styles.axisLabel}
            >
              {item.label}
            </text>
          );
        })}

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

export default LineChart;
