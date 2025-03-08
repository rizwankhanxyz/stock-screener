import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Wishlist.css";
import "../styles/Stock.css";

function Wishlist() {
    const [userWishlist, setUserWishlist] = useState([]);

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const { data } = await axios.get(
                    "http://localhost:5000/api/wishlist/customer/wishlist",
                    { withCredentials: true }
                );

                if (data.wishlist) {
                    setUserWishlist(data.wishlist);
                }
            } catch (error) {
                console.error("Error fetching wishlist:", error);
            }
        };

        fetchWishlist();
    }, []);

    const handleWishlistToggle = async (stockId) => {
        try {
            await axios.post(
                "http://localhost:5000/api/wishlist/customer/wishlist/toggle",
                { stockId },
                { withCredentials: true }
            );
            setUserWishlist((prevWishlist) =>
                prevWishlist.filter((stock) => stock._id !== stockId)
            );
        } catch (error) {
            console.error("Error updating wishlist:", error.response?.data?.error || error.message);
            alert(error.response?.data?.error || "Error updating wishlist.");
        }
    };

    return (
        <div className="wishlist-container">
            {userWishlist.length === 0 ? (
                <p style={{ fontSize: "x-large", color: "darkgreen",alignContent: "center",textAlign:"center", height:"365px"}}>No stocks in wishlist yet.</p>
            ) : (
                <div className="wishlist-list">
                    {userWishlist.map((stock) => (
                        <div key={stock._id}>
                            <div className="stock-container">
                                <div className="stock-symbol">
                                    <h6>{stock.nseorbseSymbol}</h6>
                                </div>
                                <div className="stock-name">
                                    <h6>{stock.companyName}</h6>
                                </div>
                                <div className="stock-exchange">
                                    <h6>{stock.exchange}</h6>
                                </div>
                                <div className="stock-status">
                                    <h6
                                        data-bs-toggle="popover"
                                        className={`status-badge ${stock.financialScreeningStatus === "PASS" ? "compliant" : "non-compliant"}`}
                                    >
                                        {stock.financialScreeningStatus === "PASS" ? "COMPLIANT" : "NON-COMPLIANT"}
                                    </h6>
                                </div>
                                <div className="stock-wishlist"
                                    onClick={() => handleWishlistToggle(stock._id)}
                                >
                                    <i className="bi bi-bookmark-check-fill"></i>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>


            )}
        </div>
    );
}

export default Wishlist;
