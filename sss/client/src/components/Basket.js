import React from "react";
import axios from "axios";

function Basket({ loading, stocks }) {
  const handleAddToBasket = async (stockId) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/baskets/customer/basket", // API endpoint
        { stockId }, // Send the stockId in the request body
        { withCredentials: true } // Include cookies in the request
      );
      alert("Stock added to basket:", response.data)
      console.log("Stock added to basket:", response.data);
    } catch (error) {
      console.error("Error adding stock to basket:", error.response.data.error);
    }
  };
  return (
    <>
      Basket
      <div>
        {stocks.map((stock) => (
          <div key={stock._id}>
            <h4>{stock.companyName}</h4>
            <button onClick={() => handleAddToBasket(stock._id)}>Add</button>
          </div>
        ))}
      </div>
    </>
  );
}

export default Basket;
