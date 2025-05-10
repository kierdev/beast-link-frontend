import { Menu } from "lucide-react"
import { useSidebar } from "../../../components/sidebar-context"

export default function AdmissionCriteriaLayout({ children }) {
  const { toggleSidebar } = useSidebar()

  return (
    <div className="admission-criteria-layout">
      <div className="admission-criteria-header">
        <div className="header-content">
          <button className="menu-button" onClick={toggleSidebar} aria-label="Toggle sidebar" title="Toggle sidebar">
            <Menu className="menu-icon" />
          </button>
          <h1>Admission Criteria</h1>
        </div>
      </div>
      <div className="admission-criteria-content">{children}</div>
    </div>
  )
}
