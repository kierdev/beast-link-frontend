import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import Dashboard from "./pages/dashboard/dashboard";
import AdmissionCriteria from "./pages/admission-criteria/admissionCriteria";
import UserRegistration from "./pages/register/userRegistration";
import UserLogin from "./pages/login/userLogin";
export default function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/admission-criteria" element={<AdmissionCriteria />} />
				<Route path="/register" element={<UserRegistration />} />
				<Route path="/login" element={<UserLogin />} />
			</Routes>
		</Router>
	);
}
