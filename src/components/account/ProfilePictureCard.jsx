import React, { useRef, useState } from "react";
import "./ProfilePictureCard.css";

export const ProfilePictureCard = ({ onImageUpload }) => {
	const fileInputRef = useRef(null);
	const [previewUrl, setPreviewUrl] = useState(null);

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
			// Create preview URL
			const url = URL.createObjectURL(file);
			setPreviewUrl(url);
			onImageUpload(file);
		} else {
			alert("Please select a .jpg or .png file");
		}
	};

	const handleUpdateClick = () => {
		fileInputRef.current.click();
	};

	// Cleanup preview URL when component unmounts
	React.useEffect(() => {
		return () => {
			if (previewUrl) {
				URL.revokeObjectURL(previewUrl);
			}
		};
	}, [previewUrl]);

	return (
		<div className="profile-upload-card">
			<div className="profile-picture-section">
				<div className="profile-icon-container">
					{previewUrl ? (
						<img src={previewUrl} alt="Profile preview" className="profile-preview" />
					) : (
						<div className="profile-icon" />
					)}
				</div>
			</div>
			<div className="profile-info-section">
				<h2>Upload a New Profile Picture</h2>
				<p className="file-hint">Any .png or .jpg file</p>
			</div>
			<div className="profile-action-section">
				<input
					ref={fileInputRef}
					type="file"
					accept=".jpg,.jpeg,.png"
					onChange={handleFileChange}
					className="file-input"
				/>
				<button className="update-btn" onClick={handleUpdateClick}>
					Update
				</button>
			</div>
		</div>
	);
};
