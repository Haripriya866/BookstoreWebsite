import { Component } from "react";
import CartContext from "../../context/CartContext";
import UserDetailsForm from "../UserDetailsForm";
import Header from "../Header";
import PaymentSuccessView from "../PaymentSuccessView";

import "./index.css";

class Checkout extends Component {
  state = {
    orderPlaced: false,
  };

  handlePlaceOrder = () => {
    this.setState({ orderPlaced: true }, () => {
      console.log(`order placed successfully`);
    });
  };

  renderCheckoutOrderSummary = () => (
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
          <div className="checkout-order-summary-container">
            <div className="checkout-inner-container">
              <h1 className="checkout-order-summary-heading">Order Summary</h1>
              <ul className="checkout-cart-item-display">
                {cartList.map((eachItem) => (
                  <li className="checkout-cart-item" key={eachItem.isbn13}>
                    <div className="checkout-order-summary-content">
                      <img
                        src={eachItem.image}
                        alt={eachItem.title}
                        className="checkout-eachitem-cart-img"
                      />
                      <p className="checkout-eachitem-cart-title">
                        {eachItem.title}
                      </p>
                    </div>

                    <p className="checkout-eachitem-cart-price">
                      {eachItem.price}
                    </p>
                  </li>
                ))}
              </ul>
              <hr className="checkout-horizontal-line" />
              <div className="checkout-total-price-container">
                <p className="checkout-total-para">Total</p>
                <p className="checkout-total-price">{total}</p>
              </div>
            </div>
          </div>
        );
      }}
    </CartContext.Consumer>
  );

  render() {
    const { orderPlaced } = this.state;
    if (orderPlaced) {
      return <PaymentSuccessView />;
    }
    return (
      <>
        <Header />
        <div className="checkout-container">
          <div className="user-details-and-order-summary-container">
            <div className="checkout-userDetails">
              <UserDetailsForm onPlaceOrder={this.handlePlaceOrder} />
            </div>

            {this.renderCheckoutOrderSummary()}
          </div>
        </div>
      </>
    );
  }
}
export default Checkout;
