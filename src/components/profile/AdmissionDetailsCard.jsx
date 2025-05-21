import React from "react";
import "./AdmissionDetailsCard.css";

export const AdmissionDetailsCard = ({ admissionData }) => {
	const renderField = (value) => {
		return <div className="admission-info-card__field">{value || "Not specified"}</div>;
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
						{renderField(admissionData.admissionData?.firstChoice)}
						<label htmlFor="secondChoice" style={{ marginTop: 12 }}>
							Second Choice:
						</label>
						{renderField(admissionData.admissionData?.secondChoice)}
					</div>
					<div className="admission-info-card__column">
						<label htmlFor="typeOfApplicant">Type of Applicant:</label>
						{renderField(admissionData.admissionData?.typeOfApplicant)}
						<label htmlFor="statusOfAdmission" style={{ marginTop: 12 }}>
							Status of Admission:
						</label>
						{renderField(admissionData.admissionData?.statusOfAdmission)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdmissionDetailsCard;
