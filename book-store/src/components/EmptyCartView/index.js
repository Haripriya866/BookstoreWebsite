import { Link } from "react-router-dom";

import "./index.css";

const EmptyCartView = () => (
  <div className="empty-cart-container">
    <h1 className="empty-cart-heading">You Have No Items In Your Cart</h1>
    <Link to="/books">
      <button type="button" className="empty-cart-button">
        Continue Shopping
      </button>
    </Link>
  </div>
);
export default EmptyCartView;
