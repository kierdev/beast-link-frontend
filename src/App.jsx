import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Applicant_Dashboard from "./pages/dashboard/applicant";
import Faculty_Dashboard from "./pages/dashboard/faculty";
import Chairperson_Dashboard from "./pages/dashboard/chairperson";
import Admin_Dashboard from "./pages/dashboard/admin";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Admin_Dashboard />} />
        <Route path="/dashboard/admin" element={<Admin_Dashboard />} />
        <Route
          path="/dashboard/chairperson"
          element={<Chairperson_Dashboard />}
        />
        <Route path="/dashboard/faculty" element={<Faculty_Dashboard />} />
        <Route path="/dashboard/admin" element={<Admin_Dashboard />} />
      </Routes>
    </Router>
  );
}
