import styles from "./userRegistration.module.css";
import { validateForm } from "../../utils/inputValidation.js";
import { useState } from "react";

export default function UserRegistration() {
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const [errors, setErrors] = useState({});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const validationErrors = validateForm(formData);
		setErrors(validationErrors);

		if (Object.keys(validationErrors).length === 0) {
			// console.log displays the form data for demonstration purposes. Replace with actual API call.
			console.log("User Registration Data:", {
				username: formData.username,
				email: formData.email,
				password: formData.password,
			});
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.formContainer}>
				<h1 className={styles.heading}>Create Account</h1>
				<div className={styles.toggleContainer}>
					<button
						type="button"
						className={`${styles.toggleButton} ${
							formData.role !== "faculty" ? styles.active : ""
						}`}
						onClick={() => setFormData((prev) => ({ ...prev, role: "applicant" }))}
					>
						Applicant
					</button>
					<button
						type="button"
						className={`${styles.toggleButton} ${
							formData.role === "faculty" ? styles.active : ""
						}`}
						onClick={() => setFormData((prev) => ({ ...prev, role: "faculty" }))}
					>
						Faculty
					</button>
				</div>
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						name="username"
						className={styles.input}
						placeholder="Username"
						value={formData.username}
						onChange={handleChange}
						required
					/>
					<input
						type="email"
						name="email"
						className={styles.input}
						placeholder="Email"
						value={formData.email}
						onChange={handleChange}
						required
					/>
					<input
						type="password"
						name="password"
						className={styles.input}
						placeholder="Password"
						value={formData.password}
						onChange={handleChange}
						required
					/>
					{errors.password && <p className={styles.error}>{errors.password}</p>}
					<input
						type="password"
						name="confirmPassword"
						className={styles.input}
						placeholder="Confirm Password"
						value={formData.confirmPassword}
						onChange={handleChange}
						required
					/>
					{errors.confirmPassword && (
						<p className={styles.error}>{errors.confirmPassword}</p>
					)}
					<button type="submit" className={styles.button}>
						Register
					</button>
				</form>
			</div>
		</div>
	);
}
