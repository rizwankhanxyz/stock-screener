import React from "react";
import "../styles/ComplianceReport.css";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const drawNeedlePlugin = {
  id: "drawNeedle",
  afterDraw(chart) {
    const {
      ctx,
      chartArea: { width, height },
    } = chart;
    const debtsMarketCap = chart.config.options.pointerValue;

    const centerX = width / 2;
    const centerY = height / 1.35; // Adjust for semi-circle center
    const radius = Math.min(centerX, centerY) - 3; // Define radius as slightly smaller than center

    // Draw the needle

    const angle = (-90 + debtsMarketCap * 1.8) * (Math.PI / 180); // Rotate starting from -90 degrees

    // const needleLength = radius; // Length of the needle

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(angle);

    // Draw the needle line
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -radius + 10); // Draw line to the needle's length

    // ctx.moveTo(0, -radius); // Tip of the arrow

    // ctx.lineTo(-arrowSize / 2, -radius + arrowSize); // Left side of the arrow
    // ctx.lineTo(arrowSize / 2, -radius + arrowSize); // Right side of the arrow
    // ctx.lineTo(0, -needleLength);
    // ctx.closePath();
    // ctx.fillStyle = "#000000"; // Black color for the arrow
    // ctx.fill();

    ctx.lineWidth = 3;
    ctx.strokeStyle = "#000000"; // Black color for the needle
    ctx.stroke();

    // Draw the arrowhead at the end of the needle
    const arrowSize = 10;
    ctx.beginPath();
    ctx.moveTo(0, -radius); // Tip of the arrowhead
    ctx.lineTo(-arrowSize / 2, -radius + arrowSize); // Left side of the arrowhead
    ctx.lineTo(arrowSize / 2, -radius + arrowSize); // Right side of the arrowhead
    ctx.closePath();
    ctx.fillStyle = "#000000"; // Black color for the arrowhead
    ctx.fill();

    // Draw the needle base circle
    ctx.beginPath();
    ctx.arc(0, 0, 5, 0, Math.PI * 2);
    ctx.fillStyle = "#000000"; // Black color for the base
    ctx.fill();

    ctx.restore();

    // Draw the debtsMarketCap value at the bottom center
    ctx.font = "14px Arial";
    ctx.fillStyle = "#000000";
    ctx.textAlign = "center";
    ctx.fillText(`${debtsMarketCap.toFixed(2)}%`, centerX, height - 50); // Limit to two decimal points
  },
};

// Register the custom plugin
ChartJS.register(drawNeedlePlugin);

function ComplianceReport({ stock, onClose }) {
  const debtsMarketCapRatio = stock.debtsMarketCap;
  const interestBearingSecuritiesMarketCapRatio =
    stock.interestBearingSecuritiesMarketCap;

  const gaugeData = {
    labels: ["Compliance", "Non-Compliance"],
    datasets: [
      {
        // These two values represent the green and red sections
        data: [30, 70],
        backgroundColor: ["#84BC62", "#FF4C4C"], // Green for 0-30%, Red for 31-100%
        borderWidth: 0,
        cutout: "60%", //70%
      },
    ],
  };

  const gaugeDataOther = {
    labels: ["Compliance", "Non-Compliance"],
    datasets: [
      {
        // These two values represent the green and red sections
        data: [5, 95],
        backgroundColor: ["#84BC62", "#FF4C4C"], // Green for 0-30%, Red for 31-100%
        borderWidth: 0,
        cutout: "60%", //70%
      },
    ],
  };

  const gaugeOptions1 = {
    rotation: -90, // Start at the bottom
    circumference: 180, // Semi-circle  //180
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    pointerValue: debtsMarketCapRatio, // Pass the pointer value to the plugin
  };
  const gaugeOptions2 = {
    rotation: -90, // Start at the bottom
    circumference: 180, // Semi-circle  //180
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    pointerValue: interestBearingSecuritiesMarketCapRatio, // Pass the pointer value to the plugin
  };

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
              <center>
                <p style={{ color: "#59a02d" }}>
                  <i className="bi bi-check-circle-fill"></i> Debt-to-Market
                  Capital Ratio
                </p>
              </center>
              <div style={{ width: "100%", maxWidth: "300px" }}>
                <Doughnut data={gaugeData} options={gaugeOptions1} />
              </div>
              <div
                style={{
                  textAlign: "center",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                <p
                  style={{
                    color: "#555",
                  }}
                >
                  {debtsMarketCapRatio <= 30 ? "Compliant" : "Non-Compliant"}:
                  {debtsMarketCapRatio.toFixed(2)}%
                </p>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div
                  style={{
                    backgroundColor: "#84BC62",
                    width: "20px",
                    height: "50px",
                  }}
                ></div>
                <div style={{ color: "#555" }}>
                  <p>Compliant</p>
                  <p>Less than 30%</p>
                </div>

                <div
                  style={{
                    backgroundColor: "#FF4C4C",
                    width: "20px",
                    height: "50px",
                  }}
                ></div>
                <div style={{ color: "#555" }}>
                  <p>Non-Compliant</p>
                  <p>Greater than 30%</p>
                </div>
              </div>
              <p style={{ color: "#555", marginTop: "0.5rem" }}>
                A company’s total debt should not exceed 30% of its market
                capitalisation
              </p>
            </div>
            <div className="compliance-report-list">
              <center>
                <p style={{ color: "#59a02d" }}>
                  <i className="bi bi-check-circle-fill"></i> Interest-Bearing
                  Securities
                </p>
              </center>
              <div style={{ width: "100%", maxWidth: "300px" }}>
                <Doughnut data={gaugeData} options={gaugeOptions2} />
              </div>
              <div
                style={{
                  textAlign: "center",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                <p
                  style={{
                    color: "#555",
                  }}
                >
                  {interestBearingSecuritiesMarketCapRatio <= 30 ? "Compliant" : "Non-Compliant"}:
                  {interestBearingSecuritiesMarketCapRatio.toFixed(2)}%
                </p>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div
                  style={{
                    backgroundColor: "#84BC62",
                    width: "20px",
                    height: "50px",
                  }}
                ></div>
                <div style={{ color: "#555" }}>
                  <p>Compliant</p>
                  <p>Less than 30%</p>
                </div>

                <div
                  style={{
                    backgroundColor: "#FF4C4C",
                    width: "20px",
                    height: "50px",
                  }}
                ></div>
                <div style={{ color: "#555" }}>
                  <p>Non-Compliant</p>
                  <p>Greater than 30%</p>
                </div>
              </div>
              <p style={{ color: "#555", marginTop: "0.5rem" }}>
              A company’s investments in interest-bearing securities, such as bonds or other debt instruments that generate interest, should not exceed 30% of its market capitalisation
              </p>
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
