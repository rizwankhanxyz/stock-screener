import React from "react";

function Alert({ alert }) {
  return (
    <>
      {alert != null && (
        <div>
          <p style={{ width: "50%" }} className={`alert-${alert.type}`}>
            <i className="bi bi-exclamation-circle-fill"></i> {alert.msg}
          </p>
        </div>
      )}
    </>
  );
}

export default Alert;
