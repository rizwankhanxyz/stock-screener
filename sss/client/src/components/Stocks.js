import React, { useState } from "react";
import Stock from "./Stock";
import Loader from "./Loader";
import "../styles/Stocks.css";

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
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const itemsPerPage = 15; // Number of items per page


  
  const handleStockSelect = (stockId) => {
  };

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

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPagination = () => {
    const pageButtons = [];
    const maxButtonsToShow = 5;

    if (totalPages < maxButtonsToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageButtons.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`pagination-btn ${currentPage === i ? "active" : ""}`}
          >
            {i}
          </button>
        );
      }
    } else {
      pageButtons.push(
        <button
          key="prev"
          onClick={() => handlePageChange(currentPage - 1)}
          className="pagination-btn"
          disabled={currentPage === 1}
        >
          {"<<"}
        </button>
      );

      if (currentPage > 2) {
        pageButtons.push(
          <button
            key="1"
            onClick={() => handlePageChange(1)}
            className="pagination-btn"
          >
            1
          </button>
        );
        if (currentPage > 3) {
          pageButtons.push(<span key="dots-left">...</span>);
        }
      }

      const startPage = Math.max(1, currentPage - 1);
      const endPage = Math.min(totalPages, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        pageButtons.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`pagination-btn ${currentPage === i ? "active" : ""}`}
          >
            {i}
          </button>
        );
      }

      if (currentPage < totalPages - 2) {
        if (currentPage < totalPages - 3) {
          pageButtons.push(<span key="dots-right">...</span>);
        }
        pageButtons.push(
          <button
            key={totalPages}
            onClick={() => handlePageChange(totalPages)}
            className="pagination-btn"
          >
            {totalPages}
          </button>
        );
      }

      pageButtons.push(
        <button
          key="next"
          onClick={() => handlePageChange(currentPage + 1)}
          className="pagination-btn"
          disabled={currentPage === totalPages}
        >
          {">>"}
        </button>
      );
    }

    return pageButtons;
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <center>
            <div className="search-container">
              <i className="bi bi-search"></i>
              <input
                type="text"
                className="form-control"
                placeholder="Search By Stock Name or NSE/BSE Symbol"
                onChange={onChangehandler}
                value={query}
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

          <div className="stocks-container" style={styles}>
            {currentData.map((stock, index) => (
              <Stock
                key={index}
                handleStockSelect={handleStockSelect}
                stock={stock}
              />
            ))}
          </div>
          {/* Pagination */}
          <div className="pagination">{renderPagination()}</div>
        </div>
      )}
    </>
  );
}

export default Stocks;

//props is an input to a component
