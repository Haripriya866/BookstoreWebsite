import Header from "../Header";

import EmptyCartView from "../EmptyCartView";
import CartContext from "../../context/CartContext";

import "./index.css";
import CartListView from "../CartListView";
import OrderSummary from "../OrderSummary";

const Cart = () => (
  <CartContext.Consumer>
    {(value) => {
      const { cartList, removeAllCartItems } = value;
      const showEmptyView = cartList.length === 0;
      const onClickRemoveAllBtn = () => {
        removeAllCartItems();
      };

      return (
        <>
          <Header />
          <div className="cart-container">
            <div className="top-container">
              <h1 className="cart-heading">My Bag</h1>
              <div>
                <button
                  type="button"
                  className="remove-all-btn"
                  onClick={onClickRemoveAllBtn}
                >
                  Remove All
                </button>
              </div>
            </div>
            <div className="inner-container">
              <div className="left-container">
                {showEmptyView ? (
                  <EmptyCartView />
                ) : (
                  <div className="cart-list-container">
                    <CartListView />
                  </div>
                )}
              </div>
              <div className="right-container">
                {cartList.length !== 0 && <OrderSummary />}
              </div>
            </div>
          </div>
        </>
      );
    }}
  </CartContext.Consumer>
);
export default Cart;
