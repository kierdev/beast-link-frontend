import React from "react";
import "./PersonalInfoCard.css";

// Personal Information Card Component - Reusable for all roles
export const PersonalInfoCard = ({ userData, onUpdate, isEditing }) => {
	const renderField = (value, id, onChange, placeholder) => {
		if (isEditing) {
			return (
				<input
					id={id}
					type="text"
					className="personal-info-card__input"
					value={value || ""}
					onChange={onChange}
					placeholder={placeholder}
				/>
			);
		}
		return <div className="personal-info-card__field">{value || ""}</div>;
	};

	return (
		<div className="personal-info-card__container">
			<div className="personal-info-card__header">
				<h2>Personal Information</h2>
			</div>
			<div className="personal-info-card__content">
				<div className="personal-info-card__row">
					<div className="personal-info-card__column">
						<label htmlFor="dob">Date of Birth:</label>
						{renderField(
							userData.dateOfBirth,
							"dob",
							(e) => onUpdate({ ...userData, dateOfBirth: e.target.value }),
							"YYYY/MM/DD"
						)}
					</div>
					<div className="personal-info-card__column">
						<label htmlFor="sex">Sex:</label>
						{renderField(
							userData.sex,
							"sex",
							(e) => onUpdate({ ...userData, sex: e.target.value }),
							"Sex"
						)}
					</div>
					<div className="personal-info-card__column">
						<label htmlFor="civilStatus">Civil Status:</label>
						{renderField(
							userData.civilStatus,
							"civilStatus",
							(e) => onUpdate({ ...userData, civilStatus: e.target.value }),
							"Civil Status"
						)}
					</div>
					<div className="personal-info-card__column">
						<label htmlFor="contactNumber">Contact Number:</label>
						{renderField(
							userData.contactNumber,
							"contactNumber",
							(e) => onUpdate({ ...userData, contactNumber: e.target.value }),
							"Contact Number"
						)}
					</div>
				</div>
				<div className="personal-info-card__row">
					<div className="personal-info-card__column">
						<label htmlFor="email">Email:</label>
						{renderField(
							userData.email,
							"email",
							(e) => onUpdate({ ...userData, email: e.target.value }),
							"Email Address"
						)}
					</div>
					<div className="personal-info-card__column personal-info-card__column--wide">
						<label htmlFor="medicalConditions">
							Medical Conditions or Disability (Please Specify):
						</label>
						{renderField(
							userData.medicalConditions,
							"medicalConditions",
							(e) => onUpdate({ ...userData, medicalConditions: e.target.value }),
							"Medical Conditions"
						)}
					</div>
				</div>
				<div className="personal-info-card__row">
					<div className="personal-info-card__column personal-info-card__column--full">
						<label htmlFor="homeAddress">Home Address:</label>
						{renderField(
							userData.homeAddress,
							"homeAddress",
							(e) => onUpdate({ ...userData, homeAddress: e.target.value }),
							"Complete Home Address"
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
