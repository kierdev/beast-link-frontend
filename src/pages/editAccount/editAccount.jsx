import React, { useState, useEffect } from "react";
import {
	ProfileCard,
	PersonalInfoCard,
	AdmissionDetailsCard,
} from "../../components/profile/index.jsx";
import { administratorData, employeeData, applicantData } from "../../utils/mockData.js";
import styles from "./editAcccount.module.css";

const EditAccount = ({ currentUser = null }) => {
	const [userData, setUserData] = useState({});
	const [userRole, setUserRole] = useState("");
	const [isSaving, setIsSaving] = useState(false);
	const [saveMessage, setSaveMessage] = useState("");
	const [isEditing, setIsEditing] = useState(false);
	const [editDraft, setEditDraft] = useState({});

	useEffect(() => {
		const user = currentUser || {
			id: "25-0001",
			role: "Employee",
		};
		setUserRole(user.role);

		let initialData;
		switch (user.role) {
			case "Administrator":
				initialData = administratorData;
				break;
			case "Employee":
				initialData = employeeData;
				break;
			case "Applicant":
				initialData = applicantData;
				break;
			default:
				initialData = {};
		}
		setUserData(initialData);
		setEditDraft(initialData);
	}, [currentUser]);

	const handleUpdate = (updatedData) => {
		setEditDraft(updatedData);
	};

	const handleEditToggle = () => {
		if (isEditing) {
			handleSave();
		} else {
			setEditDraft(userData);
			setIsEditing(true);
		}
	};

	const handleSave = () => {
		setIsSaving(true);
		setUserData(editDraft);
		setIsEditing(false);

		// Simulate API call
		setTimeout(() => {
			setIsSaving(false);
			setSaveMessage("Account information updated successfully!");
			setTimeout(() => setSaveMessage(""), 3000);
		}, 1000);
	};

	const handleCancel = () => {
		if (isEditing) {
			setEditDraft(userData);
			setIsEditing(false);
		} else {
			let initialData;
			switch (userRole) {
				case "Administrator":
					initialData = administratorData;
					break;
				case "Employee":
					initialData = employeeData;
					break;
				case "Applicant":
					initialData = applicantData;
					break;
				default:
					initialData = {};
			}
			setUserData(initialData);
			setEditDraft(initialData);
		}
	};

	const handleRoleChange = (e) => {
		const newRole = e.target.value;
		setUserRole(newRole);
		setIsEditing(false);

		let newData;
		switch (newRole) {
			case "Administrator":
				newData = administratorData;
				break;
			case "Employee":
				newData = employeeData;
				break;
			case "Applicant":
				newData = applicantData;
				break;
			default:
				newData = {};
		}
		setUserData(newData);
		setEditDraft(newData);
	};

	return (
		<div className={styles["account-management-container"]}>
			<div className={styles["page-header"]}>
				<h1>Edit Account Information</h1>
				<div className={styles["role-selector"]}>
					<label htmlFor="role-select">Demo Mode - Switch Role: </label>
					<select
						id="role-select"
						value={userRole}
						onChange={handleRoleChange}
						className={styles["role-select"]}
					>
						<option value="Administrator">Administrator</option>
						<option value="Employee">Employee (Professor)</option>
						<option value="Applicant">Applicant</option>
					</select>
				</div>
			</div>

			{Object.keys(userData).length > 0 && (
				<>
					<ProfileCard
						userRole={userRole}
						userData={isEditing ? editDraft : userData}
						onUpdate={handleUpdate}
						isEditing={isEditing}
						onEditToggle={handleEditToggle}
					/>
					<PersonalInfoCard
						userData={isEditing ? editDraft : userData}
						onUpdate={handleUpdate}
						isEditing={isEditing}
					/>{" "}
					{userRole === "Applicant" && <AdmissionDetailsCard admissionData={userData} />}
					<div className={styles["action-buttons"]}>
						<button className={styles["cancel-btn"]} onClick={handleCancel}>
							Cancel
						</button>
						<button
							className={styles["save-btn"]}
							onClick={handleEditToggle}
							disabled={isSaving}
						>
							{isSaving ? "Saving..." : isEditing ? "Save Changes" : "Update"}
						</button>
					</div>
					{saveMessage && (
						<div className={styles["save-message"] + " " + styles["success"]}>
							{saveMessage}
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default EditAccount;
