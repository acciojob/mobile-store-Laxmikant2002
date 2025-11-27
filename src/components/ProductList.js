import React from "react";
import { Link } from "react-router-dom";

const ProductList = ({ products }) => {
  return (
    <div className="container">
      <div className="header">
        <nav className="nav-links">
          <Link to="/">HOME</Link>
          <Link to="/admin">ADMIN</Link>
        </nav>
      </div>
      
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <Link to={`/products/${product.id}`}>
              <img src={product.image} alt={product.name} />
            </Link>
            <div className="product-info-card">
              <Link to={`/products/${product.id}`}>
                <h3>{product.name}</h3>
              </Link>
              <p className="price">Price: {product.price}</p>
              <button className="btn-buy">Buy</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
