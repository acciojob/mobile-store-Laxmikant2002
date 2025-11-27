import React from "react";
import { useParams, useHistory, Link } from "react-router-dom";

const ProductDetails = ({ products }) => {
  const { id } = useParams();
  const history = useHistory();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="container">
        <h2>Product not found</h2>
        <button className="btn" onClick={() => history.push("/")}>
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="header">
        <nav className="nav-links">
          <Link to="/">HOME</Link>
          <Link to="/admin">ADMIN</Link>
        </nav>
      </div>

      <div className="product-details">
        <img src={product.image} alt={product.name} />
        <div className="details-content">
          <h2>{product.name}</h2>
          <p className="price">Price: {product.price} Rs</p>
          <p className="desc-label">Desc:</p>
          <p className="description">{product.description}</p>
          <button className="btn" onClick={() => history.push("/")}>
            Other products
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
