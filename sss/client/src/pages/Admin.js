import React, { useState, useEffect } from 'react'
import axios from 'axios';
import "../styles/Admin.css"
import Loader from '../components/Loader';
import Navbar from '../components/Navbar';

function Admin({ setLoading, loading }) {
  const [fileUpload, setFileUpload] = useState("");
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");

  const onChangehandler = (e) => {
    setQuery(e.target.value);
  }

  const onChangeHandler = (e) => {
    let fileTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv', 'application/vnd.ms-excel']
    if (e.target.files[0] && fileTypes.includes(e.target.files[0].type)) {
      setFileUpload(e.target.files[0]);
    }
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!fileUpload) {
      alert("Invalid file type. Please upload .xlsx, .xls, or .csv file only.");
      return;
    } else {
      const formData = new FormData();
      formData.append("file", fileUpload)
      try {
        const data = await axios.post(
          "http://localhost:5000/api/admin/data/add",
          formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        }
        );
        alert(data.success);
      } catch (error) {
        alert(error.response.data.error);
      }
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("http://localhost:5000/api/admin/data/get");
        setData(data);
      } catch (error) {
        console.log(error.response.data.error)
      } finally {
        setTimeout(() => setLoading(false), 2000);
      }
    }
    fetchData();
  }, [])

  const filteredData = data.filter(
    (element) =>
      element.companyName.toLowerCase().includes(query.toLowerCase()) ||
      element.nseorbseSymbol.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      {loading ? (
        <Loader /> // Show loader while data is loading
      ) : (
        <div className='stock-container' >
          <Navbar/>
          <div className='form-container' >
            <form onSubmit={onSubmitHandler}>
              <input onChange={onChangeHandler} type="file" placeholder="select a file a upload" required />
              <button> Upload</button>
            </form>
          </div>
          <center>
            <div
              className="search-container"
              style={{ padding: "1rem", width: "50%" }}
            >
              <input
                type="text"
                className="form-control"
                placeholder="Search By Stock Name or NSE/BSE Symbol"
                onChange={onChangehandler}
                value={query}
                style={{ borderRadius: "1rem", padding: "0.8rem" }}
                required
              />
            </div>
          </center>
          <div className='data-container'>
            {filteredData.length > 0 ? (
              <table style={{ justifyContent: "space-around" }}>
                <thead>
                  <tr>
                    <th>Company name</th>
                    <th>NSE Symbol/BSE Scrip ID</th>
                    <th>Exchange</th>
                    <th>Debts/Market Cap Ratio</th>
                    <th>Compliant Status (Debts/Market Cap)</th>
                    <th>Interest-Bearing Securities/ Market Cap Ratio</th>
                    <th>Compliant Status(Interest-Bearing Securities/ Market Cap)</th>
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
                      <td>{element.debtsMarketCap}</td>
                      <td data-status={element.compliantStatusDebts}>{element.compliantStatusDebts}</td>
                      <td>{element.interestBearingSecuritiesMarketCap}</td>
                      <td data-status={element.compliantStatusInterestBearing}>{element.compliantStatusInterestBearing}</td>
                      <td>{element.interestIncomeTotalIncome}</td>
                      <td data-status={element.compliantStatusInterestIncome}>{element.compliantStatusInterestIncome}</td>
                      <td data-status={element.financialScreeningStatus}>{element.financialScreeningStatus}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="no-tasks">
                No Stock Found!
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default Admin