export const validateForm = (formData) => {
	const errors = {};

	// Validate username
	if (!formData.username || formData.username.trim() === "") {
		errors.username = "Username is required.";
	} else if (formData.username.length < 3) {
		errors.username = "Username must be at least 3 characters long.";
	}

	// Validate email
	if (!formData.email || formData.email.trim() === "") {
		errors.email = "Email is required.";
	} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
		errors.email = "Invalid email format.";
	}

	// Validate password
	if (!formData.password || formData.password.trim() === "") {
		errors.password = "Password is required.";
	} else if (formData.password.length < 6) {
		errors.password = "Password must be at least 6 characters long.";
	}

	// Validate confirm password
	if (!formData.confirmPassword || formData.confirmPassword.trim() === "") {
		errors.confirmPassword = "Confirm Password is required.";
	} else if (formData.password !== formData.confirmPassword) {
		errors.confirmPassword = "Passwords do not match.";
	}

	return errors;
};
