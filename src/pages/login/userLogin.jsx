import { Link } from "react-router-dom";
import styles from "./userLogin.module.css";
import { useState } from "react";

export default function UserLogin() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [activeTab, setActiveTab] = useState("applicant");

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!email || !password) {
			setError("All fields are required.");
			return;
		}

		// Validate email format
		if (!/\S+@\S+\.\S+/.test(email)) {
			setError("Please enter a valid email address.");
			return;
		}

		// Mock database check, replace with actual API call
		const mockDatabase = {
			"user@example.com": "password123",
		};

		if (!mockDatabase[email] || mockDatabase[email] !== password) {
			setError("Invalid email or password.");
			return;
		}

		// Perform login logic here
		setError(""); // Clear error if validation passes
		alert(`Login successful as ${activeTab}!`);
	};

	return (
		<div className={styles.container}>
			<div className={styles.formContainer}>
				<div className={styles.imageContainer}>{/*insert image here*/}</div>
				<h1 className={styles.heading}>Beastlink University</h1>
				<h3 className={styles.heading}>Login</h3>
				<div className={styles.radioContainer}>
					<div className={styles.tabs}>
						<input
							type="radio"
							id="applicant"
							name="userType"
							value="applicant"
							checked={activeTab === "applicant"}
							onChange={() => setActiveTab("applicant")}
							className={styles.radioInput}
						/>
						<label htmlFor="applicant" className={styles.tabLabel}>
							Applicant
						</label>
						<input
							type="radio"
							id="faculty"
							name="userType"
							value="faculty"
							checked={activeTab === "faculty"}
							onChange={() => setActiveTab("faculty")}
							className={styles.radioInput}
						/>
						<label htmlFor="faculty" className={styles.tabLabel}>
							Faculty
						</label>
					</div>
				</div>
				<form onSubmit={handleSubmit}>
					<input
						type="email"
						className={styles.input}
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
					<input
						type="password"
						className={styles.input}
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
					{error && <p className={styles.error}>{error}</p>}
					<label className={styles.label}>
						<input id="keepSession" type="checkbox" className={styles.checkbox} />
						Remember Me
					</label>
					<button type="submit" className={styles.button}>
						Login as {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
					</button>
					<Link to="/forgot-password" className={styles.forgotPassword}>
						Forgot Password?
					</Link>
				</form>
			</div>
		</div>
	);
}
