import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import Dashboard from "./pages/dashboard/dashboard";
import Applicant_Dashboard from "./pages/dashboard/applicant";
import Faculty_Dashboard from "./pages/dashboard/faculty";
import Chairperson_Dashboard from "./pages/dashboard/chairperson";
import Admin_Dashboard from "./pages/dashboard/admin";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Admin_Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* <Route path="/admin" element={<Admin_Dashboard />} />
        <Route path="/chairperson" element={<Chairperson_Dashboard />} />
        <Route path="/faculty" element={<Faculty_Dashboard />} />
        <Route path="/admin" element={<Admin_Dashboard />} /> */}
      </Routes>
    </Router>
  );
}
