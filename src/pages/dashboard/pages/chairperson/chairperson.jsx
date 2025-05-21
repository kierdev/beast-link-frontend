"use client";

import { useState, useEffect } from "react";
import styles from "./chairperson.module.css";
import NotificationsDropdown from "../../components/notifications/notifications";
import Sidebar from "../../../../components/side-bar/side-bar";
import { LoadingSpinner } from "../../../../components/loading/loading";
import {
  Users,
  UserCheck,
  UserX,
  Book,
  Bell,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { toPercent } from "../../../../utils/numberUtils";
import PieChart from "../../components/pie-chart/pie-chart";
import { getChairpersonDashboardData } from "../../../../data/dashboard-service";

export default function ChairpersonDashboard() {
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [showNotifications, setShowNotifications] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Tab-specific data states
  const [applicants, setApplicants] = useState([]);
  const [exams, setExams] = useState([]);

  // Applicant filter states
  const [applicantSearch, setApplicantSearch] = useState("");
  const [applicantStatusFilter, setApplicantStatusFilter] = useState("all");
  const [documentStatusFilter, setDocumentStatusFilter] = useState("all");

  // Exam filter states
  const [examSearch, setExamSearch] = useState("");
  const [examStatusFilter, setExamStatusFilter] = useState("all");
  const [dateRangeFilter, setDateRangeFilter] = useState("all");

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        const response = await getChairpersonDashboardData("BSIT");
        console.log(response);
        setData(response);
      } catch (err) {
        console.error("Error loading dashboard data:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    const fetchTabData = async () => {
      try {
        if (activeTab === "applicants" && applicants.length === 0) {
          setApplicants(data.applicants);
        } else if (activeTab === "exams" && exams.length === 0) {
          setExams(data.exams);
        }
      } catch (err) {
        console.error(`Error loading ${activeTab} data:`, err);
      }
    };

    fetchTabData();
  }, [activeTab]);

  // Filter applicants
  const filteredApplicants = applicants.filter(applicant => {
    const matchesSearch = 
      applicant.name.toLowerCase().includes(applicantSearch.toLowerCase()) ||
      applicant.id.toString().includes(applicantSearch);
    
    const matchesStatus = 
      applicantStatusFilter === "all" || 
      applicant.status.toLowerCase() === applicantStatusFilter.toLowerCase();
    
    const matchesDocuments = 
      documentStatusFilter === "all" || 
      applicant.documents.toLowerCase() === documentStatusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus && matchesDocuments;
  });

  // Filter exams
  const filteredExams = exams.filter(exam => {
    const matchesSearch = 
      exam.name.toLowerCase().includes(examSearch.toLowerCase()) ||
      exam.id.toString().includes(examSearch);
    
    const matchesStatus = 
      examStatusFilter === "all" || 
      exam.status.toLowerCase() === examStatusFilter.toLowerCase();
    
    const matchesDate = () => {
      if (dateRangeFilter === "all") return true;
      const examDate = new Date(exam.date);
      const today = new Date();
      
      if (dateRangeFilter === "upcoming") return examDate >= today;
      if (dateRangeFilter === "past") return examDate < today;
      return true;
    };
    
    return matchesSearch && matchesStatus && matchesDate();
  });

  if (error) {
    return (
      <div className={styles.error}>
        Error loading dashboard: {error.message}
      </div>
    );
  }

  if (loading || !data) {
    return <LoadingSpinner />;
  }

  return (
    <div className={styles.dashboardLayout}>
      <Sidebar activePage="dashboard" />
      <div className={styles.dashboardMain}>
        <div className={styles.dashboardHeader}>
          <h1 className={styles.dashboardTitle}>
            {data.department} IT Department Dashboard
          </h1>
          <div className={styles.userInfo}>
            <span className={styles.userRole}>Department Chairperson</span>
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
          {/* Department Info */}
          <div className={styles.infoAlert}>
            <div className={styles.infoAlertIcon}>📋</div>
            <div className={styles.infoAlertContent}>
              <h2 className={styles.infoAlertTitle}>Department View</h2>
              <p className={styles.infoAlertText}>
                You are viewing data for the <strong>{data.department}</strong>{" "}
                IT department only
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className={styles.statsGrid}>
            <StatCard
              title="Total Applicants"
              value={data.programStatistics.totalApplicants}
              icon={<Users />}
            />
            <StatCard
              title="Passed Applicants"
              value={data.programStatistics.passedApplicants}
              icon={<UserCheck />}
            />
            <StatCard
              title="Failed Applicants"
              value={data.programStatistics.failedApplicants}
              icon={<UserX />}
            />
            <StatCard
              title="Pending Applications"
              value={data.programStatistics.pendingApplicants}
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
          </div>

          {/* Tab Content */}
          {activeTab === "overview" && (
            <div className={styles.contentGrid}>
              {/* Application Status */}
              <div className={styles.chartCard}>
                <h2 className={styles.chartTitle}>Application Status</h2>
                <p className={styles.chartSubtitle}>
                  Distribution of {data.department} application statuses
                </p>
                <PieChart
                  data={[
                    {
                      label: "Failed",
                      value: toPercent(
                        data.programStatistics.totalApplicants,
                        data.programStatistics.failedApplicants
                      ),
                      color: "#FF0000",
                    },
                    {
                      label: "Passed",
                      value: toPercent(
                        data.programStatistics.totalApplicants,
                        data.programStatistics.passedApplicants
                      ),
                      color: "#00ff00",
                    },
                    {
                      label: "Pending",
                      value: toPercent(
                        data.programStatistics.totalApplicants,
                        data.programStatistics.pendingApplicants
                      ),
                      color: "#ffa500",
                    },
                  ]}
                  width={250}
                  height={250}
                />
              </div>

              {/* Exam Score Distribution */}
              <div className={styles.chartCard}>
                <h2 className={styles.chartTitle}>Exam Score Distribution</h2>
                <p className={styles.chartSubtitle}>
                  {data.department} applicants by exam score ranges
                </p>
                <div className={styles.chartContent}>
                  <div className={styles.barChart}>
                    {data.programStatistics.examScoreDistribution.map(
                      (item, index) => (
                        <div
                          key={index}
                          className={styles.barChartBar}
                          style={{ height: `${item.value * 2}px` }}
                        >
                          <span className={styles.barValue}>{item.value}</span>
                          <span className={styles.barLabel}>{item.label}</span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "applicants" && (
            <div className={styles.tabContent}>
              <h2 className={styles.tabTitles}>Applicant Management</h2>
              
              {/* Applicant Filter Controls */}
              <div className={styles.filterControls}>
                <div className={styles.filterGroup}>
                  <input
                    type="text"
                    placeholder="Search by name or ID..."
                    value={applicantSearch}
                    onChange={(e) => setApplicantSearch(e.target.value)}
                    className={styles.searchInput}
                  />
                </div>

                <div className={styles.filterGroup}>
                  <label>Status:</label>
                  <select
                    value={applicantStatusFilter}
                    onChange={(e) => setApplicantStatusFilter(e.target.value)}
                    className={styles.filterSelect}
                  >
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>

                <div className={styles.filterGroup}>
                  <label>Documents:</label>
                  <select
                    value={documentStatusFilter}
                    onChange={(e) => setDocumentStatusFilter(e.target.value)}
                    className={styles.filterSelect}
                  >
                    <option value="all">All</option>
                    <option value="complete">Complete</option>
                    <option value="incomplete">Incomplete</option>
                  </select>
                </div>
              </div>

              <ApplicantsTable applicants={filteredApplicants} />
            </div>
          )}

          {activeTab === "exams" && (
            <div className={styles.tabContent}>
              <h2 className={styles.tabTitles}>Exam Schedule</h2>
              
              {/* Exam Filter Controls */}
              <div className={styles.filterControls}>
                <div className={styles.filterGroup}>
                  <input
                    type="text"
                    placeholder="Search by exam name or ID..."
                    value={examSearch}
                    onChange={(e) => setExamSearch(e.target.value)}
                    className={styles.searchInput}
                  />
                </div>

                <div className={styles.filterGroup}>
                  <label>Status:</label>
                  <select
                    value={examStatusFilter}
                    onChange={(e) => setExamStatusFilter(e.target.value)}
                    className={styles.filterSelect}
                  >
                    <option value="all">All Statuses</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <div className={styles.filterGroup}>
                  <label>Date Range:</label>
                  <select
                    value={dateRangeFilter}
                    onChange={(e) => setDateRangeFilter(e.target.value)}
                    className={styles.filterSelect}
                  >
                    <option value="all">All Dates</option>
                    <option value="upcoming">Upcoming</option>
                    <option value="past">Past</option>
                  </select>
                </div>
              </div>

              <ExamsTable exams={filteredExams} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Sub-components
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

function ApplicantsTable({ applicants }) {
  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableHeader}>
        <div>ID</div>
        <div>Name</div>
        <div>Status</div>
        <div>Applied Date</div>
        <div>Documents</div>
      </div>
      {applicants.length > 0 ? (
        applicants.map((applicant) => (
          <div key={applicant.id} className={styles.tableRow}>
            <div>{applicant.id}</div>
            <div>{applicant.name}</div>
            <div
              className={`${styles.statusBadge} ${
                styles[applicant.status.toLowerCase()]
              }`}
            >
              {applicant.status}
            </div>
            <div>{applicant.appliedDate}</div>
            <div
              className={
                applicant.documents === "Complete"
                  ? styles.complete
                  : styles.incomplete
              }
            >
              {applicant.documents}
            </div>
          </div>
        ))
      ) : (
        <div className={styles.noResults}>No applicants match the current filters</div>
      )}
    </div>
  );
}

function ExamsTable({ exams }) {
  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableHeader}>
        <div>Exam ID</div>
        <div>Name</div>
        <div>Date</div>
        <div>Time</div>
        <div>Location</div>
        <div>Status</div>
      </div>
      {exams.length > 0 ? (
        exams.map((exam) => (
          <div key={exam.id} className={styles.tableRow}>
            <div>{exam.id}</div>
            <div>{exam.name}</div>
            <div>{exam.date}</div>
            <div>{exam.time}</div>
            <div>{exam.location}</div>
            <div
              className={`${styles.statusBadge} ${
                styles[exam.status.toLowerCase()]
              }`}
            >
              {exam.status}
            </div>
          </div>
        ))
      ) : (
        <div className={styles.noResults}>No exams match the current filters</div>
      )}
    </div>
  );
}