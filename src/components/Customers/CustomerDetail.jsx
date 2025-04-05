import React from "react";

export default function CustomerDetail({ customer }) {
  return (
    <div className="card">
      <img src={customer.image} alt={customer.name} className="card-img-top" />
      <div className="card-body">
        <h5 className="card-title">{customer.name}</h5>
        <p className="card-text">Giá: ${customer.price}</p>
        <p className="card-text">{customer.description}</p>
      </div>
    </div>
  );
}
