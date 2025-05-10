"use client";

import { useState, useEffect } from "react";
import styles from "./dashboard.module.css";
import NotificationsDropdown from "./notifications";
import Sidebar from "../../components/side-bar/side-bar";
import { getProgramStatistics } from "../../data/dashboard-service";
import { toCamelCase } from "../../utils/casing";
import { LoadingSpinner } from "../../components/loading/loading";
import { Users, UserCheck, UserX, Book } from "lucide-react";
import { toPercent } from "../../utils/numberUtils";
import PieChart from "./components/pie-chart/pie-chart";

export default function Chairperson_Dashboard() {
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [showNotifications, setShowNotifications] = useState(false);
  const [error, setError] = useState(null);
  const [pieChartData, setPieChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProgramStatistics();
        const transformedData = toCamelCase(response);
        console.log("Transformed data:", transformedData);
        setData(transformedData);
      } catch (err) {
        console.error("Error fetching admin dashboard data:", err);
        setError(err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      setPieChartData([
        {
          label: "Failed",
          value: toPercent(data.totalApplicants, data.failedApplicants),
          color: "#FF0000",
        },
        {
          label: "Passed",
          value: toPercent(data.totalApplicants, data.passedApplicants),
          color: "#00ff00",
        },
        {
          label: "Pending",
          value: toPercent(data.totalApplicants, data.pendingApplicants),
          color: "#ffa500",
        },
      ]);
    }
  }, [data]);

  if (error) {
    return <div>Error loading dashboard: {error.message}</div>;
  }

  if (!data) {
    return <LoadingSpinner />;
  }

  return (
    <div className={styles.dashboardLayout}>
      <Sidebar activePage="dashboard" />
      <div className={styles.dashboardMain}>
        <div className={styles.dashboardHeader}>
          <h1 className={styles.dashboardTitle}>
            Information Technology Department Dashboard
          </h1>
          <div className={styles.userInfo}>
            <span className={styles.userRole}>Department Chairperson</span>
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
          {/* Department Info */}
          <div className={styles.infoAlert}>
            <div className={styles.infoAlertIcon}>📋</div>
            <div className={styles.infoAlertContent}>
              <h2 className={styles.infoAlertTitle}>Department View</h2>
              <p className={styles.infoAlertText}>
                You are viewing data for the{" "}
                <strong>Information Technology</strong> department only
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className={styles.statsGrid}>
            <StatCard
              title="Total Applicants"
              value={data.totalApplicants}
              icon={<Users />}
            />
            <StatCard
              title="Passed Applicants"
              value={data.passedApplicants}
              icon={<UserCheck />}
            />
            <StatCard
              title="Failed Applicants"
              value={data.failedApplicants}
              icon={<UserX />}
            />
            <StatCard
              title="Pending Applications"
              value={data.pendingApplicants}
              icon={<Book />}
            />
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
                activeTab === "exams" ? styles.activeTab : ""
              }`}
              onClick={() => setActiveTab("exams")}
            >
              Exams
            </button>
            <button
              className={`${styles.filterTab} ${
                activeTab === "events" ? styles.activeTab : ""
              }`}
              onClick={() => setActiveTab("events")}
            >
              Events
            </button>
          </div>

          {/* Main Content */}
          <div className={styles.contentGrid}>
            {/* Application Status */}
            <div className={styles.chartCard}>
              <h2 className={styles.chartTitle}>Application Status</h2>
              <p className={styles.chartSubtitle}>
                Distribution of Information Technology application statuses
              </p>
              <PieChart data={pieChartData} width={250} height={250} />
            </div>

            {/* Exam Score Distribution */}
            <div className={styles.chartCard}>
              <h2 className={styles.chartTitle}>Exam Score Distribution</h2>
              <p className={styles.chartSubtitle}>
                Information Technology applicants by exam score ranges
              </p>
              <div className={styles.chartContent}>
                <div className={styles.barChart}>
                  <div className={styles.barChartBar} style={{ height: "80%" }}>
                    <span className={styles.barLabel}>90-100</span>
                    <span className={styles.barValue}>2</span>
                  </div>
                  <div className={styles.barChartBar} style={{ height: "40%" }}>
                    <span className={styles.barLabel}>80-89</span>
                    <span className={styles.barValue}>1</span>
                  </div>
                  <div className={styles.barChartBar} style={{ height: "40%" }}>
                    <span className={styles.barLabel}>70-79</span>
                    <span className={styles.barValue}>1</span>
                  </div>
                  <div className={styles.barChartBar} style={{ height: "0%" }}>
                    <span className={styles.barLabel}>60-69</span>
                    <span className={styles.barValue}>0</span>
                  </div>
                  <div className={styles.barChartBar} style={{ height: "0%" }}>
                    <span className={styles.barLabel}>Below 60</span>
                    <span className={styles.barValue}>0</span>
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
