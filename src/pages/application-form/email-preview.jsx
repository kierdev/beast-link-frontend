import React from 'react';
import styles from './application-form.module.css';

const EmailPreview = ({ formData, onClose }) => {
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
  };

  // Get full course name
  const getCourseFullName = (code) => {
    const courses = {
      'BSIT': 'Bachelor of Science in Information Technology',
      'BSCS': 'Bachelor of Science in Computer Science',
      'BSECE': 'Bachelor of Science in Electronics Engineering',
      'BSA': 'Bachelor of Science in Accountancy',
      'BSBA': 'Bachelor of Science in Business Administration'
    };
    return courses[code] || code || 'N/A';
  };

  return (
    <div className={styles.emailModalOverlay}>
      <div className={styles.emailModalContent}>
        <div className={styles.emailPreviewHeader}>
          <h2>Email Preview</h2>
          <p>This is how your application will appear in the email confirmation.</p>
          <div className={styles.emailPreviewActions}>
            <button className={styles.sendEmailBtn}>Send to my Email</button>
            <button className={styles.closePreviewBtn} onClick={onClose}>Close</button>
          </div>
        </div>
        
        <div className={styles.emailPreview}>
          <div className={styles.emailHeader}>
            <div className={styles.emailLogo}>
              <div className={styles.logoCircle}>
                <span>BLU</span>
              </div>
            </div>
            <h1>Application Form</h1>
            <div className={styles.emailProgressBar}>
              {[1, 2, 3, 4, 5, 6].map((step) => (
                <div key={step} className={styles.emailStep}>
                  <div className={styles.emailStepCircle}>✓</div>
                </div>
              ))}
            </div>
            <div className={styles.emailSubheader}>Application Receipt</div>
          </div>

          <div className={styles.emailContent}>
            <div className={styles.emailSection}>
              <h3>Name of Applicant</h3>
              <div className={styles.emailRow}>
                <span className={styles.emailLabel}>First Name:</span>
                <span className={styles.emailValue}>{formData.first_name || 'N/A'}</span>
              </div>
              <div className={styles.emailRow}>
                <span className={styles.emailLabel}>Middle Name:</span>
                <span className={styles.emailValue}>{formData.middle_name || 'N/A'}</span>
              </div>
              <div className={styles.emailRow}>
                <span className={styles.emailLabel}>Last Name:</span>
                <span className={styles.emailValue}>{formData.last_name || 'N/A'}</span>
              </div>
              <div className={styles.emailRow}>
                <span className={styles.emailLabel}>Extension:</span>
                <span className={styles.emailValue}>{formData.extension || 'N/A'}</span>
              </div>
            </div>

            <div className={styles.emailSection}>
              <h3>Facts of Birth</h3>
              <div className={styles.emailRow}>
                <span className={styles.emailLabel}>Date of Birth:</span>
                <span className={styles.emailValue}>{formatDate(formData.birthdate)}</span>
              </div>
              <div className={styles.emailRow}>
                <span className={styles.emailLabel}>Gender:</span>
                <span className={styles.emailValue}>{formData.gender || 'N/A'}</span>
              </div>
              <div className={styles.emailRow}>
                <span className={styles.emailLabel}>Citizenship:</span>
                <span className={styles.emailValue}>{formData.citizenship || 'N/A'}</span>
              </div>
              <div className={styles.emailRow}>
                <span className={styles.emailLabel}>Religion:</span>
                <span className={styles.emailValue}>{formData.religion || 'N/A'}</span>
              </div>
              <div className={styles.emailRow}>
                <span className={styles.emailLabel}>Place of Birth:</span>
                <span className={styles.emailValue}>{formData.place_of_birth || 'N/A'}</span>
              </div>
              <div className={styles.emailRow}>
                <span className={styles.emailLabel}>Civil Status:</span>
                <span className={styles.emailValue}>{formData.civil_status || 'N/A'}</span>
              </div>
            </div>

            <div className={styles.emailSection}>
              <h3>Contact Details</h3>
              <div className={styles.emailRow}>
                <span className={styles.emailLabel}>Address:</span>
                <span className={styles.emailValue}>
                  {formData.address ? `${formData.address}, ${formData.barangay}, ${formData.city}, ${formData.zip_code}` : 'N/A'}
                </span>
              </div>
              <div className={styles.emailRow}>
                <span className={styles.emailLabel}>Email:</span>
                <span className={styles.emailValue}>{formData.email || 'N/A'}</span>
              </div>
              <div className={styles.emailRow}>
                <span className={styles.emailLabel}>Contact Number:</span>
                <span className={styles.emailValue}>{formData.contact_number ? `+63 ${formData.contact_number}` : 'N/A'}</span>
              </div>
            </div>

            <div className={styles.emailSection}>
              <h3>Guardian Information</h3>
              <div className={styles.emailRow}>
                <span className={styles.emailLabel}>Name:</span>
                <span className={styles.emailValue}>{formData.guardian_fullname || 'N/A'}</span>
              </div>
              <div className={styles.emailRow}>
                <span className={styles.emailLabel}>Relationship:</span>
                <span className={styles.emailValue}>{formData.guardian_relationship || 'N/A'}</span>
              </div>
              <div className={styles.emailRow}>
                <span className={styles.emailLabel}>Email:</span>
                <span className={styles.emailValue}>{formData.guardian_email || 'N/A'}</span>
              </div>
              <div className={styles.emailRow}>
                <span className={styles.emailLabel}>Contact Number:</span>
                <span className={styles.emailValue}>{formData.guardian_contact ? `+63 ${formData.guardian_contact}` : 'N/A'}</span>
              </div>
            </div>

            <div className={styles.emailSection}>
              <h3>Educational Background</h3>
              <div className={styles.emailRow}>
                <span className={styles.emailLabel}>SHS Name:</span>
                <span className={styles.emailValue}>{formData.shs_name || 'N/A'}</span>
              </div>
              <div className={styles.emailRow}>
                <span className={styles.emailLabel}>SHS Address:</span>
                <span className={styles.emailValue}>{formData.shs_address || 'N/A'}</span>
              </div>
              <div className={styles.emailRow}>
                <span className={styles.emailLabel}>SHS Strand:</span>
                <span className={styles.emailValue}>{formData.shs_strand || 'N/A'}</span>
              </div>
              <div className={styles.emailRow}>
                <span className={styles.emailLabel}>Grade 12 GWA:</span>
                <span className={styles.emailValue}>{formData.grade_12_gwa || 'N/A'}</span>
              </div>
              <div className={styles.emailRow}>
                <span className={styles.emailLabel}>Grade 11 GWA:</span>
                <span className={styles.emailValue}>{formData.grade_11_gwa || 'N/A'}</span>
              </div>
            </div>

            <div className={styles.emailSection}>
              <h3>Intended Course</h3>
              <div className={styles.emailRow}>
                <span className={styles.emailLabel}>First Choice:</span>
                <span className={styles.emailValue}>{getCourseFullName(formData.first_choice)}</span>
              </div>
              <div className={styles.emailRow}>
                <span className={styles.emailLabel}>Second Choice:</span>
                <span className={styles.emailValue}>{getCourseFullName(formData.second_choice)}</span>
              </div>
            </div>
          </div>

          <div className={styles.emailFooter}>
            <p>Thank you for applying to Beast Link University.</p>
            <p>Your application has been received and is being processed.</p>
            <p>Application Reference: APP-{Math.floor(100000 + Math.random() * 900000)}</p>
            <p>For inquiries, please contact our admissions office.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailPreview;