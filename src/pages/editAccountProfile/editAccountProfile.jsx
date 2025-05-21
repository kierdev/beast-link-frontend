import React, { useState, useEffect } from "react";
// We'll use navigate when auth is implemented
// import { useNavigate } from "react-router-dom";
import { ProfilePictureCard } from "../../components/account/ProfilePictureCard";
import { PersonalInfoForm } from "../../components/account/PersonalInfoForm";
import { applicantData } from "../../utils/mockData.js";
import styles from "./editAccountProfile.module.css";

// TODO: Create these services for API calls
// import { uploadProfilePicture, updateStudentProfile, getStudentProfile } from "../../services/studentAPI";
// import { useAuth } from "../../context/AuthContext"; // For authentication context

const EditAccountProfile = () => {
	// const navigate = useNavigate();
	// const { user, isAuthenticated } = useAuth(); // TODO: Implement authentication context
	const [isLoading, setIsLoading] = useState(true);
	const [isEditing, setIsEditing] = useState(false);
	const [saveStatus, setSaveStatus] = useState({ type: "", message: "" });
	const [userData, setUserData] = useState({
		profilePicture: null,
		surname: "",
		firstName: "",
		middleName: "",
		suffix: "",
		dateOfBirth: "",
		sex: "",
		civilStatus: "",
		contactNumber: "",
		email: "",
		medicalConditions: "",
		homeAddress: "",
	});
	const [editDraft, setEditDraft] = useState({});
	useEffect(() => {
		// Check if user is authenticated and is a student
		// TODO: Implement authentication check
		// if (!isAuthenticated || user.role !== "student") {
		//     navigate("/login");
		//     return;
		// }

		fetchStudentData();
	}, []);

	const fetchStudentData = async () => {
		try {
			setIsLoading(true);
			// TODO: Implement API call
			// const response = await getStudentProfile(user.id);
			// setUserData(response.data);

			// Using mock data from mockData.js
			const [surname, firstName, middleName] = applicantData.name.split(" ");
			const initialData = {
				surname,
				firstName,
				middleName,
				suffix: "",
				dateOfBirth: applicantData.dateOfBirth,
				sex: applicantData.sex,
				civilStatus: applicantData.civilStatus,
				contactNumber: applicantData.contactNumber,
				email: applicantData.email,
				medicalConditions: applicantData.medicalConditions,
				homeAddress: applicantData.homeAddress,
			};
			setUserData(initialData);
			setEditDraft(initialData);
		} catch {
			setSaveStatus({
				type: "error",
				message: "Failed to fetch profile data",
			});
		} finally {
			setIsLoading(false);
		}
	};

	const handleImageUpload = async (file) => {
		try {
			// TODO: Implement API call
			// const formData = new FormData();
			// formData.append("profilePicture", file);
			// await uploadProfilePicture(user.id, formData);

			console.log("Uploading file:", file.name); // Temporary mock handling
			setSaveStatus({
				type: "success",
				message: "Profile picture updated successfully",
			});
		} catch {
			setSaveStatus({
				type: "error",
				message: "Failed to upload profile picture",
			});
		}
	};

	const handleUpdateProfile = async (updatedData) => {
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

	const handleSave = async () => {
		try {
			// TODO: Implement API call
			// await updateStudentProfile(user.id, editDraft);
			setUserData(editDraft);
			setIsEditing(false);
			setSaveStatus({
				type: "success",
				message: "Profile updated successfully",
			});
		} catch {
			setSaveStatus({
				type: "error",
				message: "Failed to update profile",
			});
		}
	};

	const handleCancel = () => {
		setEditDraft(userData);
		setIsEditing(false);
		setSaveStatus({ type: "", message: "" });
	};

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<div className={styles.container}>
			<h1 className={styles.pageTitle}>Edit Profile</h1>

			<ProfilePictureCard onImageUpload={handleImageUpload} isEditing={isEditing} />

			<PersonalInfoForm
				userData={isEditing ? editDraft : userData}
				onUpdate={handleUpdateProfile}
				isEditing={isEditing}
			/>

			<div className={styles.actionButtons}>
				<button className={styles.cancelBtn} onClick={handleCancel}>
					Cancel
				</button>
				<button className={styles.saveBtn} onClick={handleEditToggle}>
					{isEditing ? "Save Changes" : "Update"}
				</button>
			</div>

			{saveStatus.message && (
				<div className={`${styles.statusMessage} ${styles[saveStatus.type]}`}>
					{saveStatus.message}
				</div>
			)}
		</div>
	);
};

export default EditAccountProfile;

/*
API & Database Connection Guide:

1. Authentication & Authorization:
   - Implement JWT-based authentication
   - Create an AuthContext to manage user session
   - Store user role in JWT payload
   - Example structure in database:
     ```sql
     CREATE TABLE students (
         id VARCHAR(255) PRIMARY KEY,
         email VARCHAR(255) UNIQUE,
         password_hash VARCHAR(255),
         role VARCHAR(50) DEFAULT 'student',
         -- other fields...
     );
     ```

2. Profile Picture Upload:
   - Store images in cloud storage (e.g., AWS S3)
   - Store reference in database
   - Example structure:
     ```sql
     ALTER TABLE students
     ADD COLUMN profile_picture_url VARCHAR(255);
     ```

3. Student Profile API Endpoints:
   Base URL: /api/students

   GET /api/students/profile
   - Protected route (requires valid JWT)
   - Verify token includes student role
   - Returns student profile data

   PUT /api/students/profile
   - Protected route
   - Validates input data
   - Updates profile information

   POST /api/students/profile/picture
   - Protected route
   - Handles multipart/form-data
   - Uploads to cloud storage
   - Updates database with new URL

4. Security Considerations:
   - Implement rate limiting
   - Validate file types and sizes
   - Sanitize user input
   - Use HTTPS
   - Implement CORS properly

5. Example API Service:
   ```javascript
   // services/studentAPI.js
   import axios from 'axios';

   const api = axios.create({
     baseURL: '/api/students',
     headers: {
       'Content-Type': 'application/json'
     }
   });

   // Add auth interceptor
   api.interceptors.request.use(config => {
     const token = localStorage.getItem('token');
     if (token) {
       config.headers.Authorization = `Bearer ${token}`;
     }
     return config;
   });

   export const getStudentProfile = () => api.get('/profile');
   export const updateStudentProfile = (data) => api.put('/profile', data);
   export const uploadProfilePicture = (formData) => 
     api.post('/profile/picture', formData, {
       headers: { 'Content-Type': 'multipart/form-data' }
     });
   ```

6. Access Control:
   - Create a ProtectedRoute component:
   ```jsx
   const ProtectedStudentRoute = ({ children }) => {
     const { user, isAuthenticated } = useAuth();
     const navigate = useNavigate();

     useEffect(() => {
       if (!isAuthenticated || user.role !== 'student') {
         navigate('/login');
       }
     }, [isAuthenticated, user]);

     return isAuthenticated && user.role === 'student' ? children : null;
   };
   ```

   - Use in App.jsx:
   ```jsx
   <Route 
     path="/edit-profile" 
     element={
       <ProtectedStudentRoute>
         <EditProfileAccount />
       </ProtectedStudentRoute>
     } 
   />
   ```
*/
