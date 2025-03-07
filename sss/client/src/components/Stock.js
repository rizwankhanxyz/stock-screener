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

