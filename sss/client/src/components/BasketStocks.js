import React, { useEffect, useState } from "react";
import "../styles/BasketStocks.css";
import axios from "axios";

function BasketStocks({
  onClose,
  basketId,
  basketName,
  basketDescription,
  stockIds,
  getBaskets,
}) {
  const [stocklist, setStocklist] = useState([]);
  useEffect(() => {
    setStocklist(stockIds);
  }, [stockIds]);

  const onClickDeleteStock = async (basketId, stockId) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:5000/api/baskets/customer/basket/${basketId}/remove-stock/${stockId}`,
        {
          withCredentials: true,
        }
      );

      if (getBaskets) {
        getBaskets();
      }
      alert(data.success || "Stock removed successfully.");
      setStocklist((prevStocks) =>
        prevStocks.filter((stock) => stock._id !== stockId)
      );
    } catch (error) {
      console.log(
        "Error removing stock:",
        error.response.data.error || error.message
      );
      alert(error.response.data.error || "Error removing stock.");
    }
  };

  return (
    <div className="basket-item-modal">
      <div className="basket-item-content">
        <button className="close-button" onClick={onClose}>
          <i className="bi bi-x"></i>
        </button>

        <h3>
          {basketName} <span>({basketDescription})</span>
        </h3>
        {stocklist.length > 0 ? (
          <ul>
            {stocklist.map((stock, index) => (
              <ul style={{display:"flex",justifyContent:"space-between"}} key={index}>
                <strong>{stock.companyName}</strong>
                <button
                  className="stock-delete"
                  onClick={() => onClickDeleteStock(basketId, stock._id)} // Change to a function reference
                >
                  <i className="bi bi-trash3-fill"></i>
                </button>
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
