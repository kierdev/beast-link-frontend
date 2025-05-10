import { useState, useContext } from "react";
import { GlobalDataContext } from "./global-data-context";

export default function AddAcademicModal({ onClose }) {
  const { fetchAcademicYears } = useContext(GlobalDataContext);
  const [formData, setFormData] = useState({
    academic_year: "",
    academic_semester: "",
  });

  const [errors, setErrors] = useState({});

  // Render error messages for all fields
  const renderError = (field) => {
    return errors[field] ? <p className="error">{errors[field][0]}</p> : null;
  };

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("Form data:", formData);
    const response = await fetch("/api/academic-years/", {
      method: "POST",
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    console.log(data);
    if (data.errors) {
      setErrors(data.errors);
    } else {
      await fetchAcademicYears();
      onClose();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container-2">
        <div className="modal-header">
          <h3>Add New Academic Year</h3>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit} className="program-form">
          <div className="modal-content-2">
            <div className="form-group">
              <label htmlFor="academicYear">Academic Year</label>
              <input
                type="text"
                id="academicYear"
                name="academicYear"
                placeholder="Enter academic year..."
                onChange={(e) => {
                  setFormData({ ...formData, academic_year: e.target.value });
                }}
              />
              {renderError("academic_year")}
            </div>
            <div className="form-group">
              <label htmlFor="academicSemester">Academic Semester</label>
              <input
                type="text"
                id="academicSemester"
                name="academicSemester"
                placeholder="Enter academic semester..."
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    academic_semester: e.target.value,
                  });
                }}
              />
              {renderError("academic_semester")}
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
