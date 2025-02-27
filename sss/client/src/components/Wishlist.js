import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Wishlist.css";


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


    return (
        <div className="wishlist-container">
            <h2>My Wishlist</h2>
            {userWishlist.length === 0 ? (
                <p>No stocks in wishlist.</p>
            ) : (
                <ul className="wishlist-list">
                    {userWishlist.map((stock) => (
                        <li key={stock._id}>
                            {stock.companyName} ({stock.nseorbseSymbol})
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Wishlist;

//   const updateWishlist = (stockId) => {
//     setUserWishlist((prev) =>
//       prev.includes(stockId) ? prev.filter((id) => id !== stockId) : [...prev, stockId]
//     );
//   };
//     <div>
//       {stocks.map((stock) => (
//         <Stock
//           key={stock._id}
//           stock={stock}
//           userWishlist={userWishlist}
//           updateWishlist={updateWishlist}
//         />
//       ))}
//     </div>
//   );
