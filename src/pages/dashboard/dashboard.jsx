import React, { useState } from 'react';
import styles from './Dashboard.module.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import logo from '../../assets/logo.png'

export default function Dashboard() {
  const [filterOpen, setFilterOpen] = useState(false);

  const courses = [
    { code: 'CS', name: 'Computer Science', colorClass: styles.cs },
    { code: 'CoE', name: 'Computer Engineering', colorClass: styles.coe },
    { code: 'IT', name: 'Information Technology', colorClass: styles.it },
    { code: 'A', name: 'Accountancy', colorClass: styles.a },
    { code: 'HM', name: 'Human Management', colorClass: styles.hm }
  ];

  return (
    <div className={styles.app}>
      {/* Sidebar */}
      <div className={styles.sidebar}>
        <img src={logo} alt="Logo" className={styles.logo} />
        <h2>Beastlink University</h2>
        <hr className={styles.divider} />
        <div className={styles.menu}>
          <a className={`${styles.menuItem} ${styles.activeMenuItem}`}>
            <i className="fas fa-home"></i> Dashboard
          </a>
          <a href="student.html" className={styles.menuItem}><i className="far fa-calendar-alt"></i> Events</a>
          <a href="student.html" className={styles.menuItem}><i className="fas fa-user-graduate"></i> Students/Classes</a>
          <a href="student.html" className={styles.menuItem}><i className="fas fa-gear"></i> Settings and Profile</a>
          <a href="student.html" className={styles.menuItem}><i className="far fa-clipboard"></i> Exams</a>
        </div>
      </div>

      {/* Main */}
      <div className={styles.main}>
        <div className={styles.topBar}>
          <div className={styles.searchFilterContainer}>
            <div className={styles.filterWrapper}>
              <button 
                className={styles.filterButton} 
                onClick={() => setFilterOpen(!filterOpen)}
              >
                Filters <i className="fas fa-chevron-down"></i>
              </button>
              <div className={`${styles.filterDropdown} ${filterOpen ? styles.show : ''}`}>
                {['Mathematics', 'Science', 'History', 'Language'].map((subject) => (
                  <div key={subject} className={styles.filterOption}>
                    <input type="checkbox" id={`filter-${subject.toLowerCase()}`} />
                    <label htmlFor={`filter-${subject.toLowerCase()}`}>{subject}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.searchBox}>
              <input type="text" placeholder="Search Courses" className={styles.searchInput} />
              <i className="fas fa-search"></i>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div className={styles.notification}>
              <a href="notification.html"><i className="far fa-bell"></i></a>
            </div>
            <div className={styles.logout}>
              <button className={styles.logoutButton}>Log out</button>
            </div>
          </div>
        </div>

        <div className={styles.topBanner}>
          <h3>Learn With Effectively With Us!</h3>
          <p>Students: 50,000+</p>
        </div>

        <div className={styles.content}>
          {/* Left Panel */}
          <div className={styles.leftPanel}>
            <div className={styles.card}>
              <h3>All Courses</h3>
              {courses.map(course => (
                <div key={course.name} className={styles.courseItem}>
                  <div>
                    <span className={`${styles.courseCode} ${course.colorClass}`}>{course.code}</span>
                    {course.name}
                  </div>
                  <button>View Details</button>
                </div>
              ))}
            </div>

            <div className={styles.card}>
              <h3>View Application Status</h3>
              <p><strong>Information Technology:</strong> <span className={styles.statusPending}>Pending</span></p>
              <p><strong>Computer Science:</strong> <span className={styles.statusPending}>Pending</span></p>
            </div>
          </div>

          {/* Right Panel */}
          <div className={styles.rightPanel}>
            <div className={styles.card}>
              <h3>Applicant Result</h3>
              <div className={styles.circle}>75%<br />Passed</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}