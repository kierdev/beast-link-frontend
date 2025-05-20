import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ApplicantDashboard from "./pages/dashboard/pages/applicant/applicant";
import InterviewerDashboard from "./pages/dashboard/pages/interviewer/interviewer";
import ChairpersonDashboard from "./pages/dashboard/pages/chairperson/chairperson";
import AdminDashboard from "./pages/dashboard/pages/admin/admin";
import ModuleNotice from "./pages/dashboard/module";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard/applicant" element={<ApplicantDashboard />} />
        <Route path="/dashboard/admin" element={<AdminDashboard />} />

        <Route
          path="/dashboard/chairperson"
          element={<ChairpersonDashboard />}
        />
        <Route
          path="/dashboard/interviewer"
          element={<InterviewerDashboard />}
        />

        <Route path="/dashboard/module" element={<ModuleNotice />} />
      </Routes>
    </Router>
  );
}
