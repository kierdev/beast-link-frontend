import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import Dashboard from "./pages/dashboard/dashboard";
import Applicant_Dashboard from "./pages/dashboard/applicant";
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/applicant" element={<Applicant_Dashboard />} />
      </Routes>
    </Router>
  );
}
