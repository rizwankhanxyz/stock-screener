import React from "react";
import "../styles/Profile.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Profile({ onClose, setAuth, setUserRole }) {
    const navigate = useNavigate();


    const onClickHandler = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
                "http://localhost:5000/api/customer/logout",
                {},
                { withCredentials: true }
            );
            localStorage.removeItem("alias");
            setAuth(false);
            setUserRole(null);
            navigate("/login");
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <div className="profile-container">
                <div className="profile-content">
                    <button onClick={onClose}>Close</button>
                    <h3 className="logout"
                        onClick={onClickHandler}
                        style={{ marginRight: "10px", cursor: "pointer" }}
                    >
                        <i className="bi bi-power"></i>
                    </h3>
                </div>
            </div>
        </>
    );
}

export default Profile;
