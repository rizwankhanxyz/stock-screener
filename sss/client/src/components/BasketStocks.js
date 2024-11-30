import React from "react";
import "../styles/BasketStocks.css";

function BasketStocks({ stockIds, onClose, basketName, basketDescription }) {
  return (
    <div className="basket-item-modal">
      <div className="basket-item-content">
        <button className="close-button" onClick={onClose}>
          <i className="bi bi-x"></i>
        </button>

        <h3>
          {basketName} <span>({basketDescription})</span>
        </h3>
        {stockIds.length > 0 ? (
          <ul>
            {stockIds.map((stock, index) => (
              <ul key={index}>
                <strong>{stock.companyName}</strong>
              </ul>
            ))}
          </ul>
        ) : (
          <p>No stocks available for this basket.</p>
        )}
      </div>
    </div>
  );
}

export default BasketStocks;
