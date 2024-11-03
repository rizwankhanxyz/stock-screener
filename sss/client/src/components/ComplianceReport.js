import React from "react";
import "../styles/ComplianceReport.css";

function ComplianceReport({ stock, onClose }) {
  return (
    <div className="compliance-report-modal">
      <div className="compliance-report-content">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Compliance Report</h2>
        <h3>{stock.companyName}</h3>
        <p><strong>Symbol:</strong> {stock.nseorbseSymbol}</p>
        <p><strong>Exchange:</strong> {stock.exchange}</p>
        <p><strong>Debts/Market Cap:</strong> {stock.debtsMarketCap}</p>
        <p><strong>Compliance Status:</strong> {stock.financialScreeningStatus}</p>
        {/* Add other relevant stock information here */}
      </div>
    </div>
  );
}

export default ComplianceReport;
