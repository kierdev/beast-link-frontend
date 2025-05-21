import React from "react";
import "./AdmissionDetailsCard.css";

export const AdmissionDetailsCard = ({ admissionData, onUpdate, isEditing }) => {
	const renderField = (value, id, onChange, placeholder) => {
		if (isEditing) {
			return (
				<input
					id={id}
					type="text"
					className="admission-info-card__input"
					value={value || ""}
					onChange={onChange}
					placeholder={placeholder}
				/>
			);
		}
		return <div className="admission-info-card__field">{value || ""}</div>;
	};

	return (
		<div className="admission-info-card__container">
			<div className="admission-info-card__header">Admission Details</div>
			<div className="admission-info-card__content">
				<div className="admission-info-card__section-title">
					Course / Program Preference
				</div>
				<div className="admission-info-card__row">
					<div className="admission-info-card__column">
						<label htmlFor="firstChoice">First Choice:</label>
						{renderField(
							admissionData.firstChoice,
							"firstChoice",
							(e) => onUpdate({ ...admissionData, firstChoice: e.target.value }),
							"First Choice Program"
						)}
						<label htmlFor="secondChoice" style={{ marginTop: 12 }}>
							Second Choice:
						</label>
						{renderField(
							admissionData.secondChoice,
							"secondChoice",
							(e) => onUpdate({ ...admissionData, secondChoice: e.target.value }),
							"Second Choice Program"
						)}
					</div>
					<div className="admission-info-card__column">
						<label htmlFor="typeOfApplicant">Type of Applicant:</label>
						{renderField(
							admissionData.typeOfApplicant,
							"typeOfApplicant",
							(e) => onUpdate({ ...admissionData, typeOfApplicant: e.target.value }),
							"Type of Applicant"
						)}
						<label htmlFor="statusOfAdmission" style={{ marginTop: 12 }}>
							Status of Admission:
						</label>
						{renderField(
							admissionData.statusOfAdmission,
							"statusOfAdmission",
							(e) =>
								onUpdate({ ...admissionData, statusOfAdmission: e.target.value }),
							"Status of Admission"
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdmissionDetailsCard;
