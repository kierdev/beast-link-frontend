import React from "react";
import "./PersonalInfoForm.css";

export const PersonalInfoForm = ({ userData, onUpdate, isEditing }) => {
	const handleChange = (field, value) => {
		onUpdate({
			...userData,
			[field]: value,
		});
	};

	const renderField = (value, fieldName = "", placeholder = "") => {
		if (isEditing) {
			return (
				<input
					type="text"
					value={value || ""}
					onChange={(e) => handleChange(fieldName, e.target.value)}
					placeholder={placeholder}
					className="form-field-input"
				/>
			);
		}
		return <div className="form-field-text">{value || "Not specified"}</div>;
	};

	const renderSelect = (value, fieldName, options) => {
		if (isEditing) {
			return (
				<select
					value={value || ""}
					onChange={(e) => handleChange(fieldName, e.target.value)}
					className="form-field-select"
				>
					<option value="">Select</option>
					{options.map((opt) => (
						<option key={opt} value={opt}>
							{opt}
						</option>
					))}
				</select>
			);
		}
		return <div className="form-field-text">{value || "Not specified"}</div>;
	};

	return (
		<div className="personal-info-form">
			<div className="form-header">
				<h2>Personal Information</h2>
			</div>

			<div className="form-content">
				<div className="name-section">
					<label>Name:</label>
					<div className="name-fields">
						<div className="form-group">
							<label htmlFor="surname">Surname:</label>
							{renderField(userData.surname, "surname", "Surname")}
						</div>
						<div className="form-group">
							<label htmlFor="firstName">Name:</label>
							{renderField(userData.firstName, "firstName", "First Name")}
						</div>
						<div className="form-group">
							<label htmlFor="middleName">Middle Name:</label>
							{renderField(userData.middleName, "middleName", "Middle Name")}
						</div>
						<div className="form-group">
							<label htmlFor="suffix">Name Suffix:</label>
							{renderField(userData.suffix, "suffix", "Jr., Sr., III, etc.")}
						</div>
					</div>
				</div>

				<div className="form-row">
					<div className="form-group">
						<label htmlFor="dateOfBirth">Date of Birth:</label>
						{isEditing ? (
							<input
								type="date"
								value={userData.dateOfBirth || ""}
								onChange={(e) => handleChange("dateOfBirth", e.target.value)}
								className="form-field-input"
							/>
						) : (
							<div className="form-field-text">
								{userData.dateOfBirth || "Not specified"}
							</div>
						)}
					</div>
					<div className="form-group">
						<label htmlFor="sex">Sex:</label>
						{renderSelect(userData.sex, "sex", ["Male", "Female"])}
					</div>
					<div className="form-group">
						<label htmlFor="civilStatus">Civil Status:</label>
						{renderSelect(userData.civilStatus, "civilStatus", [
							"Single",
							"Married",
							"Widowed",
							"Divorced",
						])}
					</div>
					<div className="form-group">
						<label htmlFor="contactNumber">Contact Number:</label>
						{renderField(userData.contactNumber, "contactNumber", "09XXXXXXXXX")}
					</div>
				</div>

				<div className="form-group">
					<label htmlFor="email">Email:</label>
					{renderField(userData.email, "email", "example@email.com")}
				</div>

				<div className="form-group">
					<label htmlFor="medicalConditions">
						Medical Conditions or Disability (Please Specify):
					</label>
					{renderField(
						userData.medicalConditions,
						"medicalConditions",
						"Enter any medical conditions or disabilities"
					)}
				</div>

				<div className="form-group">
					<label htmlFor="homeAddress">Home Address:</label>
					{isEditing ? (
						<textarea
							value={userData.homeAddress || ""}
							onChange={(e) => handleChange("homeAddress", e.target.value)}
							placeholder="Enter complete home address"
							rows={3}
							className="form-field-textarea"
						/>
					) : (
						<div className="form-field-text">
							{userData.homeAddress || "Not specified"}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
