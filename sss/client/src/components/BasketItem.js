import React from "react";
import "../styles/BasketItem.css";

function BasketItem({onClose, stocks}) {
  return (
    <>
      <div className="">BasketItem
      <button className="" onClick={onClose}>
            <i className="bi bi-x"></i>
          </button>
      </div>
    </>
  );
}

export default BasketItem;
