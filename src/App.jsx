import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import EditAccount from "./pages/editAccount/editAccount";
import EditAccountProfile from "./pages/editAccountProfile/editAccountProfile";

export default function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/edit-account" element={<EditAccount />} />
				<Route path="/edit-profile" element={<EditAccountProfile />} />
			</Routes>
		</Router>
	);
}
