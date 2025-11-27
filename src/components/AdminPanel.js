import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

const AdminPanel = ({ products, setProducts }) => {
  const history = useHistory();
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    image: "",
    price: ""
  });
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (newProduct.name && newProduct.description && newProduct.image && newProduct.price) {
      const product = {
        id: Math.max(...products.map(p => p.id), 0) + 1,
        name: newProduct.name,
        description: newProduct.description,
        image: newProduct.image,
        price: parseFloat(newProduct.price)
      };
      setProducts([...products, product]);
      setNewProduct({ name: "", description: "", image: "", price: "" });
    }
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleEditClick = (product) => {
    setEditingId(product.id);
    setEditForm({ ...product });
  };

  const handleSaveEdit = () => {
    setProducts(products.map((p) => (p.id === editingId ? editForm : p)));
    setEditingId(null);
    setEditForm({});
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  return (
    <div className="container">
      <div className="header">
        <nav className="nav-links">
          <Link to="/">HOME</Link>
          <Link to="/admin">ADMIN</Link>
        </nav>
      </div>

      <div className="admin-section">
        <h2>Add New Product</h2>
        <form onSubmit={handleAddProduct} className="add-product-form">
          <input
            type="text"
            className="form-control"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Description"
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Image URL"
            value={newProduct.image}
            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
          />
          <input
            type="number"
            className="form-control"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          />
          <button type="submit">Add</button>
        </form>
      </div>

      <div className="admin-section">
        <h2>Manage Products ({products.length})</h2>
        <div className="products-list">
          {products.map((product) => (
            <div key={product.id} className="admin-product-item">
              {editingId === product.id ? (
                <div className="edit-form">
                  <input
                    type="text"
                    className="form-control"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  />
                  <input
                    type="text"
                    className="form-control"
                    value={editForm.description}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  />
                  <input
                    type="text"
                    className="form-control"
                    value={editForm.image}
                    onChange={(e) => setEditForm({ ...editForm, image: e.target.value })}
                  />
                  <input
                    type="number"
                    className="form-control"
                    value={editForm.price}
                    onChange={(e) => setEditForm({ ...editForm, price: parseFloat(e.target.value) })}
                  />
                  <div className="edit-buttons">
                    <button className="float-right" onClick={handleCancelEdit}>Cancel</button>
                    <button className="float-right" onClick={handleDeleteProduct.bind(null, product.id)}>Delete</button>
                    <button className="float-right" onClick={handleSaveEdit}>Save</button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="product-info">
                    <Link to={`/products/${product.id}`}>
                      <img src={product.image} alt={product.name} />
                    </Link>
                    <div>
                      <h3>{product.name}</h3>
                      <p>{product.description}</p>
                      <p className="price">${product.price}</p>
                    </div>
                  </div>
                  <div className="admin-actions">
                    <button className="float-right" onClick={() => handleEditClick(product)}>
                      Edit
                    </button>
                    <button className="float-right" onClick={() => handleDeleteProduct(product.id)}>
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
