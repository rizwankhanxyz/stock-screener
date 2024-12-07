import React, { useState } from "react";
import axios from "axios";
import "../styles/Admin.css";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";

function Admin({ stocks, setAuth, setUserRole, loading }) {
  const [fileUpload, setFileUpload] = useState("");
  const [query, setQuery] = useState("");
  const [complianceFilter, setComplianceFilter] = useState("All");
  const [exchangeFilter, setExchangeFilter] = useState("All");

  const handleComplianceFilterChange = (e) => {
    setComplianceFilter(e.target.value);
  };

  const handleExchangeFilterChange = (e) => {
    setExchangeFilter(e.target.value);
  };

  const onChangehandler = (e) => {
    setQuery(e.target.value);
  };

  const onChangeHandler = (e) => {
    let fileTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
      "application/vnd.ms-excel",
    ];
    if (e.target.files[0] && fileTypes.includes(e.target.files[0].type)) {
      setFileUpload(e.target.files[0]);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!fileUpload) {
      alert("Invalid file type. Please upload .xlsx, .xls, or .csv file only.");
      return;
    } else {
      const formData = new FormData();
      formData.append("file", fileUpload);
      try {
        const data = await axios.post(
          "http://localhost:5000/api/admin/data/add",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          }
        );
        // alert(data.success);
        alert(data.data.success);
      } catch (error) {
        console.log(error);
        alert(error.response.data.error);
      }
    }
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
      <Navbar setAuth={setAuth} setUserRole={setUserRole} />
      {loading ? (
        <Loader />
      ) : (
        <div className="stockstable-container">
          <div className="form-container">
            <form onSubmit={onSubmitHandler}>
              <input
                onChange={onChangeHandler}
                type="file"
                placeholder="select a file to upload"
                required
              />
              <button type="submit" className="signupbtn">
                {" "}
                Upload
              </button>
            </form>
          </div>
          <center>
            <div className="search-container">
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
          <div className="data-container">
            {filteredData.length > 0 ? (
              <table style={{ justifyContent: "space-around" }}>
                <thead>
                  <tr>
                    <th>Company name</th>
                    <th>NSE Symbol/BSE Scrip ID</th>
                    <th>Exchange</th>
                    <th>Compliant Status(Business Screening)</th>
                    <th>Debts/Market Cap Ratio</th>
                    <th>Compliant Status(Debts/Market Cap)</th>
                    <th>Interest-Bearing Securities/ Market Cap Ratio</th>
                    <th>
                      Compliant Status(Interest-Bearing Securities/ Market Cap)
                    </th>
                    <th>Interest Income/Total Income Ratio</th>
                    <th>Compliant Status(Interest-Income/Total Income)</th>
                    <th>Final Compliant Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((element, index) => (
                    <tr key={index}>
                      <td>{element.companyName}</td>
                      <td>{element.nseorbseSymbol}</td>
                      <td>{element.exchange}</td>
                      <td
                        data-status={element.compliantStatusBusinessScreening}
                      >
                        {element.compliantStatusBusinessScreening}
                      </td>
                      <td>{element.debtsMarketCap}</td>
                      <td data-status={element.compliantStatusDebts}>
                        {element.compliantStatusDebts}
                      </td>
                      <td>{element.interestBearingSecuritiesMarketCap}</td>
                      <td data-status={element.compliantStatusInterestBearing}>
                        {element.compliantStatusInterestBearing}
                      </td>
                      <td>{element.interestIncomeTotalIncome}</td>
                      <td data-status={element.compliantStatusInterestIncome}>
                        {element.compliantStatusInterestIncome}
                      </td>
                      <td data-status={element.financialScreeningStatus}>
                        {element.financialScreeningStatus}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="no-tasks">No Stock Found!</div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Admin;
