import React from "react";
import Navbar from "../components/Navbar";

function Home({loading,setLoading,setUserRole,setAuth,setAlias,alias}) {

  console.log(alias);
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
    </div>
  );
}

export default Home;
