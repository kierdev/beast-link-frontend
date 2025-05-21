import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import EditAccount from "./pages/editAccount/editAccount";
export default function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/edit-account" element={<EditAccount />} />
			</Routes>
		</Router>
	);
}
