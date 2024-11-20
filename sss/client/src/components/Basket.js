import React from "react";

function Basket({ loading, stocks, handleAddToBasket }) {
  // const [query, setQuery] = useState("");

  return (
    <>
      <div>
        <center>
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
        </center>
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
