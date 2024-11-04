import React from "react";
import "../styles/ComplianceReport.css";

function ComplianceReport({ stock, onClose }) {
  return (
    <div className="compliance-report-modal">
      <div className="compliance-report-content">
        <div className="compliance-header">
                  <button className="close-button" onClick={onClose}><i className="bi bi-x"></i></button>
        <center><h2>Compliance Report</h2></center>
        </div>
        <h3 style={{color: "#84BC62"}}>{stock.companyName}</h3>
        <p style={{color: "#84BC62"}}><strong>Symbol:</strong> {stock.nseorbseSymbol}</p>
        <p style={{color: "#84BC62"}}><strong>Exchange:</strong> {stock.exchange}</p>
        <p style={{color: "#84BC62"}}><strong>Debts/Market Cap:</strong> {stock.debtsMarketCap}</p>
        <p style={{color: "#84BC62"}}><strong>Compliance Status:</strong> {stock.financialScreeningStatus}</p>
        {/* Add other relevant stock information here */}
      </div>
    </div>
  );
}

export default ComplianceReport;
