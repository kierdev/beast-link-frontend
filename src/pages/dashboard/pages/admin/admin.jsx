"use client";

import { useEffect, useState } from "react";
import styles from "./admin.module.css";
import { Users, UserCheck, UserX, Book, Bell } from "lucide-react";
import NotificationDropdown from "../../components/notifications/notifications";
import { LoadingSpinner } from "../../../../components/loading/loading";
import Sidebar from "../../../../components/side-bar/side-bar";
import PieChart from "../../components/pie-chart/pie-chart";
import BarChart from "../../components/bar-chart/bar-chart";
import LineChart from "../../components/line-chart/line-chart";
import ScrollArea from "../../../../components/scroll-area/scroll-area";
import { toPercent } from "../../../../utils/numberUtils";
import { getAdminDashboardData } from "../../../../data/dashboard-service";

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [showNotifications, setShowNotifications] = useState(false);
  const [error, setError] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      try {
        const dashboardData = await getAdminDashboardData();
        console.log(dashboardData);

        // Calculate percentages for pie chart
        const totalApplicants = dashboardData.stats.totalApplicants;
        const pieDataWithPercentages = dashboardData.charts.pieChartData.map(
          (item) => ({
            ...item,
            value: toPercent(totalApplicants, item.value),
          })
        );

        setData({
          ...dashboardData,
          charts: {
            ...dashboardData.charts,
            pieChartData: pieDataWithPercentages,
          },
        });
        setApplicants(dashboardData.applicants);
        setCourses(dashboardData.courses);
      } catch (err) {
        console.error("Error loading data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const handleTabChange = async (tab) => {
    setActiveTab(tab);
  };

  if (error) {
    return <div className={styles.error}>Error loading dashboard: {error}</div>;
  }

  if (loading || !data) {
    return <LoadingSpinner />;
  }

  return (
    <div className={styles.dashboardLayout}>
      <Sidebar activePage="dashboard" />
      <div className={styles.dashboardMain}>
        <div className={styles.dashboardHeader}>
          <h1>Admin Dashboard</h1>
          <div className={styles.userInfo}>
            <span className={styles.userRole}>Administrator</span>
            <div
              className={styles.notificationIcon}
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell size={24} color="yellow" />
              {showNotifications && (
                <NotificationDropdown
                  initialNotifications={data.notifications}
                />
              )}
            </div>
            <button className={styles.logoutButton}>Log out</button>
          </div>
        </div>

        <div className={styles.dashboardContent}>
          {/* Stats Cards - Always visible */}
          <div className={styles.statsGrid}>
            <StatCard
              title="Total Applicants"
              value={data.stats.totalApplicants}
              icon={<Users />}
            />
            <StatCard
              title="Passed Applicants"
              value={data.stats.passedApplicants}
              icon={<UserCheck />}
            />
            <StatCard
              title="Failed Applicants"
              value={data.stats.failedApplicants}
              icon={<UserX />}
            />
            <StatCard
              title="Total Courses"
              value={data.stats.totalCourses}
              icon={<Book />}
            />
          </div>

          {/* Navigation Tabs */}
          <div className={styles.filterTabs}>
            <button
              className={`${styles.filterTab} ${
                activeTab === "overview" ? styles.activeTab : ""
              }`}
              onClick={() => handleTabChange("overview")}
            >
              Overview
            </button>
            <button
              className={`${styles.filterTab} ${
                activeTab === "applicants" ? styles.activeTab : ""
              }`}
              onClick={() => handleTabChange("applicants")}
            >
              Applicants
            </button>
            <button
              className={`${styles.filterTab} ${
                activeTab === "courses" ? styles.activeTab : ""
              }`}
              onClick={() => handleTabChange("courses")}
            >
              Courses
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === "overview" && (
            <div className={styles.contentGrid}>
              <PieChart
                data={data.charts.pieChartData}
                width={250}
                height={250}
              />

              <div className={styles.chartCard}>
                <h2>Applicants by Course</h2>
                <BarChart
                  data={data.charts.barChartData}
                  width={600}
                  height={300}
                  barColor="#4BC0C0"
                  showValues={true}
                />
              </div>

              <div className={styles.chartCardFull}>
                <h2>Application Trends</h2>
                <LineChart
                  data={data.charts.lineChartData}
                  width={1000}
                  height={500}
                  lineColor="#FF6384"
                  dotColor="#36A2EB"
                  showArea={true}
                  gridLines={true}
                />
              </div>
            </div>
          )}

          {activeTab === "applicants" && (
            <div className={styles.tableContainer}>
              <h2>Applicant Management</h2>
              <div className={styles.tableHeader}>
                <span>ID</span>
                <span>Name</span>
                <span>Email</span>
                <span>Course</span>
                <span>Status</span>
                <span>Applied Date</span>
                <span>Documents</span>
              </div>
              <ScrollArea maxHeight="500px">
                {applicants.map((applicant) => (
                  <div key={applicant.id} className={styles.tableRow}>
                    <span>{applicant.id}</span>
                    <span>{applicant.name}</span>
                    <span>{applicant.email}</span>
                    <span>{applicant.course}</span>
                    <span
                      className={`${styles.status} ${
                        styles[applicant.status.toLowerCase()]
                      }`}
                    >
                      {applicant.status}
                    </span>
                    <span>{applicant.appliedDate}</span>
                    <span
                      className={
                        applicant.documents === "Complete"
                          ? styles.complete
                          : styles.incomplete
                      }
                    >
                      {applicant.documents}
                    </span>
                  </div>
                ))}
              </ScrollArea>
            </div>
          )}

          {activeTab === "courses" && (
            <div className={styles.tableContainer}>
              <h2>Course Management</h2>
              <div className={styles.tableHeader}>
                <span>Code</span>
                <span>Name</span>
                <span>Seats</span>
                <span>Enrolled</span>
                <span>Available</span>
                <span>Fill Rate</span>
              </div>
              <ScrollArea maxHeight="500px">
                {courses.map((course) => {
                  const available = course.seats - course.enrolled;
                  const fillRate = (
                    (course.enrolled / course.seats) *
                    100
                  ).toFixed(1);
                  return (
                    <div key={course.id} className={styles.tableRow}>
                      <span>{course.code}</span>
                      <span>{course.name}</span>
                      <span>{course.seats}</span>
                      <span>{course.enrolled}</span>
                      <span
                        className={
                          available <= 0 ? styles.full : styles.available
                        }
                      >
                        {available <= 0 ? "Full" : available}
                      </span>
                      <span>
                        <div className={styles.fillRateBar}>
                          <div
                            className={styles.fillRateProgress}
                            style={{ width: `${fillRate}%` }}
                          />
                          <span className={styles.fillRateText}>
                            {fillRate}%
                          </span>
                        </div>
                      </span>
                    </div>
                  );
                })}
              </ScrollArea>
            </div>
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
