import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Stocks from "../components/Stocks";
import Funds from "../components/Funds";
import Basket from "../components/Basket";
import "../styles/Home.css";

function Home({ stocks, loading, setUserRole, setAuth, setAlias, alias }) {
  const [activeTab, setActiveTab] = useState("Stocks");

  return (
    <>
      <Navbar
        setAuth={setAuth}
        setUserRole={setUserRole}
        setAlias={setAlias}
        alias={alias}
      />

      {/* Tab Navigation */}
      <div className="tab-container">
        <div
          className={activeTab === "Stocks" ? "tab active-tab" : "tab"}
          onClick={() => setActiveTab("Stocks")}
        >
          Screened Stocks
        </div>
        <div
          className={activeTab === "Funds" ? "tab active-tab" : "tab"}
          onClick={() => setActiveTab("Funds")}
        >
          Funds
        </div>
        <div
          className={activeTab === "Basket" ? "tab active-tab" : "tab"}
          onClick={() => setActiveTab("Basket")}
        >
          Basket
        </div>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === "Stocks" && <Stocks loading={loading} stocks={stocks} />}
        {activeTab === "Funds" && <Funds loading={loading} />}
        {activeTab === "Basket" && <Basket loading={loading} stocks={stocks} />}
      </div>

    </>
  );
}

export default Home;
