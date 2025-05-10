import { Plus } from "lucide-react";
import { useState, useContext } from "react";
import { GlobalDataContext } from "./global-data-context";
import DocumentList from "./add-document-list";

export default function AddProgramModal({ onClose }) {
  const { fetchPrograms } = useContext(GlobalDataContext);
  const [workflow, setWorkflow] = useState("");
  const [formData, setFormData] = useState({
    program_name: "",
    program_code: "",
    program_details: "",
    program_college: "",
    workflow: "",
    max_score: 100,
    passing_score: 0,
    no_interviewer: 0,
    passing_rate: 0,
    interview_description: "",
    document_type: [],
    program_active: true,
  });

  const [errors, setErrors] = useState({});

  // Render error messages for all fields
  const renderError = (field) => {
    return errors[field] ? <p className="error">{errors[field][0]}</p> : null;
  };

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("Form data:", formData);
    const response = await fetch("/api/programs", {
      method: "POST",
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    console.log(data);
    if (data.errors) {
      setErrors(data.errors);
    } else {
      await fetchPrograms();
      onClose();
    }
  };

  function handleWorkflowChange(e) {
    setWorkflow(e.target.value);
  };

  const handleDocumentTypeChange = (selectedDocuments) => {
    setFormData({
      ...formData,
      document_type: selectedDocuments,
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h3>Add New Program</h3>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit} className="program-form">
          <div className="modal-content">
            <div className="modal-left">
              <div className="form-group">
                <label htmlFor="programName">Program Name</label>
                <input
                  type="text"
                  id="programName"
                  name="programName"
                  placeholder="Enter program name..."
                  onChange={(e) => {
                    setFormData({ ...formData, program_name: e.target.value });
                  }}
                />
                {renderError("program_name")}
              </div>

              <div className="form-group">
                <label htmlFor="programCode">Program Code</label>
                <input
                  type="text"
                  id="programCode"
                  name="programCode"
                  placeholder="Enter program code..."
                  onChange={(e) => {
                    setFormData({ ...formData, program_code: e.target.value });
                  }}
                />
                {renderError("program_code")}
              </div>

              <div className="form-group">
                <label htmlFor="programDetails">Program Details</label>
                <textarea
                  id="programDetails"
                  name="programDetails"
                  rows="4"
                  placeholder="Enter program details..."
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      program_details: e.target.value,
                    });
                  }}
                ></textarea>
                {renderError("program_details")}
              </div>

              <div className="form-group">
                <label htmlFor="programCollege">Program College</label>
                <select
                  id="academicYear"
                  name="programCollege"
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      program_college: e.target.value,
                    });
                  }}
                >
                  <option value="">Select College</option>
                  <option value="COT">College of Technology</option>
                  <option value="COED">College of Education</option>
                  <option value="CBA">
                    College of Business Administration
                  </option>
                </select>
                {renderError("program_college")}
              </div>

              <div className="form-group">
                <label htmlFor="workflow">Workflow</label>
                <select
                  id="workflow"
                  name="workflow"
                  onChange={(e) => {
                    setFormData({ ...formData, workflow: e.target.value });
                  }}
                  onClick={handleWorkflowChange}
                >
                  <option value="">Select Workflow</option>
                  <option value="Interview to Test">Interview to Test</option>
                  <option value="Test to Interview">Test to Interview</option>
                  <option value="Interview Only">Interview Only</option>
                  <option value="Test Only">Test Only</option>
                </select>
                {renderError("workflow")}
              </div>

              <div
                className="test-requirements"
                style={{
                  display:
                    workflow === "Test Only" ||
                    workflow === "Test to Interview" ||
                    workflow === "Interview to Test"
                      ? "block"
                      : "none",
                }}
              >
                <h2>Test Requirements</h2>
                <div className="form-group">
                  <label htmlFor="max_score">Maximum Score</label>
                  <input
                    type="number"
                    id="max_score"
                    name="max_score"
                    placeholder="Enter maximum score..."
                    value={formData.max_score}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        max_score: e.target.value,
                      });
                    }}
                  />
                  {renderError("max_score")}
                </div>

                <div className="form-group">
                  <label htmlFor="passing_score">Passing Score</label>
                  <input
                    type="number"
                    id="passing_score"
                    name="passing_score"
                    placeholder="Enter passing score..."
                    value={formData.passing_score}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        passing_score: e.target.value,
                      });
                    }}
                  />
                  {renderError("passing_score")}
                </div>
              </div>
            </div>
            <div className="modal-right">
              <div
                className="interview-requirements"
                style={{
                  display:
                    workflow === "Interview Only" ||
                    workflow === "Test to Interview" ||
                    workflow === "Interview to Test"
                      ? "block"
                      : "none",
                }}
              >
                <h2>Interview Requirements</h2>
                <div className="form-group">
                  <label htmlFor="interviewRequirements">
                    Number of Interviewer
                  </label>
                  <input
                    type="number"
                    id="no_interviewer"
                    name="no_interviewer"
                    placeholder="Enter number of interviewers..."
                    value={formData.no_interviewer}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        no_interviewer: e.target.value,
                      });
                    }}
                  />
                  {renderError("no_interviewer")}
                </div>

                <div className="form-group">
                  <label htmlFor="passing_rate">Passing Rate</label>
                  <input
                    type="number"
                    id="passing_rate"
                    name="passing_rate"
                    placeholder="Enter passing rate..."
                    value={formData.passing_rate}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        passing_rate: e.target.value,
                      });
                    }}
                  />
                  {renderError("passing_rate")}
                </div>

                <div className="form-group">
                  <label htmlFor="interview_description">
                    Interview Description
                  </label>
                  <textarea
                    id="interview_description"
                    name="interview_description"
                    rows="4"
                    placeholder="Enter interview description..."
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        interview_description: e.target.value,
                      });
                    }}
                  ></textarea>
                </div>
              </div>
              <div className="document-requirements">
                <h2>Document Requirements</h2>
                <DocumentList onDocumentTypeChange={handleDocumentTypeChange} />
              </div>
            </div>
          </div>
          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
