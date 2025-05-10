import { createContext, useContext, useState } from "react"

// Create context
const SidebarContext = createContext({
  isSidebarCollapsed: false,
  toggleSidebar: () => {},
})

// Provider component
export function SidebarProvider({ children }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed)
  }

  return <SidebarContext.Provider value={{ isSidebarCollapsed, toggleSidebar }}>{children}</SidebarContext.Provider>
}

// Hook to use the sidebar context
export function useSidebar() {
  return useContext(SidebarContext)
}
