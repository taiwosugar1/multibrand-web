// src/components/DesignUploadForm.jsx
import React, { useState } from 'react';
import './DesignUploadForm.css';

const DesignUploadForm = () => {
  const [hasDesign, setHasDesign] = useState(true);
  const [file, setFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    // You can implement the logic to handle file upload and form submission here
    setSuccessMessage('Design submitted successfully!');
  };

  return (
    <div className="design-upload-form">
      <form onSubmit={handleSubmit}>
        <h2>Upload Your Design</h2>
        <div>
          <label>
            Do you have a design?
            <input
              type="checkbox"
              checked={hasDesign}
              onChange={(e) => setHasDesign(e.target.checked)}
            />
          </label>
        </div>
        {hasDesign && (
          <div>
            <label>Upload your design (Formats: CDR, PNG, JPG, JPEG):</label>
            <input
              type="file"
              accept=".cdr,.png,.jpg,.jpeg"
              onChange={handleFileChange}
              required
            />
          </div>
        )}
        <button type="submit">Submit</button>
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
};

export default DesignUploadForm;