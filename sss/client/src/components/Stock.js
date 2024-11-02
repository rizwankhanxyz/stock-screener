import React from "react";
import "../styles/Stock.css"
function Stock({ stock }) {
  return (
    <div>
    <div className="stock-container">
      <div className="stock-namesymbol">
        <h5>{stock.nseorbseSymbol}</h5>
        <p className="company-name">{stock.companyName}</p>
      </div>
      <div className="stock-exchangestatus">
        <h5>{stock.exchange}</h5>
        <p
          className={`status-badge ${stock.financialScreeningStatus === "PASS" ? "compliant" : "non-compliant"}`}
        >
          {stock.financialScreeningStatus === "PASS" ? "COMPLIANT" : "NON-COMPLIANT"}
        </p>
      </div>
    </div>
    </div>
  );
}

export default Stock;