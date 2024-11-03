import React, { useState } from "react";
import Stock from "./Stock";
import Loader from "./Loader";

function Stocks({ stocks, loading }) {
  const styles = {
    display: "grid",
    margin: "auto",
    // gridGap: "1rem",
    padding: "auto",
  };
  const [query, setQuery] = useState("");
  const [complianceFilter, setComplianceFilter] = useState("All");
  const [exchangeFilter, setExchangeFilter] = useState("All");
  const onChangehandler = (e) => {
    setQuery(e.target.value);
  };

  const handleComplianceFilterChange = (e) => {
    setComplianceFilter(e.target.value);
  };

  const handleExchangeFilterChange = (e) => {
    setExchangeFilter(e.target.value);
  };
  const filteredData = stocks.filter((element) => {
    const matchesQuery =
      element.companyName.toLowerCase().includes(query.toLowerCase()) ||
      element.nseorbseSymbol.toLowerCase().includes(query.toLowerCase());

    // Filter by compliance status
    const matchesCompliance =
      complianceFilter === "All" ||
      (complianceFilter === "Compliant" &&
        element.financialScreeningStatus === "PASS") ||
      (complianceFilter === "Non-Compliant" &&
        element.financialScreeningStatus === "FAIL");

    // Filter by exchange
    const matchesExchange =
      exchangeFilter === "All" ||
      (exchangeFilter === "NSE" && element.exchange === "NSE") ||
      (exchangeFilter === "BSE" && element.exchange === "BSE");

    return matchesQuery && matchesCompliance && matchesExchange;
  });

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
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

          <div className="filter-container">
            <select
              className="filter-select"
              value={complianceFilter}
              onChange={handleComplianceFilterChange}
            >
              <option value="All">All</option>
              <option value="Compliant">Compliant</option>
              <option value="Non-Compliant">Non-Compliant</option>
            </select>
            <select
              className="filter-select"
              value={exchangeFilter}
              onChange={handleExchangeFilterChange}
            >
              <option value="All">All</option>
              <option value="NSE">NSE</option>
              <option value="BSE">BSE</option>
            </select>
          </div>
          {loading ? (
            <Loader />
          ) : (
            <div className="stocks-container" style={styles}>
              {filteredData.map((stock, index) => (
                <Stock key={index} stock={stock} />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Stocks;

//props is an input to a component
