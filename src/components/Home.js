import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/ProductSlice";
import { addToCart } from "../redux/cartSlice"; 

const Home = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.products);
  
  useEffect(() => {
    dispatch(fetchProducts()); 
  }, [dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mt-4">
      <h2>Products</h2>
      <div className="row">
        {items.map((product) => (
          <div className="col-md-4" key={product.id}>
            <div className="card">
              <img
                src={product.thumbnail}
                className="card-img-top"
                alt={product.title}
              />
              <div className="card-body">
                <h5>{product.title}</h5>
                <p>${product.price}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => handleAddToCart(product)}
                >
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
