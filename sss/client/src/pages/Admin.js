import React, { useState, useMemo } from "react";
import axios from "axios";
import "../styles/Admin.css";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { FixedSizeList as List } from "react-window"; // ✅ Virtualized Table

function Admin({ stocks, setAuth, setUserRole, loading }) {
  const [fileUpload, setFileUpload] = useState(null);
  const [query, setQuery] = useState("");
  const [complianceFilter, setComplianceFilter] = useState("All");
  const [exchangeFilter, setExchangeFilter] = useState("All");

  // ✅ Filter Data Efficiently using useMemo (Prevents re-renders)
  const filteredData = useMemo(() => {
    return stocks.filter((element) => {
      const matchesQuery =
        element.companyName.toLowerCase().includes(query.toLowerCase()) ||
        element.nseorbseSymbol.toLowerCase().includes(query.toLowerCase());

      const matchesCompliance =
        complianceFilter === "All" ||
        (complianceFilter === "Compliant" &&
          element.financialScreeningStatus === "PASS") ||
        (complianceFilter === "Non-Compliant" &&
          element.financialScreeningStatus === "FAIL");

      const matchesExchange =
        exchangeFilter === "All" ||
        (exchangeFilter === "NSE" && element.exchange === "NSE") ||
        (exchangeFilter === "BSE" && element.exchange === "BSE");

      return matchesQuery && matchesCompliance && matchesExchange;
    });
  }, [stocks, query, complianceFilter, exchangeFilter]);

  const handleFileChange = (e) => {
    let file = e.target.files[0];
    if (file && ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "text/csv", "application/vnd.ms-excel"].includes(file.type)) {
      setFileUpload(file);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!fileUpload) {
      alert("Invalid file type. Please upload .xlsx, .xls, or .csv file only.");
      return;
    }
    const formData = new FormData();
    formData.append("file", fileUpload);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/data/add",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      alert(response.data.success);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.error || "File upload failed.");
    }
  };

  return (
    <>
      <Navbar setAuth={setAuth} setUserRole={setUserRole} />
      {loading ? (
        <Loader />
      ) : (
        <div className="admin-container">
          {/* ✅ File Upload */}
          <div className="file-upload-container">
            <form onSubmit={handleUpload}>
              <input type="file" className="file-upload-input" onChange={handleFileChange} required />
              <button type="submit" className="file-upload-btn">Upload</button>
            </form>
          </div>

          {/* ✅ Search & Filters */}
          <div className="filters-wrapper">
            <input
              type="text"
              className="search-input"
              placeholder="Search by Stock Name or Symbol"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <select value={complianceFilter} onChange={(e) => setComplianceFilter(e.target.value)}>
              <option value="All">All</option>
              <option value="Compliant">Compliant</option>
              <option value="Non-Compliant">Non-Compliant</option>
            </select>
            <select value={exchangeFilter} onChange={(e) => setExchangeFilter(e.target.value)}>
              <option value="All">All</option>
              <option value="NSE">NSE</option>
              <option value="BSE">BSE</option>
            </select>
          </div>
          <div className="information">
            Showing {stocks.length} stocks.
          </div>
          {/* ✅ Table with Headers & Virtualized Rows */}
          <div className="table-container">
            <div className="table-header">
              <div className="table-cell">Company Name</div>
              <div className="table-cell">Symbol</div>
              <div className="table-cell">Exchange</div>
              <div className="table-cell">Business Compliance</div>
              <div className="table-cell">Debts Market Cap</div>
              <div className="table-cell">Debts-Market Compliance Status</div>
              <div className="table-cell">Interest-Bearing Securities</div>
              <div className="table-cell">Interest-Bearing Compliance Status</div>
              <div className="table-cell">Interest Income</div>
              <div className="table-cell">Interest-Income to Total Income Status</div>
              <div className="table-cell">Final Compliance</div>
            </div>

            {filteredData.length > 0 ? (
              <List
                height={500}
                itemCount={filteredData.length}
                itemSize={80}
                width="100%"
              >
                {({ index, style }) => {
                  const element = filteredData[index];
                  return (
                    <div className="table-row" style={style} key={index}>
                      <div className="table-cell">{element.companyName}</div>
                      <div className="table-cell">{element.nseorbseSymbol}</div>
                      <div className="table-cell">{element.exchange}</div>
                      <div className={`table-cell ${element.compliantStatusBusinessScreening}`}>
                        {element.compliantStatusBusinessScreening}
                      </div>
                      <div className="table-cell">{Math.floor(element.debtsMarketCap * 100) / 100}</div>
                      <div className={`table-cell ${element.compliantStatusDebts}`}>
                        {element.compliantStatusDebts}
                      </div>
                      <div className="table-cell">{Math.floor(element.interestBearingSecuritiesMarketCap * 100) / 100}</div>
                      <div className={`table-cell ${element.compliantStatusInterestBearing}`}>
                        {element.compliantStatusInterestBearing}
                      </div>
                      <div className="table-cell">{Math.floor(element.interestIncomeTotalIncome * 100) / 100}</div>
                      <div className={`table-cell ${element.compliantStatusInterestIncome}`}>
                        {element.compliantStatusInterestIncome}
                      </div>
                      <div className={`table-cell ${element.financialScreeningStatus}`}>
                        {element.financialScreeningStatus}
                      </div>
                    </div>
                  );
                }}
              </List>
            ) : (
              <div className="no-data">No Stock Found!</div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Admin;