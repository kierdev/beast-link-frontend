"use client";

import { useState } from "react";
import styles from "./dashboard.module.css";
import NotificationsDropdown from "./notifications";
import Sidebar from "../../components/side-bar/side-bar";
import {
  Calendar,
  CheckCircle,
  XCircle,
  Edit2,
  Clock,
  MapPin,
  Pen,
} from "lucide-react";

export default function Faculty_Dashboard() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [showNotifications, setShowNotifications] = useState(false);

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
              value="0"
              icon={<Calendar />}
            />
            <StatCard
              title="Passed Interviews"
              value="3"
              icon={<CheckCircle />}
            />
            <StatCard title="Failed Interviews" value="1" icon={<XCircle />} />
            <StatCard title="Pending Remarks" value="1" icon={<Edit2 />} />
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
            <InterviewCard
              name="John Doe"
              date="March 16, 2025"
              time="10:00 AM"
              program="Computer Science"
              location="Room 101, Main Building"
            />

            <InterviewCard
              name="Robert Wilson"
              date="March 20, 2025"
              time="9:00 AM"
              program="Human Management"
              location="Room 105, Management Building"
            />

            <InterviewCard
              name="David Miller"
              date="March 22, 2025"
              time="10:30 AM"
              program="Information Technology"
              location="Room 102, IT Building"
            />
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

function InterviewCard({ name, date, time, program, location }) {
  return (
    <div className={styles.interviewCard}>
      <div className={styles.interviewHeader}>
        <h3 className={styles.interviewName}>{name}</h3>
        <span className={styles.scheduledBadge}>Scheduled</span>
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
