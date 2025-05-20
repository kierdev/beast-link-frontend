import React, { useState } from "react";
import styles from "./interview-calendar.module.css";

const InterviewCalendar = ({ interviews, onDateClick }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const month = currentDate.toLocaleString("default", { month: "long" });
  const year = currentDate.getFullYear();

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const renderDays = () => {
    const days = [];
    const today = new Date();
    const todayString = today.toISOString().split("T")[0];

    // Add empty cells for days before the first day of month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className={styles.emptyDay}></div>);
    }

    // Add actual days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day
      );
      const dateString = date.toISOString().split("T")[0];

      // Filter interviews for this date
      const dayInterviews = interviews.filter(
        (interview) => interview.date === dateString
      );

      const isToday = dateString === todayString;

      days.push(
        <div
          key={`day-${day}`}
          className={`${styles.calendarDay} ${isToday ? styles.today : ""} ${
            dayInterviews.length > 0 ? styles.hasInterviews : ""
          }`}
          onClick={() => onDateClick(dateString)}
        >
          <div className={styles.dayNumber}>{day}</div>
          {dayInterviews.length > 0 && (
            <div className={styles.interviewBadge}>
              {dayInterviews.length} interview
              {dayInterviews.length !== 1 ? "s" : ""}
            </div>
          )}
          {dayInterviews.length > 0 && (
            <div className={styles.interviewList}>
              {dayInterviews.slice(0, 2).map((interview, idx) => (
                <div key={idx} className={styles.interviewItem}>
                  <span className={styles.applicantName}>
                    {interview.applicant.split(" ")[0]}
                  </span>
                  <span className={styles.programName}>
                    {interview.program.split(" ")[0]}
                  </span>
                </div>
              ))}
              {dayInterviews.length > 2 && (
                <div className={styles.moreItems}>
                  +{dayInterviews.length - 2} more
                </div>
              )}
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.calendarHeader}>
        <button onClick={prevMonth} className={styles.navButton}>
          &lt; Previous
        </button>
        <h2 className={styles.monthTitle}>
          {month} {year}
        </h2>
        <button onClick={nextMonth} className={styles.navButton}>
          Next &gt;
        </button>
      </div>

      <button onClick={goToToday} className={styles.todayButton}>
        Go to Today
      </button>

      <div className={styles.weekdays}>
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className={styles.weekday}>
            {day}
          </div>
        ))}
      </div>

      <div className={styles.calendarGrid}>{renderDays()}</div>
    </div>
  );
};

InterviewCalendar.defaultProps = {
  interviews: [
    {
      date: new Date().toISOString().split("T")[0],
      applicant: "John Doe",
      program: "Computer Science",
    },
    {
      date: new Date().toISOString().split("T")[0],
      applicant: "Alice Johnson",
      program: "Medicine",
    },
    {
      date: new Date(Date.now() + 86400000).toISOString().split("T")[0],
      applicant: "Jane Smith",
      program: "Business Administration",
    },
    {
      date: new Date(Date.now() + 86400000).toISOString().split("T")[0],
      applicant: "Mike Brown",
      program: "Electrical Engineering",
    },
    {
      date: new Date(Date.now() + 86400000 * 3).toISOString().split("T")[0],
      applicant: "Sarah Williams",
      program: "Law",
    },
  ],
  onDateClick: (date) => console.log("Date clicked:", date),
};

export default InterviewCalendar;
