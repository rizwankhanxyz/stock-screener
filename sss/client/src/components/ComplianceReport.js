import React from "react";
import "../styles/ComplianceReport.css";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const drawNeedlePlugin = {
  id: "drawNeedle",
  afterDraw(chart) {
    const { ctx, chartArea: { width, height } } = chart;
    const debtsMarketCap = chart.config.options.pointerValue;

    const pointerRotation = debtsMarketCap * 1.8;  // const pointerRotation = debtsMarketCap <= 30
    // ? debtsMarketCap *1.8  // Scale 0-30% to 0-54 degrees
    // : 54 + ((debtsMarketCap - 30) * (126/170)); // Scale 31-100% to 55-180 degrees

    console.log(pointerRotation);
  
    const centerX = width / 2;
    const centerY = height / 1.05; // Adjust for semi-circle center

    // Draw the needle
    const angle =pointerRotation; // Convert rotation to radians
    const needleLength = centerY - 10; // Length of the needle

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(angle);

    // Draw the needle line
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -needleLength);
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#000000"; // Black color for the needle
    ctx.stroke();

    // Draw the needle base circle
    ctx.beginPath();
    ctx.arc(0, 0, 5, 0, Math.PI * 2);
    ctx.fillStyle = "#000000"; // Black color for the base
    ctx.fill();

    ctx.restore();

    // Draw the debtsMarketCap value at the bottom center
    ctx.font = "16px Arial";
    ctx.fillStyle = "#000000";
    ctx.textAlign = "center";
    ctx.fillText(`${debtsMarketCap}%`, centerX, height - 20);
  },
};

// Register the custom plugin
ChartJS.register(drawNeedlePlugin);

function ComplianceReport({ stock, onClose }) {
  const debtsMarketCap = stock.debtsMarketCap;

  const gaugeData = {
    labels: ["Compliance", "Non-Compliance"],
    datasets: [
      {
        // These two values represent the green and red sections
        data: [30, 70],
        backgroundColor: ["#84BC62", "#FF4C4C"], // Green for 0-30%, Red for 31-100%
        borderWidth: 0,
        cutout: "70%",
      },
    ],
  };

  const gaugeOptions = {
    rotation: -90, // Start at the bottom
    circumference: 180, // Semi-circle
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    pointerValue: debtsMarketCap, // Pass the pointer value to the plugin
  };

  // const gaugeOptions = {
  //   rotation: -90, // Start at the bottom
  //   circumference: 180, // Semi-circle
  //   plugins: {
  //     legend: {
  //       display: false,
  //     },
  //     tooltip: {
  //       enabled: false,
  //     },
  //     // Custom plugin for drawing the pointer
  //     afterDraw(chart) {
  //       const ctx = chart.ctx;
  //       const width = chart.width;
  //       const height = chart.height;
  //       const centerX = width / 2;
  //       const centerY = height / 1.05; // Adjust for semi-circle center

  //       // Draw the needle
  //       const angle = (Math.PI / 180) * pointerRotation; // Convert rotation to radians
  //       console.log(angle);
  //       const needleLength = centerY - 10; // Length of the needle

  //       ctx.save();
  //       ctx.translate(centerX, centerY);
  //       ctx.rotate(angle);

  //       // Draw the needle line
  //       ctx.beginPath();
  //       ctx.moveTo(0, 0);
  //       ctx.lineTo(0, -needleLength);
  //       ctx.lineWidth = 3;
  //       ctx.strokeStyle = "#000000"; // Black color for the needle
  //       ctx.stroke();

  //       // Draw the needle base circle
  //       ctx.beginPath();
  //       ctx.arc(0, 0, 5, 0, Math.PI * 2);
  //       ctx.fillStyle = "#000000"; // Black color for the base
  //       ctx.fill();

  //       ctx.restore();

  //       // Draw the debtsMarketCap value at the bottom center
  //       ctx.font = "16px Arial";
  //       ctx.fillStyle = "#000000";
  //       ctx.textAlign = "center";
  //       ctx.fillText(`${debtsMarketCap}%`, centerX, height - 20);
  //     },
  //   },
  // };
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
              <div style={{ width: "100%", maxWidth: "300px"}}>
              <Doughnut data={gaugeData} options={gaugeOptions} />
            </div>
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
            {/* Gauge Chart */}

          </div>
        </div>
      </div>
    </div>
  );
}

export default ComplianceReport;
