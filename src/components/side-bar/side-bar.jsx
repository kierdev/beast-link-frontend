"use client";

import styles from "./side-bar.module.css";
import { useState } from "react";
import { Home, Calendar, Users, User, Book } from "lucide-react";

export default function Sidebar({ activePage }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={`${styles.sidebar} ${
        collapsed ? styles.sidebarCollapsed : ""
      }`}
    >
      <div className={styles.sidebarHeader}>
        <div className={styles.logoContainer}>
          <div className={styles.logo}>B</div>
        </div>
        <div className={styles.universityName}>
          <div>Beastlink</div>
          <div>University</div>
        </div>
      </div>
      <nav className={styles.sidebarNav}>
        <NavItem
          icon={<Home />}
          label="Dashboard"
          active={activePage === "dashboard"}
        />
        <NavItem
          icon={<Calendar />}
          label="Events"
          active={activePage === "events"}
        />
        <NavItem
          icon={<Users />}
          label="Students"
          active={activePage === "students"}
        />
        <NavItem
          icon={<User />}
          label="Profile"
          active={activePage === "profile"}
        />
        <NavItem
          icon={<Book />}
          label="Exams"
          active={activePage === "exams"}
        />
      </nav>
    </div>
  );
}

function NavItem({ icon, label, active }) {
  return (
    <a
      href="#"
      className={`${styles.navItem} ${active ? styles.activeNavItem : ""}`}
    >
      <div className={styles.navIcon}>{icon}</div>
      <span className={styles.navLabel}>{label}</span>
    </a>
  );
}
