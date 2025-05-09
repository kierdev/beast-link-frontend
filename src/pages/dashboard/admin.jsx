"use client";

import { useState } from "react";
import styles from "./dashboard.module.css";
import Sidebar from "./sidebar";
import NotificationsDropdown from "./notifications";

export default function Admin_Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className={styles.dashboardLayout}>
      <Sidebar activePage="dashboard" />
      <div className={styles.dashboardMain}>
        <div className={styles.dashboardHeader}>
          <h1 className={styles.dashboardTitle}>Admin Dashboard</h1>
          <div className={styles.userInfo}>
            <span className={styles.userRole}>Administrator</span>
            <div
              className={styles.notificationIcon}
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <span className={styles.notificationBadge}>2</span>🔔
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
            <StatCard title="Total Applicants" value="17" icon="👥" />
            <StatCard title="Passed Applicants" value="12" icon="🎓" />
            <StatCard title="Failed Applicants" value="2" icon="❌" />
            <StatCard title="Total Courses" value="9" icon="📚" />
          </div>

          {/* Navigation Tabs */}
          <div className={styles.filterTabs}>
            <button
              className={`${styles.filterTab} ${
                activeTab === "overview" ? styles.activeTab : ""
              }`}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </button>
            <button
              className={`${styles.filterTab} ${
                activeTab === "applicants" ? styles.activeTab : ""
              }`}
              onClick={() => setActiveTab("applicants")}
            >
              Applicants
            </button>
            <button
              className={`${styles.filterTab} ${
                activeTab === "courses" ? styles.activeTab : ""
              }`}
              onClick={() => setActiveTab("courses")}
            >
              Courses
            </button>
          </div>

          {/* Main Content */}
          <div className={styles.contentGrid}>
            {/* Application Status */}
            <div className={styles.chartCard}>
              <h2 className={styles.chartTitle}>Application Status</h2>
              <p className={styles.chartSubtitle}>
                Distribution of application statuses
              </p>
              <div className={styles.chartContent}>
                <div className={styles.pieChart}>
                  <div className={styles.pieChartLegend}>
                    <div className={styles.legendItem}>
                      <span
                        className={`${styles.legendColor} ${styles.passedColor}`}
                      ></span>
                      <span>Passed (70%)</span>
                    </div>
                    <div className={styles.legendItem}>
                      <span
                        className={`${styles.legendColor} ${styles.failedColor}`}
                      ></span>
                      <span>Failed (12%)</span>
                    </div>
                    <div className={styles.legendItem}>
                      <span
                        className={`${styles.legendColor} ${styles.pendingColor}`}
                      ></span>
                      <span>Pending (18%)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Applicants by Course */}
            <div className={styles.chartCard}>
              <h2 className={styles.chartTitle}>Applicants by Course</h2>
              <p className={styles.chartSubtitle}>
                Number of applicants per course
              </p>
              <div className={styles.chartContent}>
                <div className={styles.barChart}>
                  <div className={styles.barChartBar} style={{ height: "40%" }}>
                    <span className={styles.barLabel}>CS</span>
                    <span className={styles.barValue}>2</span>
                  </div>
                  <div className={styles.barChartBar} style={{ height: "60%" }}>
                    <span className={styles.barLabel}>CE</span>
                    <span className={styles.barValue}>3</span>
                  </div>
                  <div
                    className={styles.barChartBar}
                    style={{ height: "100%" }}
                  >
                    <span className={styles.barLabel}>IT</span>
                    <span className={styles.barValue}>5</span>
                  </div>
                  <div className={styles.barChartBar} style={{ height: "20%" }}>
                    <span className={styles.barLabel}>EE</span>
                    <span className={styles.barValue}>1</span>
                  </div>
                  <div className={styles.barChartBar} style={{ height: "20%" }}>
                    <span className={styles.barLabel}>SE</span>
                    <span className={styles.barValue}>1</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Application Trends */}
            <div className={styles.chartCardFull}>
              <h2 className={styles.chartTitle}>Application Trends</h2>
              <p className={styles.chartSubtitle}>
                Monthly application submissions
              </p>
              <div className={styles.chartContent}>
                <div className={styles.lineChart}>
                  <div className={styles.lineChartLabels}>
                    <span>Jan</span>
                    <span>Feb</span>
                    <span>Mar</span>
                    <span>Apr</span>
                    <span>May</span>
                    <span>Jun</span>
                    <span>Jul</span>
                    <span>Aug</span>
                    <span>Sep</span>
                    <span>Oct</span>
                    <span>Nov</span>
                    <span>Dec</span>
                  </div>
                </div>
              </div>
            </div>
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
