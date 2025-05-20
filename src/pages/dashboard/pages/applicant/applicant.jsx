import { useState, useRef, useEffect } from "react";
import styles from "./applicant.module.css";
import CourseDetails from "../../components/course-details/course-details";
import NotificationsDropdown from "../../components/notifications/notifications";
import Sidebar from "../../../../components/side-bar/side-bar";
import { Bell, Search, Calendar, User, Monitor } from "lucide-react";
import { getApplicantDashboardData } from "../../../../data/dashboard-service";
import { LoadingSpinner } from "../../../../components/loading/loading";

export default function ApplicantDashboard() {
  // State for search and filter functionality
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [courses, setCourses] = useState([]);
  const [applications, setApplications] = useState([]);
  const [progress, setProgress] = useState([]);
  // State for course details modal and notifications
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [loading, setLoading] = useState(false);

  // Refs for click outside detection
  const notificationsRef = useRef(null);
  const bellIconRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getApplicantDashboardData();
        const { courses, applications, progress } = response;
        setCourses(courses);
        setApplications(applications);
        setProgress(progress);
      } catch (error) {
        console.error("Error fetching interviewer data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle click outside to close notifications
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        showNotifications &&
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target) &&
        bellIconRef.current &&
        !bellIconRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showNotifications]);

  // Filter courses based on search query and category filter
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      activeFilter === "all" ||
      (activeFilter === "technology" && course.category === "technology") ||
      (activeFilter === "education" && course.category === "education") ||
      (activeFilter === "business" && course.category === "business");

    return matchesSearch && matchesFilter;
  });

  // Handle view details click
  const handleViewDetails = (course) => {
    setSelectedCourse(course);
  };

  // Toggle notifications
  const toggleNotifications = (e) => {
    e.stopPropagation();
    setShowNotifications(!showNotifications);
  };

  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <div className={styles.dashboardLayout}>
      <Sidebar activePage="dashboard" />
      <div className={styles.dashboardMain}>
        <div className={styles.dashboardHeader}>
          <h1 className={styles.dashboardTitle}>Applicant Dashboard</h1>
          <div className={styles.userInfo}>
            <span className={styles.userRole}>Applicant</span>
            <div className={styles.notificationContainer}>
              <div
                ref={bellIconRef}
                className={styles.notificationIcon}
                onClick={toggleNotifications}
              >
                <Bell size={24} color="yellow" />
              </div>
              {showNotifications && (
                <div ref={notificationsRef}>
                  <NotificationsDropdown
                    onClose={() => setShowNotifications(false)}
                  />
                </div>
              )}
            </div>
            <button className={styles.logoutButton}>Log out</button>
          </div>
        </div>

        <div className={styles.dashboardContent}>
          {/* Application Progress */}
          <div className={styles.progressTracker}>
            <div className={styles.progressLine}></div>
            {progress.map((step, index) => (
              <ProgressStep
                key={index}
                label={step.label}
                status={step.status}
              />
            ))}
          </div>

          {/* Available Courses */}
          <div className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Available Courses</h2>
            </div>

            {/* Course Filters */}
            <div className={styles.filterTabs}>
              <button
                className={`${styles.filterTab} ${
                  activeFilter === "all" ? styles.activeTab : ""
                }`}
                onClick={() => setActiveFilter("all")}
              >
                All
              </button>
              <button
                className={`${styles.filterTab} ${
                  activeFilter === "technology" ? styles.activeTab : ""
                }`}
                onClick={() => setActiveFilter("technology")}
              >
                Technology
              </button>
              <button
                className={`${styles.filterTab} ${
                  activeFilter === "education" ? styles.activeTab : ""
                }`}
                onClick={() => setActiveFilter("education")}
              >
                Education
              </button>
              <button
                className={`${styles.filterTab} ${
                  activeFilter === "business" ? styles.activeTab : ""
                }`}
                onClick={() => setActiveFilter("business")}
              >
                Business & Accountancy
              </button>

              <div className={styles.searchBar}>
                <input
                  type="text"
                  placeholder="Search Courses"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={styles.searchInput}
                />
                <span className={styles.searchIcon}>
                  <Search />
                </span>
              </div>
            </div>

            {/* Course Cards */}
            <div className={styles.courseGrid}>
              {filteredCourses.map((course) => (
                <div key={course.id} className={styles.courseCard}>
                  <div
                    className={`${styles.courseIcon} ${
                      styles[course.category]
                    }`}
                  >
                    {<Monitor />}
                  </div>
                  <div className={styles.courseContent}>
                    <div className={styles.courseHeader}>
                      <h3 className={styles.courseTitle}>{course.title}</h3>
                      <button
                        className={styles.viewDetailsLink}
                        onClick={() => handleViewDetails(course)}
                      >
                        View Details
                      </button>
                    </div>
                    <div className={styles.courseCount}>{course.count}</div>
                    <p className={styles.courseDescription}>
                      {course.description}
                    </p>
                    <div className={styles.courseFooter}>
                      <span className={styles.collegeTag}>
                        {course.college}
                      </span>
                      <span className={styles.dateTag}>
                        <Calendar /> {course.date}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Card */}
          <div className={styles.statsCard}>
            <h2 className={styles.statsTitle}>
              Learn Effectively With BeastLink College!
            </h2>
            <div className={styles.statsContent}>
              <div className={styles.statsIcon}>
                <User />
              </div>
              <div className={styles.statsInfo}>
                <div className={styles.statsLabel}>Student</div>
                <div className={styles.statsValue}>50,000+</div>
              </div>
            </div>
          </div>

          {/* Application Status */}
          <div className={styles.sectionCard}>
            <h2 className={styles.sectionTitle}>View Application Status</h2>
            <div className={styles.statusTabs}>
              <button
                className={`${styles.statusTab} ${styles.activeStatusTab}`}
              >
                Pending
              </button>
              <button className={styles.statusTab}>Approved</button>
            </div>

            <div className={styles.statusTable}>
              <div className={styles.tableHeader}>
                <div className={styles.tableHeaderCell}>Application name</div>
                <div className={styles.tableHeaderCell}>Status</div>
              </div>
              {applications.map((app) => (
                <div key={app.id} className={styles.tableRow}>
                  <div className={styles.tableCell}>
                    <div className={styles.applicationName}>{app.name}</div>
                    <div className={styles.applicationDate}>{app.date}</div>
                  </div>
                  <div className={styles.tableCell}>
                    <span className={styles.pendingBadge}>Pending</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Course Details Modal */}
        {selectedCourse && (
          <CourseDetails
            course={selectedCourse}
            onClose={() => setSelectedCourse(null)}
          />
        )}
      </div>
    </div>
  );
}

// Helper Components
function ProgressStep({ label, status }) {
  return (
    <div className={styles.progressStep}>
      <div className={`${styles.stepCircle} ${styles[status]}`}>
        {status === "completed" && "✓"}
      </div>
      <div className={styles.stepLabel}>{label}</div>
    </div>
  );
}
