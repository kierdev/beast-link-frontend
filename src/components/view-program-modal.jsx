import React, { useState, useContext } from "react";
import DocumentList from "./add-document-list";
import { GlobalDataContext } from "./global-data-context";

export default function ViewProgramModal({ programData, onClose }) {
  const { fetchData, fetchPrograms } = useContext(GlobalDataContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...programData });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    const response = await fetch(`/api/programs/${formData.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });

    if (response.ok) {
        await fetchPrograms();
        setIsEditing(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h3>View Program</h3>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>
        <form className="program-form">
          <div className="modal-content">
            <div className="modal-left">
              <div className="form-group">
                <label htmlFor="programName">Program Name</label>
                <input
                  type="text"
                  id="programName"
                  name="program_name"
                  value={formData.program_name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>

              <div className="form-group">
                <label htmlFor="programCode">Program Code</label>
                <input
                  type="text"
                  id="programCode"
                  name="program_code"
                  value={formData.program_code}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>

              <div className="form-group">
                <label htmlFor="programDetails">Program Details</label>
                <textarea
                  id="programDetails"
                  name="program_details"
                  rows="4"
                  value={formData.program_details}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="programCollege">Program College</label>
                <select
                  id="programCollege"
                  name="program_college"
                  value={formData.program_college}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                >
                  <option value="">Select College</option>
                  <option value="COT">College of Technology</option>
                  <option value="COED">College of Education</option>
                  <option value="CBA">College of Business Administration</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="workflow">Workflow</label>
                <select
                  id="workflow"
                  name="workflow"
                  value={formData.workflow}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                >
                  <option value="">Select Workflow</option>
                  <option value="Interview to Test">Interview to Test</option>
                  <option value="Test to Interview">Test to Interview</option>
                  <option value="Interview Only">Interview Only</option>
                  <option value="Test Only">Test Only</option>
                </select>
              </div>

              {formData.workflow === "Test Only" ||
              formData.workflow === "Test to Interview" ||
              formData.workflow === "Interview to Test" ? (
                <div className="test-requirements">
                  <h2>Test Requirements</h2>
                  <div className="form-group">
                    <label htmlFor="max_score">Maximum Score</label>
                    <input
                      type="number"
                      id="max_score"
                      name="max_score"
                      value={formData.max_score}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="passing_score">Passing Score</label>
                    <input
                      type="number"
                      id="passing_score"
                      name="passing_score"
                      value={formData.passing_score}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              ) : null}
            </div>
            <div className="modal-right">
              {formData.workflow === "Interview Only" ||
              formData.workflow === "Test to Interview" ||
              formData.workflow === "Interview to Test" ? (
                <div className="interview-requirements">
                  <h2>Interview Requirements</h2>
                  <div className="form-group">
                    <label htmlFor="no_interviewer">Number of Interviewer</label>
                    <input
                      type="number"
                      id="no_interviewer"
                      name="no_interviewer"
                      value={formData.no_interviewer}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="passing_rate">Passing Rate</label>
                    <input
                      type="number"
                      id="passing_rate"
                      name="passing_rate"
                      value={formData.passing_rate}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="interview_description">Interview Description</label>
                    <textarea
                      id="interview_description"
                      name="interview_description"
                      rows="4"
                      value={formData.interview_description}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    ></textarea>
                  </div>
                </div>
              ) : null}

              <div className="document-requirements">
                <h2>Document Requirements</h2>
                <DocumentList
                  onDocumentTypeChange={(selectedDocuments) =>
                    setFormData({
                      ...formData,
                      document_type: selectedDocuments,
                    })
                  }
                  selectedDocuments={formData.document_type}
                  isDisabled={!isEditing}
                />
              </div>
            </div>
          </div>
          <div className="form-actions">
            {isEditing ? (
              <button
                type="button"
                className="save-program-button"
                onClick={handleSaveClick}
              >
                Save
              </button>
            ) : (
              <button
                type="button"
                className="edit-program-button"
                onClick={handleEditClick}
              >
                Edit
              </button>
            )}
            <button type="button" className="cancel-button" onClick={onClose}>
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}