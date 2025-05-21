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
import AcceptanceRateGraph from "../../components/acceptance-rate-graph/acceptance-rate-graph";
import InterviewResultsGraph from "../../components/interview-results-graph/interview-results-graph";

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [showNotifications, setShowNotifications] = useState(false);
  const [error, setError] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  // Applicant filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [documentFilter, setDocumentFilter] = useState("all");
  const [courseFilter, setCourseFilter] = useState("all");

  // Course filter states
  const [courseSearchTerm, setCourseSearchTerm] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");
  const [enrollmentFilter, setEnrollmentFilter] = useState("all");

  const admissionData = [
    { name: "Computer Science", acceptanceRate: 12 },
    { name: "Business Admin", acceptanceRate: 28 },
    { name: "Electrical Eng", acceptanceRate: 18 },
    { name: "Fine Arts", acceptanceRate: 45 },
    { name: "Medicine", acceptanceRate: 8 },
    { name: "Law", acceptanceRate: 22 },
  ];

  const interviewData = [
    { name: "Computer Science", passed: 120, failed: 180 },
    { name: "Business", passed: 150, failed: 90 },
    { name: "Engineering", passed: 80, failed: 120 },
    { name: "Arts", passed: 200, failed: 50 },
    { name: "Medicine", passed: 60, failed: 140 },
    { name: "Law", passed: 90, failed: 60 },
  ];

  // Filter applicants
  const filteredApplicants = applicants.filter(applicant => {
    const matchesSearch = 
      applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      applicant.id.toString().includes(searchTerm);
    
    const matchesStatus = 
      statusFilter === "all" || 
      applicant.status.toLowerCase() === statusFilter.toLowerCase();
    
    const matchesDocuments = 
      documentFilter === "all" || 
      applicant.documents.toLowerCase() === documentFilter.toLowerCase();
    
    const matchesCourse = 
      courseFilter === "all" || 
      applicant.course.toLowerCase().includes(courseFilter.toLowerCase());
    
    return matchesSearch && matchesStatus && matchesDocuments && matchesCourse;
  });

  // Filter courses
  const filteredCourses = courses.filter(course => {
    const matchesSearch = 
      course.name.toLowerCase().includes(courseSearchTerm.toLowerCase()) ||
      course.code.toLowerCase().includes(courseSearchTerm.toLowerCase());
    
    const matchesAvailability = 
      availabilityFilter === "all" ||
      (availabilityFilter === "available" && (course.seats - course.enrolled) > 0) ||
      (availabilityFilter === "full" && (course.seats - course.enrolled) <= 0);
    
    const matchesEnrollment = 
      enrollmentFilter === "all" ||
      (enrollmentFilter === "high" && (course.enrolled / course.seats) >= 0.75) ||
      (enrollmentFilter === "medium" && 
        (course.enrolled / course.seats) >= 0.5 && 
        (course.enrolled / course.seats) < 0.75) ||
      (enrollmentFilter === "low" && (course.enrolled / course.seats) < 0.5);
    
    return matchesSearch && matchesAvailability && matchesEnrollment;
  });

  // Get unique course names for applicant filter dropdown
  const uniqueCourses = [...new Set(applicants.map(applicant => applicant.course))];

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      try {
        const dashboardData = await getAdminDashboardData();
        console.log(dashboardData);

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
          <h1 className={styles.dashboardTitle}>Admin Dashboard</h1>
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

          {activeTab === "overview" && (
            <div className={styles.contentGrid}>
              <div className={styles.chartCard}>
                <h2 className={styles.chartTitle}>Applicantion Status</h2>
                <p className={styles.chartSubtitle}>
                  total applicant application status
                </p>
                <PieChart
                  data={data.charts.pieChartData}
                  width={250}
                  height={250}
                />
              </div>

              <div className={styles.chartCard}>
                <h2 className={styles.chartTitle}>Applicants by Course</h2>
                <p className={styles.chartSubtitle}>
                  total applicant per Course
                </p>
                <BarChart
                  data={data.charts.barChartData}
                  width={600}
                  height={300}
                  barColor="#4BC0C0"
                  showValues={true}
                />
              </div>

              <div className={styles.chartCardFull}>
                <h2 className={styles.chartTitle}>Application Trends</h2>
                <p className={styles.chartSubtitle}>
                  total applicant per month
                </p>
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
              <AcceptanceRateGraph data={admissionData} />
              <InterviewResultsGraph data={interviewData} />
            </div>
          )}

          {activeTab === "applicants" && (
            <div className={styles.tableContainer}>
              <h2 className={styles.tabTitles}>Applicant Management</h2>
              
              <div className={styles.filterControls}>
                <div className={styles.filterGroup}>
                  <input
                    type="text"
                    placeholder="Search by name or ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={styles.searchInput}
                    
                  />
                  
                </div>

                <div className={styles.filterGroup}>
                  <label htmlFor="status-filter">Status:</label>
                  <select
                    id="status-filter"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className={styles.filterSelect}
                  >
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>

                <div className={styles.filterGroup}>
                  <label htmlFor="doc-filter">Documents:</label>
                  <select
                    id="doc-filter"
                    value={documentFilter}
                    onChange={(e) => setDocumentFilter(e.target.value)}
                    className={styles.filterSelect}
                  >
                    <option value="all">All</option>
                    <option value="complete">Complete</option>
                    <option value="incomplete">Incomplete</option>
                  </select>
                </div>

                <div className={styles.filterGroup}>
                  <label htmlFor="course-filter">Course:</label>
                  <select
                    id="course-filter"
                    value={courseFilter}
                    onChange={(e) => setCourseFilter(e.target.value)}
                    className={styles.filterSelect}
                  >
                    <option value="all">All Courses</option>
                    {uniqueCourses.map(course => (
                      <option key={course} value={course}>{course}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={styles.tableHeader}>
                <span>ID</span>
                <span>Name</span>
                <span>Course</span>
                <span>Status</span>
                <span>Applied Date</span>
                <span>Documents</span>
              </div>
              <ScrollArea maxHeight="500px">
                {filteredApplicants.map((applicant) => (
                  <div key={applicant.id} className={styles.tableRow}>
                    <span>{applicant.id}</span>
                    <span>{applicant.name}</span>
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
              <h2 className={styles.tabTitles}>Course Management</h2>
              
              <div className={styles.filterControls}>
                <div className={styles.filterGroup}>
                  <input
                    type="text"
                    placeholder="Search by name or code..."
                    value={courseSearchTerm}
                    onChange={(e) => setCourseSearchTerm(e.target.value)}
                    className={styles.searchInput}
                  />
                </div>

                <div className={styles.filterGroup}>
                  <label htmlFor="availability-filter">Availability:</label>
                  <select
                    id="availability-filter"
                    value={availabilityFilter}
                    onChange={(e) => setAvailabilityFilter(e.target.value)}
                    className={styles.filterSelect}
                  >
                    <option value="all">All</option>
                    <option value="available">Available</option>
                    <option value="full">Full</option>
                  </select>
                </div>

                <div className={styles.filterGroup}>
                  <label htmlFor="enrollment-filter">Enrollment:</label>
                  <select
                    id="enrollment-filter"
                    value={enrollmentFilter}
                    onChange={(e) => setEnrollmentFilter(e.target.value)}
                    className={styles.filterSelect}
                  >
                    <option value="all">All</option>
                    <option value="high">High (75%+)</option>
                    <option value="medium">Medium (50-75%)</option>
                    <option value="low">Low (&lt;50%)</option>
                  </select>
                </div>
              </div>

              <div className={styles.tableHeader}>
                <span>Code</span>
                <span>Name</span>
                <span>Seats</span>
                <span>Enrolled</span>
                <span>Available</span>
                <span>Fill Rate</span>
              </div>
              <ScrollArea maxHeight="500px">
                {filteredCourses.map((course) => {
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