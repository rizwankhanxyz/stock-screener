import React, { useState, useEffect } from "react";
import "../styles/Basket.css";
import axios from "axios";
import BasketItem from "./BasketItem";
import Loader from "./Loader";

function Basket({ loading, stocks }) {
  const [query, setQuery] = useState("");
  const [showBasket, setShowBasket] = useState(false);
  const [baskets, setBaskets] = useState([]);

  const onChangehandler = (e) => {
    setQuery(e.target.value);
  };

  const onClickOpenBasketStock = (e) => {

  }
  //start from here tomorrow basket.js

  useEffect(() => {
    const getBaskets = async () => {
      // setLoading(true);
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/baskets/customer/basket/get",
          {
            withCredentials: true,
          }
        );
        setBaskets(data.basketItems);
      } catch (error) {
        console.log(error.response.data.error);
      }
      //  finally {
      //   setTimeout(() => setLoading(false), 2000);
      // }
    };
    getBaskets();
  }, []);

  const filteredData = baskets.filter((element) => {
    const matchesQuery =
      element.basketName.toLowerCase().includes(query.toLowerCase()) ||
      element.basketDescription.toLowerCase().includes(query.toLowerCase());

    return matchesQuery;
  });

  // Function to handle click and show ComplianceReport component
  const openCreateBasket = (e) => {
    e.preventDefault();
    setShowBasket(true); // Set to true to show ComplianceReport
    document.body.style.overflow = "hidden"; // Prevent background scroll
  };
  // Function to close the ComplianceReport component
  const closeCreateBasket = () => {
    setShowBasket(false); // Set to false to hide ComplianceReport
    document.body.style.overflow = "auto"; // Re-enable background scroll
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <button
            data-bs-toggle="popover"
            className="create-basket"
            onClick={openCreateBasket}
          >
            Create a new Basket
          </button>
          {showBasket && (
            <BasketItem onClose={closeCreateBasket} stocks={stocks} />
          )}

          <center>
            <div
              className="search-container"
              style={{ padding: "1rem", width: "100%", maxWidth: "530px" }}
            >
              <input
                type="text"
                className="form-control"
                placeholder="Search By Basket Name or Description"
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

            <div>
              {filteredData.map((element, index) => (
                <div onClick={onClickOpenBasketStock} key={index}>
                  <h3>{element.basketName}</h3>
                  <h6>Stock Qty: {element.stockIds.length}</h6>
                  <h7>{element.basketDescription}</h7>
                  {/* <h4>
                  {element.stockIds.map(
                    (childelement) => childelement.companyName
                  )}
                </h4> */}
                </div>
              ))}
            </div>
          </center>
        </div>
      )}
    </>
  );
}

export default Basket;
