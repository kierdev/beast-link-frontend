"use client";

import { useState } from "react";
import styles from "./interviewer.module.css";
import NotificationsDropdown from "../../components/notifications/notifications";
import Sidebar from "../../../../components/side-bar/side-bar";

import {
  Calendar,
  CheckCircle,
  XCircle,
  Edit2,
  Clock,
  MapPin,
  Pen,
} from "lucide-react";

// Mock data service
const MockDataService = {
  getDashboardStats: () => ({
    todaysInterviews: 0,
    passedInterviews: 3,
    failedInterviews: 1,
    pendingRemarks: 1
  }),
  getUpcomingInterviews: () => [
    {
      id: 1,
      name: "John Doe",
      date: "March 16, 2025",
      time: "10:00 AM",
      program: "Computer Science",
      location: "Room 101, Main Building",
      status: "scheduled"
    },
    {
      id: 2,
      name: "Robert Wilson",
      date: "March 20, 2025",
      time: "9:00 AM",
      program: "Human Management",
      location: "Room 105, Management Building",
      status: "scheduled"
    },
    {
      id: 3,
      name: "David Miller",
      date: "March 22, 2025",
      time: "10:30 AM",
      program: "Information Technology",
      location: "Room 102, IT Building",
      status: "scheduled"
    }
  ]
};

export default function InterviewerDashboard() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [showNotifications, setShowNotifications] = useState(false);
  
  // Get mock data
  const stats = MockDataService.getDashboardStats();
  const upcomingInterviews = MockDataService.getUpcomingInterviews();

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
              <span className={styles.notificationBadge}>1</span>🔔
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
              value={stats.todaysInterviews}
              icon={<Calendar />}
            />
            <StatCard
              title="Passed Interviews"
              value={stats.passedInterviews}
              icon={<CheckCircle />}
            />
            <StatCard 
              title="Failed Interviews" 
              value={stats.failedInterviews} 
              icon={<XCircle />} 
            />
            <StatCard 
              title="Pending Remarks" 
              value={stats.pendingRemarks} 
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
              Upcoming Interviews
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
              Completed Interviews
            </button>
            <button
              className={`${styles.filterTab} ${
                activeTab === "calendar" ? styles.activeTab : ""
              }`}
              onClick={() => setActiveTab("calendar")}
            >
              Calendar View
            </button>
          </div>

          <h2 className={styles.sectionTitle}>Upcoming</h2>

          {/* Interview Cards */}
          <div className={styles.interviewGrid}>
            {upcomingInterviews.map(interview => (
              <InterviewCard
                key={interview.id}
                name={interview.name}
                date={interview.date}
                time={interview.time}
                program={interview.program}
                location={interview.location}
                status={interview.status}
              />
            ))}
          </div>
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

function InterviewCard({ name, date, time, program, location, status }) {
  return (
    <div className={styles.interviewCard}>
      <div className={styles.interviewHeader}>
        <h3 className={styles.interviewName}>{name}</h3>
        <span className={`${styles.statusBadge} ${styles[status]}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>
      <div className={styles.interviewDetails}>
        <div className={styles.interviewDetail}>
          <Calendar className={styles.detailIcon} />
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
      <button className={styles.completeButton}>Mark as Completed</button>
    </div>
  );
}