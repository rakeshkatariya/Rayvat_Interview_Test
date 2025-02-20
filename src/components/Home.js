import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

const Home = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get("https://dummyjson.com/products").then(res => setProducts(res.data.products));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Products</h2>
      <div className="row">
        {products.map(product => (
          <div className="col-md-4" key={product.id}>

            <div className="card">
              <img src={product.thumbnail} className="card-img-top" alt={product.title} />

              <div className="card-body">
                <h5>{product.title}</h5>
                <p>${product.price}</p>

                <button className="btn btn-primary" onClick={() => dispatch(addToCart(product))}>
                  Add to Cart
                </button>
                
              </div>

            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

