import { React } from "react";
import "../styles/Profile.css"
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Profile({ onClose, setAuth, setUserRole }) {
    const navigate = useNavigate();

    // Fetch user details from localStorage
    const user = {
        fullname: localStorage.getItem("fullname") || "User Name",
        email: localStorage.getItem("email") || "user@example.com",
        phonenumber: localStorage.getItem("phonenumber") || "Not Available",
    };

    const onClickHandlerLogout = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
                "http://localhost:5000/api/customer/logout",
                {},
                { withCredentials: true }
            );
            localStorage.clear();
            setAuth(false);
            setUserRole(null);
            navigate("/login");
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="profile-container" onClick={onClose}>
            <div className="profile-content" onClick={(e) => e.stopPropagation()}>
                {/* User Info Section */}
                <div className="profile-info">
                    <i className="bi bi-person-circle profile-icon"></i>
                    <h3 className="profile-name">{user.fullname}</h3>
                    <p className="profile-email"><i className="bi bi-envelope-at icons"></i>{user.email}</p>
                    <p className="profile-phone"><i className="bi bi-phone icons"></i>{user.phonenumber}</p>
                </div>

                {/* Options */}
                <ul className="profile-options">
                    <li>
                        <i className="bi bi-lock icons"></i> Change Password
                    </li>
                    <li>
                        <Link to={"https://shariahequities.com/about-2/"} className="link" target="_blank"><i className="bi bi-info-circle icons"></i>About Shariah Equities</Link>
                    </li>
                    <li>
                        <Link to={"./Shariah-Equities-Screening-Methodology.pdf"} className="link" target="_blank"><i className="bi bi-journal-arrow-down icons"></i>Screening Methodology</Link>
                    </li>
                    <li>
                        <Link to={"https://shariahequities.com/contact/"}  className="link" target="_blank"><i className="bi bi-headset icons"></i>Contact Us</Link>
                    </li>
                    <li>
                        <Link to={"https://docs.google.com/forms/d/e/1FAIpQLSfzxpy_rz26-It4wMuP_Srq9Zt5qtgbDdLzGVsO81V-wCuY1w/viewform"}  className="link" target="_blank"><i className="bi bi-chat-left-text icons"></i>Feedback</Link>
                    </li>

                </ul>

                {/* Logout Button */}
                <div className="logout" onClick={onClickHandlerLogout}>
                    <i className="bi bi-power"></i> Log Out
                </div>
            </div>
        </div>
    );

}

export default Profile;
