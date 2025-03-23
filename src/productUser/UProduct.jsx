import React, { useEffect, useState } from "react";
import './UProduct.css'
import UProductList from "./UProductList";

const url = "http://127.0.0.1:5000";

function UProduct() {
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
            <UProductList products={product} setProducts={setProduct} />
        </>
    );
}

export default UProduct;
