import React from 'react';
import "../styles/Funds.css";


const fundList = [
  { name: "Tata Ethical Fund", status: "Compliant" },
  { name: "Quantum Ethical Fund", status: "Compliant" }
];

function Funds() {
  const handleInvestClick = () => {
    window.open("https://shariahequities.com/contact/", "_blank");
  };
  return (
    <div className="funds-container">
      <div className="funds-list">
        {fundList.map((fund, index) => (
          <div className="funds" key={index}>
            <p className="fund-name">{fund.name}</p>
            <p className={`fund-status ${fund.status.toLowerCase()}`}>{fund.status}</p>
            <button className="invest-btn" onClick={handleInvestClick}>Invest Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Funds;