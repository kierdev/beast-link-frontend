import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ApplicantDashboard from "./pages/dashboard/pages/applicant/applicant";
import InterviewerDashboard from "./pages/dashboard/pages/interviewer/interviewer";
import ChairpersonDashboard from "./pages/dashboard/pages/chairperson/chairperson";
import AdminDashboard from "./pages/dashboard/pages/admin/admin";

export default function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<ApplicantDashboard />} />
        <Route
          path="/dashboard/chairperson"
          element={<ChairpersonDashboard />}
        />
        <Route path="/dashboard/applicant" element={<ApplicantDashboard />} />
      </Routes>
    </Router>
  );
}
