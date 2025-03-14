import React, { useState } from 'react';
import './GalleryPage.css';
import SectionPopup from './SectionPopup';
import { FaPencilAlt } from 'react-icons/fa'; // Import pencil icon

const GalleryPage = () => {
    const [sections, setSections] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [expandedImage, setExpandedImage] = useState(null);
    const [editSectionIndex, setEditSectionIndex] = useState(null);

    const handleAddSection = () => {
        setEditSectionIndex(null); // Reset edit index
        setShowPopup(true);
    };

    const handlePopupClose = () => {
        setShowPopup(false);
    };

    const handleSectionSubmit = (newSection) => {
        if (editSectionIndex !== null) {
            const updatedSections = [...sections];
            updatedSections[editSectionIndex] = newSection;
            setSections(updatedSections);
        } else {
            setSections([...sections, newSection]);
        }
        setShowPopup(false);
    };

    const handleImageClick = (imageUrl) => {
        setExpandedImage(imageUrl);
    };

    const handleCloseExpandedImage = () => {
        setExpandedImage(null);
    };

    const handleEditSection = (index) => {
        setEditSectionIndex(index);
        setShowPopup(true);
    };

    return (
        <div className="gallery-page-container">
            <h1>Photo Gallery for [Insert Business Here]</h1>
            <button className="add-section-button" onClick={handleAddSection}>
                Add a photo section
            </button>
            <p className="section-description">
                Add a photo section to showcase and organize images of your business and its products!
            </p>

            {showPopup && (
                <SectionPopup
                    onClose={handlePopupClose}
                    onSubmit={handleSectionSubmit}
                    initialSection={editSectionIndex !== null ? sections[editSectionIndex] : null}
                />
            )}

            <div className="sections-container">
                {sections.map((section, index) => (
                    <div key={index} className="section">
                        <div className="section-header">
                            <h2>{section.name}</h2>
                            <FaPencilAlt
                                className="edit-section-icon"
                                onClick={() => handleEditSection(index)}
                                title="Edit your Photo Section Gallery"
                            />
                        </div>
                        <div className="section-carousel">
                            {section.photos.map((photo, photoIndex) => (
                                <img
                                    key={photoIndex}
                                    src={URL.createObjectURL(photo)}
                                    alt={`Section Photo ${photoIndex + 1}`}
                                    className="section-photo"
                                    onClick={() => handleImageClick(URL.createObjectURL(photo))}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            {expandedImage && (
                <div className="expanded-image-overlay" onClick={handleCloseExpandedImage}>
                    <img src={expandedImage} alt="Expanded" className="expanded-image" />
                </div>
            )}
        </div>
    );
};

export default GalleryPage;