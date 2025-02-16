import React, { useState } from 'react';
import './ReportPopup.css';

const ReportPopup = ({ review, onClose }) => {
    const [reportReason, setReportReason] = useState('');
    const [reportSubmitted, setReportSubmitted] = useState(false);

    const handleSubmit = () => {
        // Here you would typically send the report data (review.id, reportReason) to your server
        console.log('Report submitted:', review.id, reportReason);

        setReportSubmitted(true);
        setTimeout(() => {
            setReportSubmitted(false);
            onClose(); // Close the popup after successful submission
        }, 3000);
    };

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <h2>Write a Report</h2>
                <textarea
                    className="report-input"
                    value={reportReason}
                    onChange={(e) => setReportReason(e.target.value)}
                    placeholder="Write the reason why you are reporting here" // Placeholder text here
                />
                <div className="popup-buttons">
                    <button className="submit-button" onClick={handleSubmit}>
                        Submit
                    </button>
                    <button className="cancel-button" onClick={onClose}>
                        Cancel
                    </button>
                </div>
                {reportSubmitted && (
                    <div className="report-submitted">
                        Report Submitted ✅
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReportPopup;