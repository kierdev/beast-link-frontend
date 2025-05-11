import { useState, useRef, useEffect } from "react";
import styles from "./applicant.module.css";
import CourseDetails from "../../components/course-details/course-details";
import NotificationsDropdown from "../../components/notifications/notifications";
import Sidebar from "../../../../components/side-bar/side-bar";
import {
  Bell,
  Search,
  Calendar,
  User,
  Globe,
  Monitor,
  Users,
  Building,
  GraduationCap,
  DollarSign,
} from "lucide-react";

export default function ApplicantDashboard() {
  // State for search and filter functionality
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  // State for course details modal and notifications
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);

  // Refs for click outside detection
  const notificationsRef = useRef(null);
  const bellIconRef = useRef(null);

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

  // Sample course data
  const courses = [
    {
      id: 1,
      title: "Computer Science",
      count: "5,000+ Courses",
      description:
        "Covers algorithms, programming, and problem-solving, essential for computing and software development.",
      college: "College of Technology",
      date: "Apr 25, 2025",
      category: "technology",
      icon: <Monitor />,
    },
    {
      id: 2,
      title: "Special Education",
      count: "5,000+ Courses",
      description:
        "Equips teachers with strategies to support students with disabilities and special needs, promoting inclusive and adaptive learning.",
      college: "College of Education",
      date: "Apr 25, 2025",
      category: "education",
      icon: <Search />,
    },
    {
      id: 3,
      title: "Computer Engineering",
      count: "5,000+ Courses",
      description:
        "Covers hardware, software, and embedded systems, essential for designing and optimizing computing technologies.",
      college: "College of Technology",
      date: "Apr 25, 2025",
      category: "technology",
      icon: <Monitor />,
    },
    {
      id: 4,
      title: "Accountancy",
      count: "5,000+ Courses",
      description:
        "Prepares students for careers in accounting, auditing, and taxation, with a strong focus on financial reporting and CPA licensure.",
      college: "College of Business and Accountancy",
      date: "Apr 25, 2025",
      category: "business",
      icon: <DollarSign />,
    },
    {
      id: 5,
      title: "Information Technology",
      count: "5,000+ Courses",
      description:
        "Covers networking, cybersecurity, and software development, essential for IT support and system management.",
      college: "College of Technology",
      date: "Apr 25, 2025",
      category: "technology",
      icon: <Globe />,
    },
    {
      id: 6,
      title: "Human Resource Development Management",
      count: "5,000+ Courses",
      description:
        "Equips students with skills in recruitment, training, and labor relations, essential for effective workforce management and organizational development.",
      college: "College of Business and Accountancy",
      date: "Apr 25, 2025",
      category: "business",
      icon: <Users />,
    },
    {
      id: 7,
      title: "Elementary Education",
      count: "5,000+ Courses",
      description:
        "Prepares future teachers for primary education, focusing on child development, pedagogy, and subject-specific teaching for Grades 1-6.",
      college: "College of Education",
      date: "Apr 25, 2025",
      category: "education",
      icon: <Building />,
    },
    {
      id: 8,
      title: "Financial Management",
      count: "5,000+ Courses",
      description:
        "Teaches financial analysis, investment strategies, and risk management, preparing students for careers in banking, corporate finance, and investment planning.",
      college: "College of Business and Accountancy",
      date: "Apr 25, 2025",
      category: "business",
      icon: <DollarSign />,
    },
    {
      id: 9,
      title: "Secondary Education",
      count: "5,000+ Courses",
      description:
        "Trains educators to teach in junior and senior high school (Grades 7-12), specializing in subjects like Math, Science, English, or Social Studies.",
      college: "College of Education",
      date: "Apr 25, 2025",
      category: "education",
      icon: <GraduationCap />,
    },
  ];

  // Sample application data
  const applications = [
    {
      id: 1,
      name: "Computer Science",
      date: "2025-02-15",
      status: "pending",
    },
    {
      id: 2,
      name: "Human Resource Development Management",
      date: "2025-02-20",
      status: "pending",
    },
  ];

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
                <span className={styles.notificationBadge}>2</span>
                <Bell />
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
            <ProgressStep label="Application" status="completed" />
            <ProgressStep label="Document" status="completed" />
            <ProgressStep label="Exam" status="current" />
            <ProgressStep label="Interview" status="upcoming" />
            <ProgressStep label="Decision" status="upcoming" />
            <ProgressStep label="Enrollment" status="upcoming" />
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
                    {course.icon}
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

          {/* Application Form */}
          <div className={styles.formCard}>
            <h2 className={styles.formTitle}>Application Form</h2>
            <p className={styles.formDescription}>
              A section with a direct link to the online application portal to
              view and submit personal details, academic records, and documents.
            </p>
            <button className={styles.viewButton}>View</button>
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
