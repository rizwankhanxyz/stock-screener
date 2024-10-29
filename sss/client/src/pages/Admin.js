import React, { useState,useEffect } from 'react'
import axios from 'axios';
import "../styles/Admin.css"

function Admin() {
  const [fileUpload, setFileUpload] = useState("");
  const [data, setData] = useState([]);
  // const [errorMessage, setErrorMessage] = useState('');

  const onChangeHandler = (e) => {
    let fileTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv', 'application/vnd.ms-excel']
    if (e.target.files[0] && fileTypes.includes(e.target.files[0].type)) {
      setFileUpload(e.target.files[0]);
    }
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!fileUpload) {
      console.log("Invalid file type. Please upload .xlsx, .xls, or .csv file only.");
      return;
    } else {
      const formData = new FormData();
      formData.append("file", fileUpload)
      try {
        const data = await axios.post(
          "http://localhost:5000/api/admin/add",
          formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        }
        );
        console.log(data);
        alert("File uploaded and saved!");
        
      } catch (error) {
        console.log(error);
        alert("Error uploading file!");

      }
    }
  }

useEffect(() => {
  const fetchData = async ()=>{
    try {
      const {data} = await axios.get("http://localhost:5000/api/admin/get");
      setData(data);
    } catch (error) {
      console.log(error.response.data.error)
    }
  }
  fetchData();
}, [])


  return (
    <>
      <div className='stock-container' >
      <div className='form-container' >
        <form onSubmit={onSubmitHandler}>
          <input onChange={onChangeHandler} type="file" placeholder="select a file a upload" required />
          <button> Upload</button>
        </form>
        </div>
      <div className='data-container'>
          {data.length > 0 ? (
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
                {data.map((element, index) => (
                  <tr key={index}>
                    <td>{element.companyName}</td>
                    <td>{element.nseorbseSymbol}</td>
                    <td>{element.exchange}</td>
                    <td>{element.debtsMarketCap}</td>
                    <td>{element.compliantStatusDebts}</td>
                    <td>{element.interestBearingSecuritiesMarketCap}</td>
                    <td>{element.compliantStatusInterestBearing}</td>
                    <td>{element.interestIncomeTotalIncome}</td>
                    <td>{element.compliantStatusInterestIncome}</td>
                    <td>{element.financialScreeningStatus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="no-tasks">
              No Data Added yet, add data to see it here.
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Admin