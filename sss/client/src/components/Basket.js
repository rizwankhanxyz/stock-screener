import React, { useState } from "react";
import "../styles/Basket.css";
import BasketItem from "./BasketItem";

function Basket({ loading, stocks, handleAddToBasket }) {
  const [showBasket, setShowBasket] = useState(false);

  // Function to handle click and show ComplianceReport component
  const openCreateBasket = (e) => {
    e.preventDefault();
    setShowBasket(true); // Set to true to show ComplianceReport
    document.body.style.overflow = "hidden"; // Prevent background scroll
  };

  // Function to close the ComplianceReport component
  const closeCreateBasket = () => {
    setShowBasket(false); // Set to false to hide ComplianceReport
    document.body.style.overflow = "auto"; // Re-enable background scroll
  };
  return (
    <>
      <div>
        {/* <center>
          <div
            className="search-container"
            style={{ padding: "1rem", width: "100%", maxWidth: "530px" }}
          >
            <input
              type="text"
              className="form-control"
              placeholder="Search By Stock Name or NSE/BSE Symbol"
              // onChange={onChangehandler}
              // value={query}
              style={{
                textAlign: "center",
                borderRadius: "1rem",
                padding: "0.8rem",
              }}
              required
            />
          </div>
        </center> */}
        {/* {stocks.map((stock) => (
          <div key={stock._id}>
            <h4>{stock.companyName}</h4>
            <button onClick={() => handleAddToBasket(stock._id)}>Add</button>
          </div>
        ))} */}

        <button
          data-bs-toggle="popover"
          className="create-basket"
          onClick={openCreateBasket}
        >
          Create a new Basket
        </button>
        {showBasket && <BasketItem onClose={closeCreateBasket} stocks={stocks} />}
      </div>
    </>
  );
}

export default Basket;
