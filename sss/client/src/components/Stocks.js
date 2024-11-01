import React from "react";
import Stock from "./Stock";
import Loader from "./Loader";

function Stocks({
  stocks,
  searchStocks,
  loading,
  setUsers,
  resetUsers,
  setIsLoading,
}) {
  const styles = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", // Responsive grid
    gridGap: "1rem",
    margin: "auto",
    padding: "auto",
  };

  return (
    <div>
      {/* <Navbar setUsers={setUsers} searchUsers={searchUsers} setIsLoading={setIsLoading} resetUsers={resetUsers}></Navbar> */}
      <div className="stocks-container" style={styles}>
        {loading && <Loader />}
        {
          // u.map((ele)=><Useritems ui={ele}/>)
          stocks.map((stock, index) => (
            <Stock key={index} stock={stock} />
          ))
        }
      </div>
    </div>
  );
}

export default Stocks;

//props is an input to a component
