
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProductList from "./ProductList";
import ProductDetails from "./ProductDetails";
import AdminPanel from "./AdminPanel";
import { initialProducts } from "../data/products";
import './../styles/App.css';

const App = () => {
  const [products, setProducts] = useState(initialProducts);

  return (
    <Router>
      <div>
        {/* Do not remove the main div */}
        <Switch>
          <Route exact path="/">
            <ProductList products={products} />
          </Route>
          <Route path="/products/:id">
            <ProductDetails products={products} />
          </Route>
          <Route path="/admin">
            <AdminPanel products={products} setProducts={setProducts} />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
