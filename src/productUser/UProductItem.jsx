import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function UProductItem({ id, name, image, description, price, stock }) { 
  return (
    <div className="product-card">
      <img className="product-image" src={image} alt={name} />
      <div className="product-info">
        <h2 className="product-name">{name}</h2>
        <p className="product-description">{description}</p>
        <h3 className="product-price">Price: ${price}</h3>
        <h3 className="product-stock">Stock: {stock} available</h3>
        <div className="product-buttons">
          <Link to={`/productDetails/${id}`}>
            <button className="view-details-btn">View Details</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UProductItem;
