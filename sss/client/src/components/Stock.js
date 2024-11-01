import React from "react";

function Stock({ stock }) {
  return (
    <div
      className="stock-container"
      style={{
        display: "flex",
        padding: "1.5rem",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <div
        className="card"
        style={{
          width: "12rem",
          backgroundColor: "rgba(0,0,0,.2)",
          borderRadius: "2.25rem",
        }}
      >
        {/* <img className="card-img-top" src={stock.avatar_url} alt="" style={{borderTopLeftRadius:"calc(2.25rem)", borderTopRightRadius:"calc(2.25rem)"}}></img> */}
        <div className="card-body" style={{ padding: "0.5rem" }}>
          <h5 className="card-title" style={{ color: "lightgrey" }}>
            {stock.nseorbseSymbol}
          </h5>
          <p>{stock.companyName}</p>
          <p>{stock.exchange}</p>
          <button> </button>
          <Link
            to={"#"}
            className="btn btn-dark"
            style={{
              backgroundColor: "rgba(0,0,0,.2)",
              color: "lightgrey",
              borderRadius: "1rem",
            }}
          >
            {stock.financialScreeningStatus}
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Stock;
