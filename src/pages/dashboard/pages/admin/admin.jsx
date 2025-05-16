"use client";

import { useEffect, useState } from "react";
import styles from "./admin.module.css";
import { Users, UserCheck, UserX, Book } from "lucide-react";
import NotificationsDropdown from "../../components/notifications/notifications";
import { LoadingSpinner } from "../../../../components/loading/loading";
import Sidebar from "../../../../components/side-bar/side-bar";
import PieChart from "../../components/pie-chart/pie-chart";
import BarChart from "../../components/bar-chart/bar-chart";
import LineChart from "../../components/line-chart/line-chart";
import { toPercent } from "../../../../utils/numberUtils";

// Mock data service
const MockDataService = {
  getAdminDashboard: () => ({
    totalApplicants: 245,
    passedApplicants: 120,
    failedApplicants: 75,
    pendingApplicants: 50,
    totalCourses: 8
  })
};

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [showNotifications, setShowNotifications] = useState(false);
  const [error, setError] = useState(null);
  const [pieChartData, setPieChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);
  const [lineChartData, setLineChartData] = useState([]);

  useEffect(() => {
    // Simulate API call with timeout
    const fetchData = async () => {
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        const response = MockDataService.getAdminDashboard();
        setData(response);
      } catch (err) {
        console.error("Error loading mock data:", err);
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
      setBarChartData([
        { label: "BSIT", value: 65, color: "#FF6384" },
        { label: "BSCS", value: 59, color: "#36A2EB" },
        { label: "BSCE", value: 80, color: "#FFCE56" },
        { label: "BSA", value: 56, color: "#4BC0C0" },
        { label: "BSSW", value: 40, color: "#9966FF" },
      ]);

      setLineChartData([
        { label: "Jan", value: 65 },
        { label: "Feb", value: 59 },
        { label: "Mar", value: 80 },
        { label: "Apr", value: 81 },
        { label: "May", value: 56 },
        { label: "Jun", value: 55 },
        { label: "Jul", value: 40 },
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
              title="Total Courses"
              value={data.totalCourses}
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
            <PieChart data={pieChartData} width={250} height={250} />

            {/* Applicants by Course */}
            <div className={styles.chartCard}>
              <h2 className={styles.chartTitle}>Applicants by Course</h2>
              <p className={styles.chartSubtitle}>
                Number of applicants per course
              </p>
              <BarChart
                data={barChartData}
                width={600}
                height={300}
                barColor="#4BC0C0"
                showValues={true}
              />
            </div>

            {/* Application Trends */}
            <div className={styles.chartCardFull}>
              <h2 className={styles.chartTitle}>Application Trends</h2>
              <p className={styles.chartSubtitle}>
                Monthly application submissions
              </p>
              <LineChart
                data={lineChartData}
                width={1000}
                height={500}
                lineColor="#FF6384"
                dotColor="#36A2EB"
                showArea={true}
                gridLines={true}
              />
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