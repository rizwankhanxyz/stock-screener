import React, { useState } from "react";
import "../styles/BasketItem.css";
import axios from "axios";

function BasketItem({ onClose, stocks }) {
  const [basketName, setBasketName] = useState("");
  const [basketDescription, setBasketDescription] = useState("");
  const [selectedStocks, setSelectedStocks] = useState([]);

  const handleStockSelect = (stockId) => {
    setSelectedStocks((prev) =>
      prev.includes(stockId)
        ? prev.filter((id) => id !== stockId)
        : [...prev, stockId]
    );
  };

  const handleSubmit = async () => {
    if (!basketName.trim()) {
      alert("Basket name is required.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/baskets/customer/basket/create",
        {
          basketName,
          basketDescription,
          stockIds: selectedStocks,
        },
        { withCredentials: true }
      );
      alert("Basket created successfully.");
      onClose();
    } catch (error) {
      console.error("Error creating basket:", error.response.data.error);
      alert(error.response.data.error || "Error creating basket.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>
          <i className="bi bi-x"></i>
        </button>
        <div>
          <input
            type="text"
            value={basketName}
            onChange={(e) => setBasketName(e.target.value)}
            placeholder="Enter basket name"
          />
          <input
            value={basketDescription}
            onChange={(e) => setBasketDescription(e.target.value)}
            placeholder="Enter basket description"
          />
          <button onClick={handleSubmit} className="submit-btn">
            Create Basket
          </button>
        </div>
        <div>
          <h3>Select Stocks</h3>
            {stocks.map((stock) => (
              <ul key={stock._id}>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedStocks.includes(stock._id)}
                    onChange={() => handleStockSelect(stock._id)}
                  />
                  {stock.companyName}
                </label>
              </ul>
            ))}
        </div>
      </div>
    </div>
  );
}

export default BasketItem;
