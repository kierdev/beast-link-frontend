import "../admin/main.css"
import { SidebarProvider } from "../../components/sidebar-context"
import AdministratorSidebar from "../../components/administrator-sidebar";


export default function AdministratorLayout({ children }) {
  return (
    <SidebarProvider>
      <div className="admin-layout">
        <AdministratorSidebar />
        <main className="admin-content">{children}</main>
      </div>
    </SidebarProvider>
  );
}
