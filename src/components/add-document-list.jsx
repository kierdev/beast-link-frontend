import { Plus } from "lucide-react";
import { useState, useContext } from "react";
import { GlobalDataContext } from "./global-data-context";
import ActionMenuDocument from "./action-menu-document";

export default function DocumentList({ onDelete, onDocumentTypeChange, selectedDocuments = [], isDisabled = false }) {
  const { documentLists, setDocumentLists, fetchData } = useContext(GlobalDataContext);
  const [formData, setFormData] = useState({
    document_name: "",
  });

  const [errors, setErrors] = useState({});
  const [isAdding, setIsAdding] = useState(false);

  const handleCheckboxChange = (documentId) => {
    if (isDisabled) return;

    const updatedSelectedDocuments = selectedDocuments.includes(documentId)
      ? selectedDocuments.filter((id) => id !== documentId)
      : [...selectedDocuments, documentId];

    onDocumentTypeChange(updatedSelectedDocuments);
  };

  async function handleSave(e) {
    e.preventDefault();
    const response = await fetch("/api/document-lists", {
      method: "POST",
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    console.log(data);
    if (data.errors) {
      setErrors(data.errors);
    } else {
      setIsAdding(false);
      await fetchData();
      setFormData({
        document_name: "",
      });
    }
  }

  async function handleDelete(documentId) {
    const response = await fetch(`/api/document-lists/${documentId}`, {
      method: "DELETE",
    });
    if (response.ok) {
      await fetchData();
    }
  }

  return (
    <div>
      <div className="document-list">
        {documentLists.map((document) => (
          <div key={document.id} className="document-item">
            <input
              type="checkbox"
              id={document.document_name}
              name={document.document_name}
              checked={selectedDocuments.includes(document.document_name)}
              onChange={() => handleCheckboxChange(document.document_name)}
              disabled={isDisabled}
            />
            <label htmlFor={document.document_name}>
              {document.document_name}
            </label>
            <ActionMenuDocument onDelete={() => handleDelete(document.id)} />
          </div>
        ))}
      </div>
      {isAdding ? (
        <div className="document-add">
          <div>
            <input
              type="text"
              id="documentName"
              name="documentName"
              placeholder="Enter document name..."
              value={formData.document_name}
              onChange={(e) => {
                setFormData({ ...formData, document_name: e.target.value });
              }}
              required
            />
            {errors.document_name && (
              <p className="error">{errors.document_name[0]}</p>
            )}
          </div>
          <div className="document-actions">
            <button className="save-document-button" onClick={handleSave}>
              Save
            </button>
            <button
              className="cancel-document-button"
              onClick={() => setIsAdding(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          className="add-document-button"
          onClick={() => setIsAdding(true)}
          disabled={isDisabled} // Disable add button if isDisabled is true
        >
          <Plus size={16} />
          <span>Add Document</span>
        </button>
      )}
    </div>
  );
}
