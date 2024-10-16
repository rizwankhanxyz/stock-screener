import React, { useState } from 'react'

function Admin() {
  const [fileUpload,setFileUpload] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');


  const onChangeHandler = (e)=>{  
    console.log(e.target.files[0].type);
    let fileTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','text/csv','application/vnd.ms-excel' ]
    if (fileTypes.includes(e.target.files[0].type)) {
    setFileUpload(e.target.files[0]);
    } else {
      console.log("select correct file type");
      
    }
  }
  const onSubmitHandler =(e)=>{
    e.preventDefault();
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