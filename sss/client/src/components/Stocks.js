import React, { useState, useEffect } from "react";
import Stock from "./Stock";
import Loader from "./Loader";
import axios from "axios";
import "../styles/Stocks.css";

function Stocks({ stocks, loading }) {
  const [query, setQuery] = useState("");
  const [complianceFilter, setComplianceFilter] = useState("All");
  const [exchangeFilter, setExchangeFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [wishlist, setWishlist] = useState(new Set());
  const [wishlistUpdated, setWishlistUpdated] = useState(false);

  const itemsPerPage = 10;

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/wishlist/customer/wishlist",
          { withCredentials: true }
        );
        const wishlistStocks = response.data.wishlist || [];
        setWishlist(new Set(wishlistStocks.map((item) => item._id))); // Store as Set for fast lookup
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    fetchWishlist();
  }, []);

  const handleWishlistToggle = async (stockId) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/wishlist/customer/wishlist/toggle",
        { stockId },
        { withCredentials: true }
      );

      setWishlist((prevWishlist) => {
        const newWishlist = new Set(prevWishlist); // Create a new Set to trigger re-render
        if (response.data.isWishlisted) {
          newWishlist.add(stockId);
        } else {
          newWishlist.delete(stockId);
        }
        return newWishlist;
      });

      // Force re-render to reflect changes immediately
      setWishlistUpdated((prev) => !prev);
    } catch (error) {
      console.error("Error updating wishlist:", error.response?.data?.error || error.message);
      alert(error.response?.data?.error || "Error updating wishlist.");
    }
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

    const matchesCompliance =
      complianceFilter === "All" ||
      (complianceFilter === "Compliant" && element.financialScreeningStatus === "PASS") ||
      (complianceFilter === "Non-Compliant" && element.financialScreeningStatus === "FAIL");

    const matchesExchange =
      exchangeFilter === "All" ||
      (exchangeFilter === "NSE" && element.exchange === "NSE") ||
      (exchangeFilter === "BSE" && element.exchange === "BSE");

    return matchesQuery && matchesCompliance && matchesExchange;
  });

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
        <>
          <div className="search-filter-container">
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
          </div>
          <div className="stocks-container-heading">
            <div className="stocks-symbol-heading">
              Stock Symbol
            </div>
            <div className="stocks-name-heading">
              Company Name
            </div>
            <div className="stocks-exchange-heading">
              Exchange
            </div>
            <div className="stocks-status-heading">
              Compliant Status
            </div>
            <div className="stocks-wishlist-heading">
              <i className="bi bi-plus-circle-dotted"></i> Wishlist
            </div>
          </div>

          <div className="stocks-container">
            {currentData.map((stock, index) => (
              <Stock
                parent="Stocks"
                key={stock._id} // Ensure key is unique to trigger re-render
                stock={stock}
                isWishlisted={wishlist.has(stock._id)}
                handleWishlistToggle={handleWishlistToggle}
              />
            ))}
          </div>
          {/* <div className="pagination">
            {[...Array(totalPages).keys()].map((page) => (
              <button key={page + 1} onClick={() => setCurrentPage(page + 1)}>
                {page + 1}
              </button>
            ))}
          </div> */}
          <div className="pagination">{renderPagination()}</div>
        </>
      )}
    </>
  );
}

export default Stocks;