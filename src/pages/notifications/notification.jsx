import React, { useState } from 'react';
import styles from './Notification.module.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import logo from '../../assets/logo.png'

export default function Notification() {
  const [filterOpen, setFilterOpen] = useState(false);
  
  return (
    <div className={styles.app}>
      {/* Sidebar */}
      <div className={styles.sidebar}>
        <img src={logo} alt="Logo" className={styles.logo} />
        <h2>Beastlink University</h2>
        <hr className={styles.divider} />
        <div className={styles.menu}>
          <a href="dashboard" className={styles.menuItem}><i className="fas fa-home"></i> Dashboard</a>
          <a href="#" className={styles.menuItem}><i className="far fa-calendar-alt"></i> Events</a>
          <a className={`${styles.menuItem} ${styles.activeMenuItem}`}><i className="fas fa-user-graduate"></i> Students/Classes</a>
          <a href="#" className={styles.menuItem}><i className="fas fa-gear"></i> Settings and Profile</a>
          <a href="#" className={styles.menuItem}><i className="far fa-clipboard"></i> Exams</a>
        </div>
      </div>

      {/* Content */}
      <div className={styles.main}>
        <div className={styles.topBar}>
        <h2>Notifications</h2>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div className={styles.logout}>
              <button className={styles.logoutButton}>Log out</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}