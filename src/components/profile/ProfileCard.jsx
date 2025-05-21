import React from "react";
import "./ProfileCard.css";

// Profile Card Component - Reusable for Administrator, Employee, Applicant
export const ProfileCard = ({ userRole, userData, onUpdate, isEditing, onEditToggle }) => {
	const renderField = (value, id, onChange, placeholder, disabled = false) => {
		if (isEditing) {
			return (
				<input
					id={id}
					type="text"
					className="profile-card__input"
					value={value || ""}
					onChange={onChange}
					placeholder={placeholder}
					disabled={disabled}
				/>
			);
		}
		return <div className="profile-card__field">{value || ""}</div>;
	};

	return (
		<div className="profile-card__container">
			<div className="profile-card__header">
				{userRole === "Administrator" && <h2>Administrator's Profile</h2>}
				{userRole === "Employee" && <h2>Employee's Profile</h2>}
				{userRole === "Applicant" && <h2>Applicant's Profile</h2>}
			</div>
			<div className="profile-card__content">
				<div className="profile-card__picture">
					<div className="profile-card__avatar">
						<i className="profile-card__icon"></i>
					</div>
					<button className="profile-card__update-btn" onClick={onEditToggle}>
						{isEditing ? "Save" : "Update"}
					</button>
				</div>
				<div className="profile-card__details">
					<div className="profile-card__row">
						<div className="profile-card__column">
							<label htmlFor="name">Name:</label>
							{renderField(
								userData.name,
								"name",
								(e) => onUpdate({ ...userData, name: e.target.value }),
								"Full Name"
							)}
						</div>
						<div className="profile-card__column">
							<label htmlFor="employeeId">
								{userRole === "Applicant" ? "Application ID:" : "Employee ID:"}
							</label>
							{renderField(
								userData.employeeId,
								"employeeId",
								(e) => onUpdate({ ...userData, employeeId: e.target.value }),
								"ID",
								true
							)}
						</div>
					</div>
					<div className="profile-card__row">
						<div className="profile-card__column">
							<label htmlFor="department">Department:</label>
							{renderField(
								userData.department,
								"department",
								(e) => onUpdate({ ...userData, department: e.target.value }),
								"Department"
							)}
						</div>
						<div className="profile-card__column">
							<label htmlFor="position">
								{userRole === "Employee"
									? "Position / Designation:"
									: "Position / Role:"}
							</label>
							{renderField(
								userData.position,
								"position",
								(e) => onUpdate({ ...userData, position: e.target.value }),
								"Position"
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
