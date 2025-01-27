import React from "react";
import "../styles/Profile.css"

function Profile({ onClose }) {
    return (
        <>
            <div className="profile-container">
                <div className="profile-content">
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        </>
    );
}

export default Profile;
