import React, { useState, useEffect } from 'react';
import './SectionPopup.css';

const SectionPopup = ({ onClose, onSubmit, initialSection }) => {
    const [sectionName, setSectionName] = useState('');
    const [uploadedPhotos, setUploadedPhotos] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        if (initialSection) {
            setSectionName(initialSection.name);
            setUploadedPhotos(initialSection.photos);
        } else {
            setSectionName('');
            setUploadedPhotos([]);
        }
    }, [initialSection]);

    const handleFileChange = (e) => {
        setUploadedPhotos([...uploadedPhotos, ...e.target.files]);
    };

    const handleSubmit = () => {
        if (!sectionName.trim()) {
            setError('Please enter a section name.');
            return;
        }
        if (uploadedPhotos.length === 0) {
            setError('Please upload at least one photo.');
            return;
        }
        onSubmit({ name: sectionName, photos: uploadedPhotos });
        setError('');
    };

    const handleDeletePhoto = (index) => {
        const updatedPhotos = [...uploadedPhotos];
        updatedPhotos.splice(index, 1);
        setUploadedPhotos(updatedPhotos);
    };

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <h2>Name your Photo Gallery Section</h2>
                <input
                    type="text"
                    value={sectionName}
                    onChange={(e) => setSectionName(e.target.value)}
                    placeholder="Section Name"
                />
                <div className="upload-container">
                    <label htmlFor="photo-upload">Insert your Photos Here:</label>
                    <input
                        type="file"
                        id="photo-upload"
                        multiple
                        onChange={handleFileChange}
                        accept="image/*"
                    />
                </div>
                <div className="photo-preview">
                    {uploadedPhotos.map((photo, index) => (
                        <div key={index} className="preview-photo-container">
                            <img
                                src={URL.createObjectURL(photo)}
                                alt={`Preview ${index + 1}`}
                                className="preview-photo"
                            />
                            <button
                                className="delete-photo-button"
                                onClick={() => handleDeletePhoto(index)}
                            >
                                X
                            </button>
                        </div>
                    ))}
                </div>
                {error && <p className="error-message">{error}</p>}
                <div className="popup-buttons">
                    <button className="submit-button" onClick={handleSubmit}>
                        Submit
                    </button>
                    <button className="cancel-button" onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SectionPopup;