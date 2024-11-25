import React, { useState } from "react";
import "../styles/BasketItem.css";
import Stock from "./Stock";
import axios from "axios";

function BasketItem({ onClose, stocks }) {
  const [query, setQuery] = useState("");
  const [basketName, setBasketName] = useState("");
  const [basketDescription, setBasketDescription] = useState("");
  const [selectedStocks, setSelectedStocks] = useState([]);

  const onChangehandler = (e) => {
    setQuery(e.target.value);
  };

  const filteredData = stocks.filter((element) => {
    const matchesQuery =
      element.companyName.toLowerCase().includes(query.toLowerCase()) ||
      element.nseorbseSymbol.toLowerCase().includes(query.toLowerCase());
    return matchesQuery;
  });

  // const handleStockSelect = (stockId) => {
  //   setSelectedStocks((prev) =>
  //     prev.includes(stockId)
  //       ? prev.filter((id) => id !== stockId)
  //       : [...prev, stockId]
  //   );
  // };

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
            placeholder="Enter Basket Name"
          />
          <input
            value={basketDescription}
            onChange={(e) => setBasketDescription(e.target.value)}
            placeholder="Enter Basket Description"
          />
          <button onClick={handleSubmit} className="submit-btn">
            Create Basket
          </button>
        </div>
        <center>
          <div
            className="search-container"
            style={{ padding: "1rem", width: "100%", maxWidth: "530px" }}
          >
            <input
              type="text"
              className="form-control"
              placeholder="Search By Stock Name or NSE/BSE Symbol"
              onChange={onChangehandler}
              value={query}
              style={{
                textAlign: "center",
                borderRadius: "1rem",
                padding: "0.8rem",
              }}
              required
            />
          </div>
        </center>
        <div>
          <h4>Select Stocks now to Add</h4>
          {filteredData.map((stock,index) => (
              <Stock
                // handleAddToBasket={handleAddToBasket}
                stock={stock}
              />
          ))}
        </div>
      </div>
    </div>
  );
}

export default BasketItem;
