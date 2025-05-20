import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import UserRegistration from "./pages/register/userRegistration";
import UserLogin from "./pages/login/userLogin";
import ForgotPassword from "./pages/forgot-password/forgotPassword";
export default function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/register" element={<UserRegistration />} />
				<Route path="/login" element={<UserLogin />} />
				<Route path="/forgot-password" element={<ForgotPassword />} />
			</Routes>
		</Router>
	);
}
