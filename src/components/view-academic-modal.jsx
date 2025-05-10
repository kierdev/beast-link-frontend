import { useState, useContext } from "react";
import { GlobalDataContext } from "./global-data-context";

export default function ViewAcademicModal({ academicData , onClose }) {
  const { fetchAcademicYears } = useContext(GlobalDataContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...academicData });
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


  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    const response = await fetch(`/api/academic-years/${formData.id}`, {
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
                value={formData.academic_year}
                placeholder="Enter academic year..."
                onChange={handleInputChange}
                disabled={!isEditing}
              />
              {renderError("academic_year")}
            </div>
            <div className="form-group">
              <label htmlFor="academicSemester">Academic Semester</label>
              <input
                type="text"
                id="academicSemester"
                name="academicSemester"
                value={formData.academic_semester}
                placeholder="Enter academic semester..."
                onChange={handleInputChange}
                disabled={!isEditing}
              />
              {renderError("academic_semester")}
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
