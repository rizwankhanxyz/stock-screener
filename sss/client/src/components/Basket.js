import React, { useState, useEffect } from "react";
import "../styles/Basket.css";
import axios from "axios";
import BasketItem from "./BasketItem";
import BasketStocks from "./BasketStocks";
import Loader from "./Loader";

function Basket({ loading, stocks }) {
  const [query, setQuery] = useState("");
  const [showBasket, setShowBasket] = useState(false);
  const [selectedBasket, setSelectedBasket] = useState(null); // Track the currently selected basket
  const [baskets, setBaskets] = useState([]);

  const onChangehandler = (e) => {
    setQuery(e.target.value);
  };

  const onClickOpenBasketStock = (basket) => {
    setSelectedBasket(basket);
    document.body.style.overflow = "hidden"; // Prevent background scroll
  };

  const onClickCloseBasketStock = () => {
    setSelectedBasket(null); // Clear the selected basket
    document.body.style.overflow = "auto"; // Re-enable background scroll
  };

  const onClickDeleteBasket = async (basketId) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:5000/api/baskets/customer/basket/${basketId}`,
        {
          withCredentials: true,
        }
      );
      if (data.success) {
        setBaskets(baskets.filter((basket) => basket._id !== basketId));
      }
    } catch (error) {
      console.log(error.response.data.error);
    }
  };

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
        console.log(error);
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
          <center>
            <button
              data-bs-toggle="popover"
              className="create-basket"
              onClick={openCreateBasket}
            >
              <i className="bi bi-plus-circle-dotted"></i> Create a new Basket
            </button>
            {showBasket && (
              <BasketItem
                onClose={closeCreateBasket}
                baskets={baskets}
                setBaskets={setBaskets}
                stocks={stocks}
              />
            )}

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
            {filteredData.map((element, index) => (
              <div className="basket-portion" key={index}>
                <div className="basket-portionleft">
                  <h3>{element.basketName}</h3>
                  <p>{element.basketDescription}</p>
                </div>
                <div className="basket-portionright">
                  <h6
                    className="basket-stocks"
                    onClick={() => onClickOpenBasketStock(element)}
                  >
                    See Stocks: {element.stockIds.length}
                  </h6>
                  <button
                    className="basket-delete"
                    onClick={() => onClickDeleteBasket(element._id)} // Change to a function reference
                  >
                    <i className="bi bi-trash3-fill"></i>
                  </button>
                </div>
              </div>
            ))}
          </center>

          {selectedBasket && (
            <BasketStocks
              basketName={selectedBasket.basketName}
              basketDescription={selectedBasket.basketDescription}
              stockIds={selectedBasket.stockIds} // Pass stockIds to BasketItem
              onClose={onClickCloseBasketStock}
            />
          )}
        </div>
      )}
    </>
  );
}

export default Basket;
