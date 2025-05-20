import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import styles from "./applicant.module.css";
import CourseDetails from "../../components/course-details/course-details";
import NotificationsDropdown from "../../components/notifications/notifications";
import Sidebar from "../../../../components/side-bar/side-bar";
import { Bell, Search, Calendar, User, Monitor } from "lucide-react";
import { getApplicantDashboardData } from "../../../../data/dashboard-service";
import { LoadingSpinner } from "../../../../components/loading/loading";

// Constants for filter options
const FILTER_OPTIONS = {
  ALL: "all",
  TECHNOLOGY: "technology",
  EDUCATION: "education",
  BUSINESS: "business"
};

export default function ApplicantDashboard() {
  const [state, setState] = useState({
    searchQuery: "",
    activeFilter: FILTER_OPTIONS.ALL,
    courses: [],
    applications: [],
    progress: [],
    selectedCourse: null,
    showNotifications: false,
    loading: false
  });

  const { 
    searchQuery, 
    activeFilter, 
    courses, 
    applications, 
    progress, 
    selectedCourse, 
    showNotifications, 
    loading 
  } = state;

  const notificationsRef = useRef(null);
  const bellIconRef = useRef(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setState(prev => ({ ...prev, loading: true }));
        const { courses, applications, progress } = await getApplicantDashboardData();
        setState(prev => ({ 
          ...prev, 
          courses, 
          applications, 
          progress 
        }));
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setState(prev => ({ ...prev, loading: false }));
      }
    };

    fetchDashboardData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showNotifications &&
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target) &&
        bellIconRef.current &&
        !bellIconRef.current.contains(event.target)
      ) {
        setState(prev => ({ ...prev, showNotifications: false }));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showNotifications]);

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter = 
      activeFilter === FILTER_OPTIONS.ALL ||
      course.category === activeFilter;

    return matchesSearch && matchesFilter;
  });

  const handleViewDetails = (course) => {
    setState(prev => ({ ...prev, selectedCourse: course }));
  };

  const toggleNotifications = (e) => {
    e.stopPropagation();
    setState(prev => ({ ...prev, showNotifications: !prev.showNotifications }));
  };

  const updateState = (key, value) => {
    setState(prev => ({ ...prev, [key]: value }));
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className={styles.dashboardLayout}>
      <Sidebar activePage="dashboard" />
      
      <main className={styles.dashboardMain}>
        <DashboardHeader 
          toggleNotifications={toggleNotifications} 
          bellIconRef={bellIconRef}
          showNotifications={showNotifications}
          notificationsRef={notificationsRef}
        />
        
        <div className={styles.dashboardContent}>
          <ProgressTracker progress={progress} />
          
          <CoursesSection 
            activeFilter={activeFilter}
            searchQuery={searchQuery}
            filteredCourses={filteredCourses}
            updateState={updateState}
            handleViewDetails={handleViewDetails}
          />
          
          <StatsCard />
          
          <ApplicationsSection applications={applications} />
        </div>

        {selectedCourse && (
          <CourseDetails
            className={styles.courseDetails}
            course={selectedCourse}
            onClose={() => updateState("selectedCourse", null)}
          />
        )}
      </main>
    </div>
  );
}

// Sub-components
function DashboardHeader({ toggleNotifications, bellIconRef, showNotifications, notificationsRef }) {
  return (
    <header className={styles.dashboardHeader}>
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
              <NotificationsDropdown onClose={() => setShowNotifications(false)} />
            </div>
          )}
        </div>
        <button className={styles.logoutButton}>Log out</button>
      </div>
    </header>
  );
}

function ProgressTracker({ progress }) {
  return (
    <div className={styles.progressTracker}>
      <div className={styles.progressLine}></div>
      {progress.map((step, index) => (
        <ProgressStep key={index} label={step.label} status={step.status} />
      ))}
    </div>
  );
}

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

function CoursesSection({ activeFilter, searchQuery, filteredCourses, updateState, handleViewDetails }) {
  return (
    <div className={styles.sectionCard}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Available Courses</h2>
      </div>

      <div className={styles.filterTabs}>
        {Object.entries(FILTER_OPTIONS).map(([key, value]) => (
          <button
            key={value}
            className={`${styles.filterTab} ${activeFilter === value ? styles.activeTab : ""}`}
            onClick={() => updateState("activeFilter", value)}
          >
            {value === FILTER_OPTIONS.ALL ? "All" : 
             value === FILTER_OPTIONS.TECHNOLOGY ? "Technology" :
             value === FILTER_OPTIONS.EDUCATION ? "Education" : "Business & Accountancy"}
          </button>
        ))}

        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Search Courses"
            value={searchQuery}
            onChange={(e) => updateState("searchQuery", e.target.value)}
            className={styles.searchInput}
          />
          <span className={styles.searchIcon}>
            <Search />
          </span>
        </div>
      </div>

      <div className={styles.courseGrid}>
        {filteredCourses.map((course) => (
          <CourseCard 
            key={course.id} 
            course={course} 
            handleViewDetails={handleViewDetails} 
          />
        ))}
      </div>
    </div>
  );
}

function CourseCard({ course, handleViewDetails }) {
  return (
    <div className={styles.courseCard}>
      <div className={`${styles.courseIcon} ${styles[course.category]}`}>
        <Monitor />
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
        <p className={styles.courseDescription}>{course.description}</p>
        <div className={styles.courseFooter}>
          <span className={styles.collegeTag}>{course.college}</span>
          <span className={styles.dateTag}>
            <Calendar /> {course.date}
          </span>
        </div>
      </div>
    </div>
  );
}




function StatsCard() {
  return (
    <div className={styles.statsCard}>
      <h2 className={styles.statsTitle}>Learn Effectively With BeastLink College!</h2>
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
  );
}

function ApplicationsSection({ applications }) {
  return (
    <>
      <div className={styles.sectionCard}>
        <h2 className={styles.sectionTitle}>View Application Status</h2>

        <div className={styles.statusTable}>
          <div className={styles.tableHeader}>
            <div className={styles.tableHeaderCell}>Application name</div>
            <div className={styles.tableHeaderCell}>Status</div>
          </div>
          {applications.map((app) => (
            <ApplicationRow key={app.id} app={app} />
          ))}
        </div>
      </div>

      <NewApplicationCard />
    </>
  );
}

function ApplicationRow({ app }) {
  return (
    <div className={styles.tableRow}>
      <div className={styles.tableCell}>
        <div className={styles.applicationName}>{app.name}</div>
        <div className={styles.applicationDate}>{app.date}</div>
      </div>
      <div className={styles.tableCell}>
        <span className={styles.pendingBadge}>Pending</span>
      </div>
    </div>
    
  );
  
}

function NewApplicationCard() {
  const navigate = useNavigate();

  const handleApplyClick = () => {
    // Navigate to the application module
    navigate("/dashboard/module");
  };

  return (
    <div className={`${styles.sectionCard} ${styles.newApplicationCard}`}>
      <div className={styles.newApplicationContent}>
        <h2 className={styles.sectionTitle}>Start a New Application</h2>
        <p className={styles.newApplicationText}>
          Ready to begin your journey? Start a new application to join our programs.
        </p>
        <button 
          className={styles.applyButton}
          onClick={handleApplyClick}
        >
          Apply Now
        </button>
      </div>
    </div>
  );
}