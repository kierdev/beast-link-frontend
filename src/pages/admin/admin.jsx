import React, { useState, useEffect, useRef } from 'react';
import styles from './adminNotification.module.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import logo from '../../assets/logo.png'

// Use relative URL since we're using Vite's proxy
const API_BASE_URL = '/api';

export default function AdminNotification() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [allRead, setAllRead] = useState(false);
  const [filter, setFilter] = useState('all');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    fetchNotifications();
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/notifications`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setNotifications(data);
      setLoading(false);
      setAllRead(data.every(notification => notification.is_read));
    } catch (err) {
      console.error('Error fetching notifications:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  const handleAdminMarkAllAsRead = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/notifications/mark-all-admin-read`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || `HTTP error! status: ${response.status}`);
      }

      setNotifications(prevNotifications => 
        prevNotifications.map(notification => ({
          ...notification,
          is_read: true
        }))
      );
      setAllRead(true);
    } catch (err) {
      console.error('Error marking notifications as read:', err);
      setError(err.message);
    }
  };

  const handleNotificationClick = async (notification) => {
    setSelectedNotification(notification);
    
    if (!notification.is_read) {
      try {
        const response = await fetch(`${API_BASE_URL}/notifications/${notification.notification_id}/read`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          throw new Error(errorData?.message || `HTTP error! status: ${response.status}`);
        }

        setNotifications(prevNotifications =>
          prevNotifications.map(n =>
            n.notification_id === notification.notification_id ? { ...n, is_read: true } : n
          )
        );

        const updatedNotifications = notifications.map(n =>
          n.notification_id === notification.notification_id ? { ...n, is_read: true } : n
        );
        setAllRead(updatedNotifications.every(n => n.is_read));
      } catch (err) {
        console.error('Error marking notification as read:', err);
        setError(err.message);
      }
    }
  };

  const handleDeleteNotification = async (notificationId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/notifications/${notificationId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || `HTTP error! status: ${response.status}`);
      }

      setNotifications(prevNotifications =>
        prevNotifications.filter(n => n.notification_id !== notificationId)
      );

      if (selectedNotification?.notification_id === notificationId) {
        setSelectedNotification(null);
      }

      const remainingNotifications = notifications.filter(n => n.notification_id !== notificationId);
      setAllRead(remainingNotifications.every(n => n.is_read));
    } catch (err) {
      console.error('Error deleting notification:', err);
      setError(err.message);
    }
  };

  const handleCloseModal = () => {
    setSelectedNotification(null);
  };

  const getFilteredNotifications = () => {
    switch (filter) {
      case 'unread':
        return notifications.filter(notification => !notification.is_read);
      case 'read':
        return notifications.filter(notification => notification.is_read);
      default:
        return notifications;
    }
  };

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
          <a href="applicants" className={styles.menuItem}><i className="fas fa-user-graduate"></i> Students/Classes</a>
          <a href="#" className={styles.menuItem}><i className="fas fa-gear"></i> Settings and Profile</a>
          <a href="#" className={styles.menuItem}><i className="far fa-clipboard"></i> Exams</a>
        </div>
      </div>

      {/* Content */}
      <div className={styles.main}>
        <div className={styles.topBar}>
          <h2>Notifications</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div className={styles.filterDropdownWrapper} ref={dropdownRef}>
              <button
                className={styles.filterDropdownButton}
                onClick={() => setDropdownOpen((open) => !open)}
              >
                Filters <span className={styles.caret}></span>
              </button>
              {dropdownOpen && (
                <div className={styles.filterDropdownMenu}>
                  <div className={styles.filterDropdownOption} onClick={() => { setFilter('all'); setDropdownOpen(false); }}>All</div>
                  <div className={styles.filterDropdownOption} onClick={() => { setFilter('unread'); setDropdownOpen(false); }}>Unread</div>
                  <div className={styles.filterDropdownOption} onClick={() => { setFilter('read'); setDropdownOpen(false); }}>Read</div>
                </div>
              )}
            </div>
            <button 
              onClick={handleAdminMarkAllAsRead}
              className={styles.markReadButton}
              disabled={allRead || notifications.length === 0}
            >
              Mark All as Read
            </button>
            <div className={styles.logout}>
              <button className={styles.logoutButton}>Log out</button>
            </div>
          </div>
        </div>

        <div className={styles.notificationContainer}>
          {loading ? (
            <p className={styles.loadingMessage}>Loading notifications...</p>
          ) : error ? (
            <p className={styles.errorMessage}>Error: {error}</p>
          ) : getFilteredNotifications().length === 0 ? (
            <p className={styles.noNotifications}>No notifications found</p>
          ) : (
            <div className={styles.notificationList}>
              {getFilteredNotifications().map((notification, index) => (
                <div 
                  key={notification.notification_id || index} 
                  className={`${styles.notificationItem} ${notification.is_read ? styles.read : styles.unread}`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className={styles.notificationContent}>
                    <h3>{notification.title}</h3>
                    <p>{notification.message}</p>
                    <span className={styles.timestamp}>{new Date(notification.created_at).toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Notification Modal */}
        {selectedNotification && (
          <div className={styles.modalOverlay} onClick={handleCloseModal}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
              <div className={styles.modalHeader}>
                <h2>{selectedNotification.title}</h2>
                <div className={styles.modalActions}>
                  <button 
                    className={styles.deleteButton}
                    onClick={() => handleDeleteNotification(selectedNotification.notification_id)}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                  <button className={styles.closeButton} onClick={handleCloseModal}>
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
              <div className={styles.modalContent}>
                <p className={styles.modalMessage}>{selectedNotification.message}</p>
                <div className={styles.modalFooter}>
                  <span className={styles.modalTimestamp}>
                    {new Date(selectedNotification.created_at).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}