import React from "react";
import { ChangePasswordForm } from "../../components/account/ChangePasswordForm";
import styles from "./changePassword.module.css";

const ChangePassword = () => {
	const handlePasswordChange = async (passwordData) => {
		try {
			// TODO: Implement API call
			// await updatePassword(passwordData);
			console.log("Password update request:", passwordData);
			// Navigate to login or show success message
		} catch (error) {
			console.error("Failed to update password:", error);
		}
	};

	const handleCancel = () => {
		// TODO: Navigate to login page
		console.log("Navigating to login...");
	};

	return (
		<div className={styles.container}>
			<ChangePasswordForm onSubmit={handlePasswordChange} onCancel={handleCancel} />
		</div>
	);
};

export default ChangePassword;
