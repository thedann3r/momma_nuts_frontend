import React, { useEffect, useState } from "react";
import "./AProduct.css";
import NewAProduct from "./NewAProduct";
import AProductList from "./AProductList";

const url = "http://127.0.0.1:5000";

function AProduct() {
    const [product, setProduct] = useState([]);
    const token = localStorage.getItem("access_token");

    useEffect(() => {
        if (!token) {
            console.error("No token found. User might not be logged in.");
            return;
        }

        fetch(`${url}/products`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error("Unauthorized or failed to fetch products");
            }
            return res.json();
        })
        .then((data) => {
            setProduct(Array.isArray(data) ? data : []);
        })
        .catch((err) => console.error("Error fetching products:", err));
    }, [token]);

    return (
        <>
            <h1 className="mainH">Products</h1>
            <NewAProduct products={product} setProducts={setProduct} />
            <AProductList products={product} setProducts={setProduct} />
        </>
    );
}

export default AProduct;
