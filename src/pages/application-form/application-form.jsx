import React, { useState } from 'react';
import styles from './application-form.module.css';

// Form field component for reusability
const FormField = ({ label, name, type = 'text', value, onChange, invalid, errorMsg, options }) => {
  if (type === 'select') {
    return (
      <div className={styles.formGroup}>
        <div className={styles.formLabel}>{label}</div>
        <select 
          name={name}
          value={value}
          onChange={onChange}
          className={invalid ? styles.invalid : ''}
        >
          <option value="">Select</option>
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        {invalid && <div className={styles.errorMessage}>{errorMsg}</div>}
      </div>
    );
  }

  if (type === 'phone') {
    return (
      <div className={styles.formGroup}>
        <div className={styles.formLabel}>{label}</div>
        <div className={styles.phoneInput}>
          <div className={styles.phonePrefix}>+63</div>
          <input 
            type="text" 
            name={name}
            value={value}
            onChange={onChange}
            className={invalid ? styles.invalid : ''}
          />
        </div>
        {invalid && <div className={styles.errorMessage}>{errorMsg}</div>}
      </div>
    );
  }

  return (
    <div className={styles.formGroup}>
      <div className={styles.formLabel}>{label}</div>
      <input 
        type={type} 
        name={name}
        value={value}
        onChange={onChange}
        className={invalid ? styles.invalid : ''}
      />
      {invalid && <div className={styles.errorMessage}>{errorMsg}</div>}
    </div>
  );
};

// Preview Field component
const PreviewField = ({ label, value }) => (
  <div className={styles.previewRow}>
    <div className={styles.previewLabel}>{label}:</div>
    <div className={styles.previewValue}>{value || 'N/A'}</div>
  </div>
);

// Preview Section component
const PreviewSection = ({ title, children }) => (
  <div className={styles.previewSection}>
    <div className={styles.previewTitle}>{title}</div>
    <div className={styles.previewContent}>{children}</div>
  </div>
);

const ApplicationForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    extension: '',
    birthdate: '',
    gender: '',
    citizenship: '',
    religion: '',
    place_of_birth: '',
    civil_status: '',
    address: '',
    barangay: '',
    city: '',
    district: '',
    zip_code: '',
    email: '',
    contact_number: '',
    guardian_fullname: '',
    guardian_relationship: '',
    guardian_email: '',
    guardian_contact: '',
    shs_name: '',
    shs_address: '',
    shs_strand: '',
    grade_12_gwa: '',
    grade_11_gwa: '',
    first_choice: '',
    second_choice: ''
  });
  
  const [invalidFields, setInvalidFields] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear validation error when user starts typing
    if (invalidFields[name]) {
      setInvalidFields({ ...invalidFields, [name]: false });
    }
  };

  // Validation rules
  const validationRules = {
    nameOnly: /^[A-Za-z ]{2,}$/,
    optionalName: /^[A-Za-z ]*$/,
    nameExt: /^[A-Za-z.]{0,10}$/,
    zipCode: /^[0-9]{4,5}$/,
    phone: /^[0-9]{10}$/,
    email: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    gwa: /^([1-9](\.[0-9]{1,2})?|10(\.0{1,2})?)$/,
    placeBirth: /^[A-Za-z0-9,. ]{2,}$/,
    barangay: /^[A-Za-z0-9. ]{2,}$/,
    district: /^[A-Za-z0-9 ]*$/
  };

  // Validate a specific field
  const validateField = (name, value) => {
    // Skip empty non-required fields
    if (!value && !isFieldRequired(name)) return true;

    switch (name) {
      case 'first_name':
      case 'last_name':
      case 'guardian_fullname':
      case 'guardian_relationship':
      case 'citizenship':
      case 'religion':
      case 'city':
        return validationRules.nameOnly.test(value);
      
      case 'middle_name':
        return validationRules.optionalName.test(value);
      
      case 'extension':
        return validationRules.nameExt.test(value);
      
      case 'zip_code':
        return validationRules.zipCode.test(value);
      
      case 'contact_number':
      case 'guardian_contact':
        return validationRules.phone.test(value);
      
      case 'email':
      case 'guardian_email':
        return validationRules.email.test(value);
      
      case 'grade_12_gwa':
      case 'grade_11_gwa':
        return validationRules.gwa.test(value);
      
      case 'place_of_birth':
        return validationRules.placeBirth.test(value);
      
      case 'barangay':
        return validationRules.barangay.test(value);
      
      case 'district':
        return validationRules.district.test(value);
      
      default:
        return !!value; // Simply check if there's a value for other fields
    }
  };

  // Check if a field is required
  const isFieldRequired = (name) => {
    const nonRequiredFields = ['middle_name', 'extension', 'district'];
    return !nonRequiredFields.includes(name);
  };

  // Fields for each step
  const stepFields = {
    1: ['first_name', 'middle_name', 'last_name', 'extension'],
    2: ['birthdate', 'gender', 'citizenship', 'religion', 'place_of_birth', 'civil_status'],
    3: ['address', 'barangay', 'city', 'district', 'zip_code', 'email', 'contact_number',
        'guardian_fullname', 'guardian_relationship', 'guardian_email', 'guardian_contact'],
    4: ['shs_name', 'shs_address', 'shs_strand', 'grade_12_gwa', 'grade_11_gwa'],
    5: ['first_choice', 'second_choice']
  };

  // Validate the current step
  const validateStep = (step) => {
    const fieldsToValidate = stepFields[step] || [];
    let newInvalidFields = {};
    let isValid = true;

    fieldsToValidate.forEach(field => {
      if (isFieldRequired(field) || formData[field]) {
        const fieldIsValid = validateField(field, formData[field]);
        if (!fieldIsValid) {
          newInvalidFields[field] = true;
          isValid = false;
        }
      }
    });

    // Special case for course choices
    if (step === 5 && formData.first_choice && formData.second_choice && 
        formData.first_choice === formData.second_choice) {
      newInvalidFields.second_choice = true;
      isValid = false;
      alert('First and second course choices must be different.');
    }

    setInvalidFields(newInvalidFields);
    return isValid;
  };

  // Navigation handlers
  const handleNext = () => {
    if (validateStep(currentStep) && currentStep < 6) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      setShowSuccessModal(true);
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
  };

  // Course options
  const courseOptions = [
    { value: 'BSIT', label: 'Bachelor of Science in Information Technology' },
    { value: 'BSCS', label: 'Bachelor of Science in Computer Science' },
    { value: 'BSECE', label: 'Bachelor of Science in Electronics Engineering' },
    { value: 'BSA', label: 'Bachelor of Science in Accountancy' },
    { value: 'BSBA', label: 'Bachelor of Science in Business Administration' }
  ];

  // Gender options
  const genderOptions = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Other', label: 'Other' }
  ];

  // Civil status options
  const civilStatusOptions = [
    { value: 'Single', label: 'Single' },
    { value: 'Married', label: 'Married' },
    { value: 'Divorced', label: 'Divorced' },
    { value: 'Widowed', label: 'Widowed' }
  ];

  // Get full course name
  const getCourseFullName = (code) => {
    const course = courseOptions.find(c => c.value === code);
    return course ? course.label : code;
  };

  return (
    <div className={styles.body}>
      {/* Sidebar */}
       {/* section ng logo dito pre papalitan nalang wala pa kasi ako nung mismong image nung logo tyty*/}
      <div className={styles.sidebar}>
        <div className={styles.logoContainer}>
          <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="50" height="50" fill="white"/>
            <text x="25" y="30" textAnchor="middle" fontSize="20" fill="#064e40">BLU</text>
          </svg>
        </div>
        <div className={styles.universityName}>Beast Link University</div>
      </div>
      
      {/* Main Content */}
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <h1>Application Form</h1>
          
          {/* Progress Indicator */}
          <div className={styles.progressIndicator}>
            {[1, 2, 3, 4, 5, 6].map((step) => (
              <React.Fragment key={step}>
                {step > 1 && <div className={styles.stepLine}></div>}
                <div className={styles.stepItem}>
                  <div className={`${styles.stepCircle} 
                                  ${currentStep === step ? styles.active : ''} 
                                  ${currentStep > step ? styles.completed : ''}`}>
                    {currentStep > step ? '✓' : step}
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className={styles.formContainer}>
          <form id="multi-step-form" onSubmit={handleSubmit}>
            {/* Step 1: Name of Applicant */}
            <div className={styles.formStep} style={{ display: currentStep === 1 ? 'block' : 'none' }}>
              <h2>Name of Applicant</h2>
              <div className={styles.formGrid}>
                <FormField 
                  label="First Name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleInputChange}
                  invalid={invalidFields.first_name}
                  errorMsg="*This field is required and must contain only letters"
                />
                <FormField 
                  label="Middle Name"
                  name="middle_name"
                  value={formData.middle_name}
                  onChange={handleInputChange}
                  invalid={invalidFields.middle_name}
                  errorMsg="*Must contain only letters"
                />
                <FormField 
                  label="Last Name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleInputChange}
                  invalid={invalidFields.last_name}
                  errorMsg="*This field is required and must contain only letters"
                />
                <FormField 
                  label="Name Extension"
                  name="extension"
                  value={formData.extension}
                  onChange={handleInputChange}
                  invalid={invalidFields.extension}
                  errorMsg="*Must contain only letters"
                />
              </div>
              <div className={styles.buttonGroup}>
                <button type="button" className={styles.nextBtn} onClick={handleNext}>Next</button>
              </div>
            </div>

            {/* Step 2: Facts of Birth */}
            <div className={styles.formStep} style={{ display: currentStep === 2 ? 'block' : 'none' }}>
              <h2>Facts of Birth</h2>
              <div className={styles.formGrid}>
                <FormField 
                  label="Date of Birth"
                  name="birthdate"
                  type="date"
                  value={formData.birthdate}
                  onChange={handleInputChange}
                  invalid={invalidFields.birthdate}
                  errorMsg="*This field is required"
                />
                <FormField 
                  label="Gender"
                  name="gender"
                  type="select"
                  value={formData.gender}
                  onChange={handleInputChange}
                  invalid={invalidFields.gender}
                  errorMsg="*This field is required"
                  options={genderOptions}
                />
                <FormField 
                  label="Citizenship"
                  name="citizenship"
                  value={formData.citizenship}
                  onChange={handleInputChange}
                  invalid={invalidFields.citizenship}
                  errorMsg="*This field is required and must contain only letters"
                />
                <FormField 
                  label="Religion"
                  name="religion"
                  value={formData.religion}
                  onChange={handleInputChange}
                  invalid={invalidFields.religion}
                  errorMsg="*This field is required and must contain only letters"
                />
              </div>
              <div className={styles.formGrid}>
                <FormField 
                  label="Place of Birth"
                  name="place_of_birth"
                  value={formData.place_of_birth}
                  onChange={handleInputChange}
                  invalid={invalidFields.place_of_birth}
                  errorMsg="*This field is required"
                />
                <FormField 
                  label="Civil Status"
                  name="civil_status"
                  type="select"
                  value={formData.civil_status}
                  onChange={handleInputChange}
                  invalid={invalidFields.civil_status}
                  errorMsg="*This field is required"
                  options={civilStatusOptions}
                />
              </div>
              <div className={styles.buttonGroup}>
                <button type="button" className={styles.prevBtn} onClick={handlePrev}>Back</button>
                <button type="button" className={styles.nextBtn} onClick={handleNext}>Next</button>
              </div>
            </div>

            {/* Step 3: Contact Details */}
            <div className={styles.formStep} style={{ display: currentStep === 3 ? 'block' : 'none' }}>
              <h2>Contact Details</h2>
              <div className={styles.formGrid}>
                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <div className={styles.formLabel}>Address</div>
                  <input 
                    type="text" 
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={invalidFields.address ? styles.invalid : ''}
                  />
                  {invalidFields.address && 
                    <div className={styles.errorMessage}>*This field is required</div>
                  }
                </div>
                <FormField 
                  label="Barangay"
                  name="barangay"
                  value={formData.barangay}
                  onChange={handleInputChange}
                  invalid={invalidFields.barangay}
                  errorMsg="*This field is required"
                />
                <FormField 
                  label="City / Municipality"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  invalid={invalidFields.city}
                  errorMsg="*This field is required and must contain only letters"
                />
                <FormField 
                  label="District"
                  name="district"
                  value={formData.district}
                  onChange={handleInputChange}
                  invalid={invalidFields.district}
                  errorMsg="*Must contain only letters and numbers"
                />
                <FormField 
                  label="Zip Code"
                  name="zip_code"
                  value={formData.zip_code}
                  onChange={handleInputChange}
                  invalid={invalidFields.zip_code}
                  errorMsg="*This field is required and must contain 4-5 digits"
                />
              </div>
              
              <div className={styles.formGrid}>
                <FormField 
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  invalid={invalidFields.email}
                  errorMsg="*This field is required and must be a valid email"
                />
                <FormField 
                  label="Contact Number"
                  name="contact_number"
                  type="phone"
                  value={formData.contact_number}
                  onChange={handleInputChange}
                  invalid={invalidFields.contact_number}
                  errorMsg="*This field is required and must contain 10 digits"
                />
              </div>
              
              <div className={styles.formGrid}>
                <FormField 
                  label="Guardian's Fullname"
                  name="guardian_fullname"
                  value={formData.guardian_fullname}
                  onChange={handleInputChange}
                  invalid={invalidFields.guardian_fullname}
                  errorMsg="*This field is required and must contain only letters"
                />
                <FormField 
                  label="Relationship of Applicant with Guardian"
                  name="guardian_relationship"
                  value={formData.guardian_relationship}
                  onChange={handleInputChange}
                  invalid={invalidFields.guardian_relationship}
                  errorMsg="*This field is required and must contain only letters"
                />
              </div>
              <div className={styles.formGrid}>
                <FormField 
                  label="Guardian's Email Address"
                  name="guardian_email"
                  type="email"
                  value={formData.guardian_email}
                  onChange={handleInputChange}
                  invalid={invalidFields.guardian_email}
                  errorMsg="*This field is required and must be a valid email"
                />
                <FormField 
                  label="Guardian's Contact Number"
                  name="guardian_contact"
                  type="phone"
                  value={formData.guardian_contact}
                  onChange={handleInputChange}
                  invalid={invalidFields.guardian_contact}
                  errorMsg="*This field is required and must contain 10 digits"
                />
              </div>
              
              <div className={styles.buttonGroup}>
                <button type="button" className={styles.prevBtn} onClick={handlePrev}>Back</button>
                <button type="button" className={styles.nextBtn} onClick={handleNext}>Next</button>
              </div>
            </div>

            {/* Step 4: Educational Background */}
            <div className={styles.formStep} style={{ display: currentStep === 4 ? 'block' : 'none' }}>
              <h2>Educational Background</h2>
              <div className={styles.formGrid}>
                <FormField 
                  label="Senior Highschool Name"
                  name="shs_name"
                  value={formData.shs_name}
                  onChange={handleInputChange}
                  invalid={invalidFields.shs_name}
                  errorMsg="*This field is required"
                />
                <FormField 
                  label="Senior Highschool Address"
                  name="shs_address"
                  value={formData.shs_address}
                  onChange={handleInputChange}
                  invalid={invalidFields.shs_address}
                  errorMsg="*This field is required"
                />
              </div>
              <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                <div className={styles.formLabel}>Senior Highschool Strand</div>
                <input 
                  type="text" 
                  name="shs_strand"
                  value={formData.shs_strand}
                  onChange={handleInputChange}
                  className={invalidFields.shs_strand ? styles.invalid : ''}
                />
                {invalidFields.shs_strand && 
                  <div className={styles.errorMessage}>*This field is required</div>
                }
              </div>
              
              <div className={styles.formGrid}>
                <FormField 
                  label="Grade 12 GWA"
                  name="grade_12_gwa"
                  value={formData.grade_12_gwa}
                  onChange={handleInputChange}
                  invalid={invalidFields.grade_12_gwa}
                  errorMsg="*This field is required and must be a valid GWA (e.g., 1.25)"
                />
                <FormField 
                  label="Grade 11 GWA"
                  name="grade_11_gwa"
                  value={formData.grade_11_gwa}
                  onChange={handleInputChange}
                  invalid={invalidFields.grade_11_gwa}
                  errorMsg="*This field is required and must be a valid GWA (e.g., 1.25)"
                />
              </div>
              
              <div className={styles.buttonGroup}>
                <button type="button" className={styles.prevBtn} onClick={handlePrev}>Back</button>
                <button type="button" className={styles.nextBtn} onClick={handleNext}>Next</button>
              </div>
            </div>

            {/* Step 5: Intended Course */}
            <div className={styles.formStep} style={{ display: currentStep === 5 ? 'block' : 'none' }}>
              <h2>Intended Course</h2>
              <div className={styles.formGrid}>
                <FormField 
                  label="First Choice"
                  name="first_choice"
                  type="select"
                  value={formData.first_choice}
                  onChange={handleInputChange}
                  invalid={invalidFields.first_choice}
                  errorMsg="*This field is required"
                  options={courseOptions}
                />
                <FormField 
                  label="Second Choice"
                  name="second_choice"
                  type="select"
                  value={formData.second_choice}
                  onChange={handleInputChange}
                  invalid={invalidFields.second_choice}
                  errorMsg="*This field is required"
                  options={courseOptions}
                />
              </div>
              
              <div className={styles.buttonGroup}>
                <button type="button" className={styles.prevBtn} onClick={handlePrev}>Back</button>
                <button type="button" className={styles.nextBtn} onClick={handleNext}>Next</button>
              </div>
            </div>

            {/* Step 6: Preview */}
            <div className={styles.formStep} style={{ display: currentStep === 6 ? 'block' : 'none' }}>
              <h2>Preview</h2>
              
              <PreviewSection title="Name of Applicant">
                <PreviewField label="First Name" value={formData.first_name} />
                <PreviewField label="Middle Name" value={formData.middle_name} />
                <PreviewField label="Last Name" value={formData.last_name} />
                <PreviewField label="Extension" value={formData.extension} />
              </PreviewSection>

              <PreviewSection title="Facts of Birth">
                <PreviewField label="Date of Birth" value={formatDate(formData.birthdate)} />
                <PreviewField label="Gender" value={formData.gender} />
                <PreviewField label="Citizenship" value={formData.citizenship} />
                <PreviewField label="Religion" value={formData.religion} />
                <PreviewField label="Place of Birth" value={formData.place_of_birth} />
                <PreviewField label="Civil Status" value={formData.civil_status} />
              </PreviewSection>

              <PreviewSection title="Contact Details">
                <PreviewField 
                  label="Address" 
                  value={`${formData.address}, ${formData.barangay}, ${formData.city}, ${formData.zip_code}`} 
                />
                <PreviewField label="Email" value={formData.email} />
                <PreviewField label="Contact Number" value={formData.contact_number ? `+63 ${formData.contact_number}` : ''} />
              </PreviewSection>

              <PreviewSection title="Guardian Information">
                <PreviewField label="Name" value={formData.guardian_fullname} />
                <PreviewField label="Relationship" value={formData.guardian_relationship} />
                <PreviewField label="Email" value={formData.guardian_email} />
                <PreviewField 
                  label="Contact Number" 
                  value={formData.guardian_contact ? `+63 ${formData.guardian_contact}` : ''} 
                />
              </PreviewSection>

              <PreviewSection title="Educational Background">
                <PreviewField label="SHS Name" value={formData.shs_name} />
                <PreviewField label="SHS Address" value={formData.shs_address} />
                <PreviewField label="SHS Strand" value={formData.shs_strand} />
                <PreviewField label="Grade 12 GWA" value={formData.grade_12_gwa} />
                <PreviewField label="Grade 11 GWA" value={formData.grade_11_gwa} />
              </PreviewSection>

              <PreviewSection title="Intended Course">
                <PreviewField label="First Choice" value={getCourseFullName(formData.first_choice)} />
                <PreviewField label="Second Choice" value={getCourseFullName(formData.second_choice)} />
              </PreviewSection>
              
              <div className={styles.buttonGroup}>
                <button type="button" className={styles.prevBtn} onClick={handlePrev}>Back</button>
                <button type="submit" className={styles.submitBtn}>Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      
      {/* Success Modal */}
      {showSuccessModal && (
        <div className={styles.modalOverlay} style={{ display: 'flex' }}>
          <div className={styles.modalContent}>
            <div className={styles.modalTitle}>Submitted</div>
            <div className={styles.modalMessage}>
              An email of your form has been sent to your email address
            </div>
            <button 
              className={styles.confirmBtn}
              onClick={() => setShowSuccessModal(false)}
            >
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationForm;