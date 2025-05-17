"use client";

import styles from "./course-card.module.css";
import { Monitor, Book, DollarSign } from "lucide-react";

const categoryIcons = {
  technology: <Monitor />,
  education: <Book />,
  business: <DollarSign />,
};

export default function CourseCard({ course, onViewDetails }) {
  return (
    <div className={styles.courseCard}>
      <div className={`${styles.courseIcon} ${styles[course.category]}`}>
        {categoryIcons[course.category]}
      </div>
      <div className={styles.courseContent}>
        <div className={styles.courseHeader}>
          <h3>{course.title}</h3>
          <button onClick={onViewDetails}>View Details</button>
        </div>
        <div className={styles.courseMeta}>
          <span>{course.college}</span>
          <span>⏱️ {course.date}</span>
        </div>
        <p>{course.description}</p>
        <div className={styles.courseStats}>
          <span>
            👥 {course.enrolled}/{course.seats} enrolled
          </span>
          <span>📅 Deadline: {course.deadline}</span>
        </div>
      </div>
    </div>
  );
}
