"use client";

import { useState } from "react";
import styles from "./notification.module.css";

export default function NotificationDropdown({ initialNotifications = [] }) {
  const [notifications, setNotifications] = useState(initialNotifications);

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  // Mark a single notification as read
  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  return (
    <div className={styles.notificationsDropdown}>
      <div className={styles.notificationsHeader}>
        <h3>Notifications</h3>
        {notifications.length > 0 && (
          <button className={styles.markAllRead} onClick={markAllAsRead}>
            Mark all as read
          </button>
        )}
      </div>
      <div className={styles.notificationsList}>
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`${styles.notificationItem} ${
                notification.read ? styles.notificationRead : ""
              }`}
              onClick={() => markAsRead(notification.id)}
            >
              <div className={styles.notificationContent}>
                <h3 className={styles.notificationType}>{notification.type}</h3>
                <div className={styles.notificationMessage}>
                  {notification.message}
                </div>
              </div>
              <div className={styles.notificationTime}>{notification.time}</div>
            </div>
          ))
        ) : (
          <div className={styles.emptyState}>No new notifications</div>
        )}
      </div>
    </div>
  );
}
