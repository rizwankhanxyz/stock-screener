import React, { useState } from "react";
import "../styles/BasketItem.css";
import Stock from "./Stock";
import axios from "axios";

function BasketItem({ onClose, stocks }) {
  const [query, setQuery] = useState("");
  const [basketName, setBasketName] = useState("");
  const [basketDescription, setBasketDescription] = useState("");
  const [selectedStocks, setSelectedStocks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page for pagination
  const itemsPerPage = 15; // Number of items per page for pagination

  const onChangehandler = (e) => {
    setQuery(e.target.value);
  };

  const filteredData = stocks.filter((element) => {
    const matchesQuery =
      element.companyName.toLowerCase().includes(query.toLowerCase()) ||
      element.nseorbseSymbol.toLowerCase().includes(query.toLowerCase());
    return matchesQuery;
  });

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
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>
          <i className="bi bi-x"></i>
        </button>
        <center>
          <div className="input-bar">
            <input
              type="text"
              value={basketName}
              onChange={(e) => setBasketName(e.target.value)}
              placeholder="Enter Basket Name"
            />
            <input
              type="text"
              value={basketDescription}
              onChange={(e) => setBasketDescription(e.target.value)}
              placeholder="Enter Basket Description"
            />
            <button onClick={handleSubmit} className="submit-btn">
              Create Basket
            </button>
          </div>
        </center>
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
          {/* <h4>Select Stocks now to Add</h4> */}
          {currentData.map((stock, index) => (
            <Stock
              key={index}
              handleStockSelect={handleStockSelect}
              stock={stock}
            />
          ))}{" "}
        </div>
        {/* Pagination */}
        <div className="pagination">{renderPagination()}</div>
      </div>
    </div>
  );
}

export default BasketItem;
