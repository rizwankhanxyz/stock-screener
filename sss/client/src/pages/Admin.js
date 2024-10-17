import React, { useState } from 'react'
import axios from 'axios';

function Admin() {
  const [fileUpload, setFileUpload] = useState("");
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
        const {data}  = await axios.post(
          "http://localhost:5000/api/admin/add",
          formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            }
        }
        );
        alert("File uploaded and saved!");
        console.log(data);
        
      } catch (error) {
        console.log(error);
        alert("Error uploading file!");

      }
    }
  }

  return (
    <>
      <div className='stock-container' >
        <form onSubmit={onSubmitHandler}>
          <input onChange={onChangeHandler} name="" type="file" placeholder="select a file a upload" required />
          <button> Upload</button>
        </form>
      </div>
    </>
  )
}

export default Admin