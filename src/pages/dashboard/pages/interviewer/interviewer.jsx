"use client";

import { useState, useEffect } from "react";
import styles from "./interviewer.module.css";
import NotificationsDropdown from "../../components/notifications/notifications";
import Sidebar from "../../../../components/side-bar/side-bar";
import { Bell } from "lucide-react";
import { LoadingSpinner } from "../../../../components/loading/loading";
import {
  Calendar as CalendarIcon,
  CheckCircle,
  XCircle,
  Edit2,
  Clock,
  MapPin,
  Pen,
} from "lucide-react";
import { getInterviewerDashboardData } from "../../../../data/dashboard-service";
import InterviewCalendar from "../../components/interview-calendar/interview-calendar";
import ScrollArea from "../../../../components/scroll-area/scroll-area";

export default function InterviewerDashboard() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [showNotifications, setShowNotifications] = useState(false);
  const [stats, setStats] = useState(null);
  const [upcomingInterviews, setUpcomingInterviews] = useState([]);
  const [pendingRemarks, setPendingRemarks] = useState([]);
  const [completedInterviews, setCompletedInterviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getInterviewerDashboardData();
        const {
          dashboardStats,
          upcomingInterviews,
          pendingRemarks,
          completedInterviews,
        } = response;

        setStats(dashboardStats);
        setUpcomingInterviews(upcomingInterviews);
        setPendingRemarks(pendingRemarks);
        setCompletedInterviews(completedInterviews);
      } catch (error) {
        console.error("Error fetching interviewer data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const getCalendarInterviews = () => {
    return [...upcomingInterviews, ...pendingRemarks, ...completedInterviews].map(interview => ({
      date: interview.date,
      applicant: interview.name,
      program: interview.program,
      time: interview.time,
      location: interview.location,
      status: interview.status,
      id: interview.id
    }));
  };

  const getDateInterviews = () => {
    if (!selectedDate) return [];
    return [...upcomingInterviews, ...pendingRemarks].filter(
      interview => interview.date === selectedDate
    );
  };

  const getActiveTabData = () => {
    switch (activeTab) {
      case "upcoming":
        return upcomingInterviews;
      case "pending":
        return pendingRemarks;
      case "completed":
        return completedInterviews;
      case "calendar":
        return getDateInterviews();
      default:
        return upcomingInterviews;
    }
  };

  const getActiveTabTitle = () => {
    switch (activeTab) {
      case "upcoming":
        return "Upcoming Interviews";
      case "pending":
        return "Pending Remarks";
      case "completed":
        return "Completed Interviews";
      case "calendar":
        return "Interview Schedule";
      default:
        return "Upcoming Interviews";
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className={styles.dashboardLayout}>
      <Sidebar activePage="dashboard" />
      <div className={styles.dashboardMain}>
        <div className={styles.dashboardHeader}>
          <h1 className={styles.dashboardTitle}>Interviewer Dashboard</h1>
          <div className={styles.userInfo}>
            <span className={styles.userRole}>Interviewer</span>
            <div
              className={styles.notificationIcon}
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell size={24} color="yellow" />
              {showNotifications && (
                <NotificationsDropdown
                  onClose={() => setShowNotifications(false)}
                />
              )}
            </div>
            <button className={styles.logoutButton}>Log out</button>
          </div>
        </div>

        <div className={styles.dashboardContent}>
          {/* Stats Cards */}
          <div className={styles.statsGrid}>
            <StatCard
              title="Today's Interviews"
              value={stats?.todaysInterviews}
              icon={<CalendarIcon />}
            />
            <StatCard
              title="Passed Interviews"
              value={stats?.passedInterviews}
              icon={<CheckCircle />}
            />
            <StatCard
              title="Failed Interviews"
              value={stats?.failedInterviews}
              icon={<XCircle />}
            />
            <StatCard
              title="Pending Remarks"
              value={stats?.pendingRemarks}
              icon={<Edit2 />}
            />
          </div>

          {/* Navigation Tabs */}
          <div className={styles.filterTabs}>
            <button
              className={`${styles.filterTab} ${
                activeTab === "upcoming" ? styles.activeTab : ""
              }`}
              onClick={() => setActiveTab("upcoming")}
            >
              Upcoming
            </button>
            <button
              className={`${styles.filterTab} ${
                activeTab === "pending" ? styles.activeTab : ""
              }`}
              onClick={() => setActiveTab("pending")}
            >
              Pending Remarks
            </button>
            <button
              className={`${styles.filterTab} ${
                activeTab === "completed" ? styles.activeTab : ""
              }`}
              onClick={() => setActiveTab("completed")}
            >
              Completed
            </button>
            <button
              className={`${styles.filterTab} ${
                activeTab === "calendar" ? styles.activeTab : ""
              }`}
              onClick={() => setActiveTab("calendar")}
            >
              Calendar
            </button>
          </div>

          <h2 className={styles.sectionTitle}>{getActiveTabTitle()}</h2>

          {activeTab === "calendar" ? (
            <div className={styles.calendarView}>
              <div className={styles.calendarContainer}>
                <InterviewCalendar
                  interviews={getCalendarInterviews()}
                  onDateClick={handleDateClick}
                />
              </div>
              {selectedDate && (
                <div className={styles.interviewList}>
                  <h3>Interviews on {selectedDate}</h3>
                  <ScrollArea maxHeight="400px">
                    {getActiveTabData().length > 0 ? (
                      getActiveTabData().map((interview) => (
                        <InterviewCard
                          key={interview.id}
                          name={interview.name}
                          date={interview.date}
                          time={interview.time}
                          program={interview.program}
                          location={interview.location}
                          status={interview.status}
                          result={interview.result}
                        />
                      ))
                    ) : (
                      <p className={styles.noInterviews}>
                        No interviews scheduled for this date
                      </p>
                    )}
                  </ScrollArea>
                </div>
              )}
            </div>
          ) : (
            <ScrollArea maxHeight="600px">
              <div className={styles.interviewGrid}>
                {getActiveTabData().map((interview) => (
                  <InterviewCard
                    key={interview.id}
                    name={interview.name}
                    date={interview.date}
                    time={interview.time}
                    program={interview.program}
                    location={interview.location}
                    status={interview.status}
                    result={interview.result}
                  />
                ))}
              </div>
            </ScrollArea>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className={styles.statCard}>
      <div className={styles.statContent}>
        <div>
          <h3 className={styles.statTitle}>{title}</h3>
          <p className={styles.statValue}>{value}</p>
        </div>
        <div className={styles.statIcon}>{icon}</div>
      </div>
    </div>
  );
}

function InterviewCard({
  name,
  date,
  time,
  program,
  location,
  status,
  result,
}) {
  return (
    <div className={styles.interviewCard}>
      <div className={styles.interviewHeader}>
        <h3 className={styles.interviewName}>{name}</h3>
        <span className={`${styles.statusBadge} ${styles[status]}`}>
          {status === "completed"
            ? result.charAt(0).toUpperCase() + result.slice(1)
            : status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>
      <div className={styles.interviewDetails}>
        <div className={styles.interviewDetail}>
          <CalendarIcon className={styles.detailIcon} />
          <span>{date}</span>
        </div>
        <div className={styles.interviewDetail}>
          <Clock className={styles.detailIcon} />
          <span>{time}</span>
        </div>
        <div className={styles.interviewDetail}>
          <Pen className={styles.detailIcon} />
          <span>{program}</span>
        </div>
        <div className={styles.interviewDetail}>
          <MapPin className={styles.detailIcon} />
          <span>{location}</span>
        </div>
      </div>
      {status === "scheduled" && (
        <button className={styles.completeButton}>Mark as Completed</button>
      )}
      {status === "pending" && (
        <button className={styles.remarksButton}>Add Remarks</button>
      )}
    </div>
  );
}