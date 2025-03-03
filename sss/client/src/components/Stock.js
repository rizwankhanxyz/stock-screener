// import React, { useState, useEffect } from "react";
// import "../styles/Stock.css";
// import ComplianceReport from "./ComplianceReport";
// import axios from "axios";

// function Stock({ stock, handleStockSelect, isSelected, parent }) {
//   const [showComplianceReport, setShowComplianceReport] = useState(false);
//   const [isWishlisted, setIsWishListed] = useState(false);

//   useEffect(() => {
//     const fetchWishlist = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/wishlist/customer/wishlist",
//           { withCredentials: true }
//         );
//         const wishlistStocks = response.data.wishlist || [];
//         setIsWishListed(wishlistStocks.some((item) => item._id === stock._id));
//       }
//       catch (error) {
//         console.error("Error fetching wishlist:", error);
//       }
//     };
//     // Fetch wishlist only if state hasn't changed
//     if (!isWishlisted) {
//       fetchWishlist();
//     }

//   }, [stock._id, isWishlisted]);

//   const handleStockBookmark = async () => {
//     // setIsWishListed((prev) => !prev);

//     try {
//       const response = await axios.post("http://localhost:5000/api/wishlist/customer/wishlist/toggle",
//         { stockId: stock._id },
//         { withCredentials: true }
//       );
//       // setIsWishListed(true);
//       setIsWishListed(response.data.isWishlisted)
//     } catch (error) {
//       console.error("Error adding stock:", error.response.data.error);
//       alert(error.response.data.error || "Error updating wishlist.");
//       // setIsWishListed((prev) => !prev);
//     }
//   };

//   // Function to handle click and show ComplianceReport component
//   const openComplianceReport = (e) => {
//     e.preventDefault();
//     setShowComplianceReport(true); // Set to true to show ComplianceReport
//     document.body.style.overflow = "hidden"; // Prevent background scroll
//   };

//   // Function to close the ComplianceReport component
//   const closeComplianceReport = () => {
//     setShowComplianceReport(false); // Set to false to hide ComplianceReport
//     document.body.style.overflow = "auto"; // Re-enable background scroll
//   };

//   return (
//     <>
//       <div className="stock-container">
//         <div className="stock-symbol">
//           <h6>{stock.nseorbseSymbol}</h6>
//         </div>
//         <div className="stock-name">
//           <h6>{stock.companyName}</h6>
//         </div>
//         <div className="stock-exchange">
//           <h6>{stock.exchange}</h6>
//         </div>
//         <div className="stock-status">
//           <h6
//             data-bs-toggle="popover"
//             onClick={openComplianceReport}
//             className={`status-badge ${stock.financialScreeningStatus === "PASS"
//               ? "compliant"
//               : "non-compliant"
//               }`}
//           >
//             {stock.financialScreeningStatus === "PASS"
//               ? "COMPLIANT"
//               : "NON-COMPLIANT"}
//           </h6>
//         </div>
// <div
//   className="stock-wishlist"
//   onClick={parent === "Stocks" ? handleStockBookmark : () => handleStockSelect(stock._id)}

// >
//   {
//     parent === "Stocks" ?
//       (isWishlisted ? (<i className="bi bi-bookmark-check-fill"></i>) : (<i className="bi bi-bookmark"></i>))
//       :
//       (isSelected ? (<i className="bi bi-check-square-fill"></i>) : (<i className="bi bi-square"></i>))
//   }
// </div>
//       </div>
//       {showComplianceReport && (
//         <ComplianceReport stock={stock} onClose={closeComplianceReport} />
//       )}
//     </>
//   );
// }

// export default Stock;


  import React, { useState, useEffect } from "react";
  import "../styles/Stock.css";
  import ComplianceReport from "./ComplianceReport";

  function Stock({ stock, isSelected, handleStockSelect, isWishlisted, handleWishlistToggle, parent }) {
    const [showComplianceReport, setShowComplianceReport] = useState(false);
    const [wishlisted, setWishlisted] = useState(isWishlisted);

    useEffect(() => {
      setWishlisted(isWishlisted);
    }, [isWishlisted]);

    const openComplianceReport = (e) => {
      e.preventDefault();
      setShowComplianceReport(true);
      document.body.style.overflow = "hidden";
    };

    const closeComplianceReport = () => {
      setShowComplianceReport(false);
      document.body.style.overflow = "auto";
    };

    // Handle bookmark or selection based on the parent component
    const handleWishlistClick = () => {
      if (parent === "Stocks") {
        handleWishlistToggle(stock._id);
        setWishlisted(!wishlisted); // Update UI immediately
      } else {
        handleStockSelect(stock._id);
      }
    };

    return (
      <>
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
              onClick={openComplianceReport}
              className={`status-badge ${stock.financialScreeningStatus === "PASS" ? "compliant" : "non-compliant"}`}
            >
              {stock.financialScreeningStatus === "PASS" ? "COMPLIANT" : "NON-COMPLIANT"}
            </h6>
          </div>
          {/* Wishlist or Selection Icon */}
          <div className="stock-wishlist" onClick={handleWishlistClick}>
            {parent === "Stocks" ? (
              wishlisted ? <i className="bi bi-bookmark-check-fill"></i> : <i className="bi bi-bookmark"></i>
            ) : (
              isSelected ? <i className="bi bi-check-square-fill"></i> : <i className="bi bi-square"></i>
            )}
          </div>
        </div>
        {showComplianceReport && <ComplianceReport stock={stock} onClose={closeComplianceReport} />}
      </>
    );
  }

  export default Stock;

