import React, { useState } from "react";
import "../styles/Stock.css";
import ComplianceReport from "./ComplianceReport";

function Stock({ stock, handleStockSelect, isSelected }) {
  const [showComplianceReport, setShowComplianceReport] = useState(false);

  // Function to handle click and show ComplianceReport component
  const openComplianceReport = (e) => {
    e.preventDefault();
    setShowComplianceReport(true); // Set to true to show ComplianceReport
    document.body.style.overflow = "hidden"; // Prevent background scroll
  };

  // Function to close the ComplianceReport component
  const closeComplianceReport = () => {
    setShowComplianceReport(false); // Set to false to hide ComplianceReport
    document.body.style.overflow = "auto"; // Re-enable background scroll
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
            className={`status-badge ${stock.financialScreeningStatus === "PASS"
              ? "compliant"
              : "non-compliant"
              }`}
          >
            {stock.financialScreeningStatus === "PASS"
              ? "COMPLIANT"
              : "NON-COMPLIANT"}
          </h6>
        </div>
        <div
          className="stock-wishlist"
          onClick={() => handleStockSelect(stock._id)}
        >
          {isSelected ? (
            // <i className="bi bi-bookmark-check-fill"></i>
            <i class="bi bi-check-square-fill"></i>
          ) : (
            // <i className="bi bi-bookmark"></i>
            <i class="bi bi-square"></i>
          )}
        </div>
      </div>
      {showComplianceReport && (
        <ComplianceReport stock={stock} onClose={closeComplianceReport} />
      )}
    </>
  );
}

export default Stock;
