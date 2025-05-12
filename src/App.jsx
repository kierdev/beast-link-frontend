import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import Dashboard from "./pages/dashboard/dashboard";
import AdmissionCriteria from "./pages/admission-criteria/admissionCriteria";
import Applicants from "./pages/applicants/applicants";
import Notification from "./pages/notifications/notification";
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admission-criteria" element={<AdmissionCriteria />} />
        <Route path="/applicants" element={<Applicants />} />
        <Route path="/notification" element={<Notification />} />
      </Routes>
    </Router>
  );
}
