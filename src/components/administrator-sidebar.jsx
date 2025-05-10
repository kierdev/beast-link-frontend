import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { ChevronDown, GraduationCap, Calendar, BookOpen } from "lucide-react"
import { useSidebar } from "./sidebar-context"
import logo from "../assets/image/logo.png"

export default function AdministratorSidebar() {
  const [isOpen, setIsOpen] = useState(true)
  const location = useLocation()
  const { isSidebarCollapsed } = useSidebar()

  // Function to check if a link is active
  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <div className={`admin-sidebar ${isSidebarCollapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <img
          src={logo}
          alt="Logo"
          className="sidebar-logo"
        />
        <h4>BeastLink University</h4>
      </div>
      <nav className="sidebar-nav">
        <div className="sidebar-section">
          <div className="sidebar-section-header">
            <div className="section-title" onClick={() => setIsOpen(!isOpen)}>
              <GraduationCap className="sidebar-icon" />
              <span className="section-text">Admission Criteria</span>
              <ChevronDown
                className={`sidebar-chevron ${isOpen ? "open" : ""}`}
              />
            </div>
          </div>

          {isOpen && (
            <div className="sidebar-section-content">
              <Link
                to="/administrator/admission-criteria/academic-year"
                className={`sidebar-link ${
                  isActive("/administrator/admission-criteria/academic-year")
                    ? "active"
                    : ""
                }`}
              >
                <Calendar className="sidebar-icon" />
                <span>Academic Year</span>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
