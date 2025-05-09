"use client"

import { useState } from "react"
import styles from "./dashboard.module.css"

export default function NotificationsDropdown({ onClose }) {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "Application Update",
      message: "Your Computer Science application has been received.",
      time: "10 minutes ago",
      read: false,
    },
    {
      id: 2,
      type: "Exam Reminder",
      message: "Your admission exam for IT is scheduled tomorrow at 10:00 AM.",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      type: "Document Required",
      message: "Please upload your transcript for the Engineering application.",
      time: "3 hours ago",
      read: false,
    },
    {
      id: 4,
      type: "Payment Confirmation",
      message: "Your application fee payment has been confirmed.",
      time: "Yesterday",
      read: true,
    },
  ])

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        read: true,
      })),
    )
  }

  // Mark a single notification as read
  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  return (
    <div className={styles.notificationsDropdown}>
      <div className={styles.notificationsHeader}>
        <h3>Notifications</h3>
        <button className={styles.markAllRead} onClick={markAllAsRead}>
          Mark all as read
        </button>
      </div>
      <div className={styles.notificationsList}>
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`${styles.notificationItem} ${notification.read ? styles.notificationRead : ""}`}
            onClick={() => markAsRead(notification.id)}
          >
            <div className={styles.notificationContent}>
              <h3 className={styles.notificationType}>{notification.type}</h3>
              <div className={styles.notificationMessage}>{notification.message}</div>
            </div>
            <div className={styles.notificationTime}>{notification.time}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
