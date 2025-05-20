import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import Dashboard from "./pages/dashboard/dashboard";
import AdmissionCriteria from "./pages/admission-criteria/admissionCriteria";
import Applicants from "./pages/applicants/applicants";
import Notification from "./pages/notifications/notification";
import AdminNotification from "./pages/admin/admin";
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admission-criteria" element={<AdmissionCriteria />} />
        <Route path="/applicants" element={<Applicants />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/notification/admin" element={<AdminNotification />} />
      </Routes>
    </Router>
  );
}
