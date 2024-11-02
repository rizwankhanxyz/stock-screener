import React, { useState } from "react";
import Stock from "./Stock";
import Loader from "./Loader";

function Stocks({
  stocks,
  searchStocks,
  loading,
  setUsers,
  resetUsers,
  setLoading,
}) {
  const styles = {
    display: "grid",
    margin: "auto",
    gridGap: "1rem",
    padding: "auto",
  };
  const [query, setQuery] = useState("");
  const onChangehandler = (e) => {
    setQuery(e.target.value);
  };

  const filteredData = stocks.filter(
    (element) =>
      element.companyName.toLowerCase().includes(query.toLowerCase()) ||
      element.nseorbseSymbol.toLowerCase().includes(query.toLowerCase())
  );

  return (
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
      <div className="stocks-container" style={styles}>
        {loading && <Loader />}
        {filteredData.map((stock, index) => (
          <Stock key={index} stock={stock} />
        ))}
      </div>
    </div>
  );
}

export default Stocks;

//props is an input to a component
