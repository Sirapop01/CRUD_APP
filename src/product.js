import React, { useState, useEffect } from "react";
import axios from "axios";
import "./product.css";

export default function Product() {
  const [product, setProduct] = useState([]);
  const [newProduct, setNewProduct] = useState({
    _id: "",
    name: "",
    price: "",
    img: "",
  });

  useEffect(() => {
    console.log("request to api");
    axios
      .get("http://127.0.0.1:5000/products")
      .then((response) => setProduct(response.data))
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const resizeImg = (img, height, width) => {
    img.height = height;
    img.width = width;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };

  const handleAddProduct = () => {

    const parsedId = parseInt(newProduct._id, 10);
    const parsedPrice = parseInt(newProduct.price, 10);

    const productToAdd = {
      ...newProduct,
      _id: parsedId,
      price: parsedPrice,
    };

    axios
      .post("http://127.0.0.1:5000/products", productToAdd)
      .then((response) => {
        console.log("Product added successfully:", response.data);

        axios
          .get("http://127.0.0.1:5000/products")
          .then((response) => setProduct(response.data))
          .catch((error) => {
            console.error("Error fetching data:", error);
          });

        setNewProduct({
          _id: "",
          name: "",
          price: "",
          img: "",
        });
      })
      .catch((error) => {
        console.error("Error adding product:", error);
      });
  };

  const handleUpdateProduct = () => {

    if (!newProduct._id) {
      console.error("Please provide _id for updating the product.");
      return;
    }

    const parsedId = parseInt(newProduct._id, 10);
    const parsedPrice = parseInt(newProduct.price, 10);

    const productToUpdate = {
      ...newProduct,
      _id: parsedId,
      price: parsedPrice,
    };

    axios
      .put(`http://127.0.0.1:5000/products/${parsedId}`, productToUpdate)
      .then((response) => {
        console.log("Product updated successfully:", response.data);

        axios
          .get("http://127.0.0.1:5000/products")
          .then((response) => setProduct(response.data))
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
          
        setNewProduct({
          _id: "",
          name: "",
          price: "",
          img: "",
        });
      })
      .catch((error) => {
        console.error("Error updating product:", error);
      });
  };

  const handleDeleteProduct = () => {
    if (!newProduct._id) {
      console.error("Please provide _id for deleting the product.");
      return;
    }

    const parsedId = parseInt(newProduct._id, 10)
    axios
      .delete(`http://127.0.0.1:5000/products/${parsedId}`)
      .then((response) => {
        console.log("Product deleted successfully:", response.data);
        
        axios
          .get("http://127.0.0.1:5000/products")
          .then((response) => setProduct(response.data))
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
        
        setNewProduct({
          _id: "",
          name: "",
          price: "",
          img: "",
        });
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };

  const productList = product.map((p) => (
    <li key={p._id} className="product-item">
      <div className="product-text">
        {p._id} {p.name}
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
    <div className="container">
      <div className="add-container">
        <h1 className="text">Page Fix Stock</h1>
        <div>
          <h1 className="add-text">ID</h1>
          <input
            className="input"
            placeholder="...1"
            name="_id"
            value={newProduct._id}
            onChange={handleInputChange}
          ></input>
          <h1 className="add-text">Name </h1>
          <input
            className="input"
            placeholder="....Notebook"
            name="name"
            value={newProduct.name}
            onChange={handleInputChange}
          ></input>
          <h1 className="add-text">Price </h1>
          <input
            className="input"
            placeholder="....THB"
            name="price"
            value={newProduct.price}
            onChange={handleInputChange}
          ></input>
          <h1 className="add-text">Image </h1>
          <input
            className="input"
            placeholder="....img address"
            name="img"
            value={newProduct.img}
            onChange={handleInputChange}
          ></input>
          <div className="button-container">
            <button className="event-button" onClick={handleAddProduct}>
              Add
            </button>
            <button className="event-button" onClick={handleDeleteProduct}>
              Delete
            </button>
            <button className="event-button" onClick={handleUpdateProduct}>
              Update
            </button>
          </div>
        </div>
      </div>

      <ul className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4">{productList}</ul>
    </div>
  );
}
