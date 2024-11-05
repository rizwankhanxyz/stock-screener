import React from "react";
import "../styles/ComplianceReport.css";
import { Chart } from "react-google-charts";

function ComplianceReport({ stock, onClose }) {
  // const debtsMarketCap = stock.debtsMarketCap || 0; // Replace with the actual value from your database
  const options = {
    // pieHole: 0.6,
    pieStartAngle: -90,
    // pieSliceText: "none",
    // tooltip: { trigger: "none" },
    // legend: "none",
    slices: {
      0: { color: stock.debtsMarketCap <= 30 ? "#84BC62" : "#84BC62" },
      1: { color: stock.debtsMarketCap > 30 ? "#FF4C4C" : "#FF4C4C" },
    },
  };
  const data = [
    ["Label", "Value"],
    ["Debt-MarketCap", stock.debtsMarketCap], // Only a single data point is used to place the arrow
  ];
  console.log(stock.debtsMarketCap);
  
  return (
    <div className="compliance-report-modal">
      <div className="compliance-report-content">
        <div className="compliance-report-header">
          <button className="close-button" onClick={onClose}>
            <i className="bi bi-x"></i>
          </button>
          <center>
            <h2>Compliance Report</h2>
          </center>
        </div>
        <div className="compliance-report-body">
          <h4>{stock.companyName}</h4>
          <p className="compliance-report-p">
            <strong>Symbol:</strong> {stock.nseorbseSymbol}
          </p>
          <p className="compliance-report-p">
            <strong>Exchange:</strong> {stock.exchange}
          </p>
          <p>
            <strong>Industry Group:</strong> {stock.industryGroup}
          </p>
          {/* <p><strong>Compliance Status:</strong> {stock.financialScreeningStatus}</p> */}
          <center>
            <p className="compliance-report-update">
              Updated on (Database Updated Date will show here)
            </p>
          </center>
          <center>
            <strong>
              <h6>
                Based on AAOIFI Standards <i className="bi bi-info-circle"></i>
              </h6>
            </strong>
          </center>
          <h5>FINANCIAL SCREENING</h5>
          <div className="compliance-report-financial-list">
            <div className="compliance-report-list">
              <i className="bi bi-check-circle-fill"></i> Debt-to-Market Capital
              Ratio
              <p>{stock.debtsMarketCap}</p>
            </div>
            <div className="compliance-report-list">
              <i className="bi bi-check-circle-fill"></i> Interest-Bearing
              Securities
              <p>{stock.interestBearingSecuritiesMarketCap}</p>
            </div>
            <div className="compliance-report-list">
              <i className="bi bi-check-circle-fill"></i> Non-Permissble Income
              <p>{stock.interestIncomeTotalIncome}</p>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "1rem",
              }}
            >
              <Chart
                chartType="PieChart"
                width={"100%"}
                height={"400px"}
                data={data}
                options={options}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComplianceReport;
