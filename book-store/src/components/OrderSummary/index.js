import CartContext from "../../context/CartContext";
import { Link } from "react-router-dom";

import "./index.css";

const OrderSummary = () => (
  <CartContext.Consumer>
    {(value) => {
      const { cartList } = value;
      let total = 0;
      cartList.forEach((eachCartItem) => {
        let { price, quantity } = eachCartItem;
        price = parseFloat(price.replace(/[^0-9.]/g, ""));
        total += price * quantity;
      });
      return (
        <>
          <div className="order-summary">
            <h1 className="order-summary-heading">Order Summary</h1>
            <div className="price-content">
              <p className="amount-payable-para">
                Amount Payable
                <br />
                <span className="order-summary-inclusive-taxes">
                  (inclusive of all taxes)
                </span>
              </p>
              <p className="order-summary-total-price">{total}</p>
            </div>
            <Link to="/checkout">
              <button type="button" className="order-summary-button">
                Proceed
              </button>
            </Link>
          </div>
        </>
      );
    }}
  </CartContext.Consumer>
);
export default OrderSummary;
