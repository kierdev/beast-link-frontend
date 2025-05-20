import { Route } from "react-router-dom";
import styles from "./forgotPassword.module.css";
import { useState } from "react";

export default function ForgotPassword() {
	const [email, setEmail] = useState("");
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		setError("");
		setSuccess("");

		if (!email) {
			setError("Email is required.");
			return;
		}

		// Validate email format
		if (!/\S+@\S+\.\S+/.test(email)) {
			setError("Please enter a valid email address.");
			return;
		}

		// Simulate API call for password reset
		setTimeout(() => {
			// For demo, assume email exists
			setSuccess("If this email is registered, a password reset link has been sent.");
		}, 1000);
	};

	return (
		<div className={styles.container}>
			<div className={styles.formContainer}>
				<div className={styles.imageContainer}>{/*insert image here*/}</div>
				<h1 className={styles.heading}>Beastlink University</h1>
				<h3 className={styles.heading}>Forgot Password</h3>
				<form onSubmit={handleSubmit}>
					<input
						type="email"
						className={styles.input}
						placeholder="Enter your email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
					{error && <p className={styles.error}>{error}</p>}
					{success && <p className={styles.success}>{success}</p>}
					<button type="submit" className={styles.button}>
						Send Reset Link
					</button>
					<p className={styles.link}>
						<a href="/login">Back to Login</a>
					</p>
				</form>
			</div>
		</div>
	);
}
