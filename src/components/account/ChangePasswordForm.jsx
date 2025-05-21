import React, { useState } from "react";
import "./ChangePasswordForm.css";

export const ChangePasswordForm = ({ onSubmit, onCancel }) => {
	const [passwordData, setPasswordData] = useState({
		currentPassword: "",
		newPassword: "",
		confirmPassword: "",
	});
	const [showPassword, setShowPassword] = useState({
		current: false,
		new: false,
		confirm: false,
	});
	const [errors, setErrors] = useState({});

	const validatePassword = (password) => {
		const errors = [];
		if (password.length < 12) {
			errors.push("Minimum characters 12");
		}
		if (!/[A-Z]/.test(password)) {
			errors.push("One uppercase character");
		}
		if (!/[a-z]/.test(password)) {
			errors.push("One lowercase character");
		}
		if (!/\d/.test(password)) {
			errors.push("One number");
		}
		if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
			errors.push("One special character");
		}
		return errors;
	};

	const handleChange = (field) => (e) => {
		const value = e.target.value;
		setPasswordData((prev) => ({
			...prev,
			[field]: value,
		}));

		// Clear errors when typing
		setErrors((prev) => ({
			...prev,
			[field]: undefined,
		}));

		// Validate new password as user types
		if (field === "newPassword") {
			const validationErrors = validatePassword(value);
			setErrors((prev) => ({
				...prev,
				newPassword: validationErrors.length > 0 ? validationErrors : undefined,
			}));
		}

		// Check confirm password match
		if (
			field === "confirmPassword" ||
			(field === "newPassword" && passwordData.confirmPassword)
		) {
			setErrors((prev) => ({
				...prev,
				confirmPassword:
					value !==
					(field === "confirmPassword"
						? passwordData.newPassword
						: passwordData.confirmPassword)
						? ["Passwords do not match"]
						: undefined,
			}));
		}
	};

	const togglePasswordVisibility = (field) => {
		setShowPassword((prev) => ({
			...prev,
			[field]: !prev[field],
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const validationErrors = validatePassword(passwordData.newPassword);

		if (validationErrors.length > 0) {
			setErrors((prev) => ({
				...prev,
				newPassword: validationErrors,
			}));
			return;
		}

		if (passwordData.newPassword !== passwordData.confirmPassword) {
			setErrors((prev) => ({
				...prev,
				confirmPassword: ["Passwords do not match"],
			}));
			return;
		}

		onSubmit(passwordData);
	};

	return (
		<form onSubmit={handleSubmit} className="change-password-form">
			<div className="form-header">
				<h2>Change Password</h2>
			</div>

			<div className="form-content">
				<div className="form-group">
					<label htmlFor="currentPassword">Current Password:</label>
					<div className="password-input-container">
						<input
							id="currentPassword"
							type={showPassword.current ? "text" : "password"}
							value={passwordData.currentPassword}
							onChange={handleChange("currentPassword")}
							className={errors.currentPassword ? "error" : ""}
						/>
						<button
							type="button"
							onClick={() => togglePasswordVisibility("current")}
							className="toggle-password"
						>
							{showPassword.current ? "Hide" : "Show"}
						</button>
					</div>
				</div>

				<div className="form-group">
					<label htmlFor="newPassword">New Password:</label>
					<div className="password-input-container">
						<input
							id="newPassword"
							type={showPassword.new ? "text" : "password"}
							value={passwordData.newPassword}
							onChange={handleChange("newPassword")}
							className={errors.newPassword ? "error" : ""}
						/>
						<button
							type="button"
							onClick={() => togglePasswordVisibility("new")}
							className="toggle-password"
						>
							{showPassword.new ? "Hide" : "Show"}
						</button>
					</div>
					{errors.newPassword && (
						<div className="password-requirements">
							<p>Please add all necessary characters to create safe password.</p>
							<ul>
								{errors.newPassword.map((error, index) => (
									<li key={index} className="requirement-item">
										{error}
									</li>
								))}
							</ul>
						</div>
					)}
				</div>

				<div className="form-group">
					<label htmlFor="confirmPassword">Confirm new Password:</label>
					<div className="password-input-container">
						<input
							id="confirmPassword"
							type={showPassword.confirm ? "text" : "password"}
							value={passwordData.confirmPassword}
							onChange={handleChange("confirmPassword")}
							className={errors.confirmPassword ? "error" : ""}
						/>
						<button
							type="button"
							onClick={() => togglePasswordVisibility("confirm")}
							className="toggle-password"
						>
							{showPassword.confirm ? "Hide" : "Show"}
						</button>
					</div>
					{errors.confirmPassword && (
						<div className="error-message">{errors.confirmPassword[0]}</div>
					)}
				</div>

				<div className="form-actions">
					<button type="submit" className="update-btn">
						Update Password
					</button>
					<button type="button" className="back-link" onClick={onCancel}>
						Back to Log In
					</button>
				</div>
			</div>
		</form>
	);
};
