import React, { useState, useEffect } from "react"
import axios from "axios"
import "./product.css"

export default function Product() {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    console.log("request to api");
    axios.get("http://127.0.0.1:5000/products")
      .then(response => setProduct(response.data))
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const resizeImg = (img, height, width) => {
    img.height = height;
    img.width = width;
  };

  const productList = product.map(p => (
    <li key={p.id} className="product-item">
      <div className="product-text">
        {p.id} {p.name}
        <img
        src={p.img}
        alt={p.name}
        onLoad={(e) => resizeImg(e.target, 300, 300)}
        className="product-image"
      />
      {p.price}
      </div>
    </li>
  ));

  return (
    <div>
      <div className = 'grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4'>
      {productList}
      </div>
    </div>
    
  );
}