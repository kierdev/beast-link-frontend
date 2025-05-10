import "../program-head/main.css"
import { SidebarProvider } from "../../components/sidebar-context"
import AdminSidebar from "../../components/admin-sidebar"

export default function AdminLayout({ children }) {
  return (
    <SidebarProvider>
      <div className="admin-layout">
        <AdminSidebar />
        <main className="admin-content">{children}</main>
      </div>
    </SidebarProvider>
  )
}
