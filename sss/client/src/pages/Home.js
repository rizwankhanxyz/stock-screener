import React from "react";
import Navbar from "../components/Navbar";
import Stocks from "../components/Stocks";

function Home({ stocks, loading, setLoading, setUserRole, setAuth, setAlias, alias }) {
  return (
    <div>
      <Navbar
        setAuth={setAuth}
        setUserRole={setUserRole}
        loading={loading}
        setLoading={setLoading}
        setAlias={setAlias}
        alias={alias}
      />
      <Stocks stocks={stocks}/>
    </div>
  );
}

export default Home;
