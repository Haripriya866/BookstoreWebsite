import CartContext from "../../context/CartContext";
import { BsPlusSquare, BsDashSquare } from "react-icons/bs";
import { RiDeleteBin6Fill } from "react-icons/ri";

import "./index.css";

const CartItem = (props) => (
  <CartContext.Consumer>
    {(value) => {
      const {
        removeCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
      } = value;
      const { cartItemDetails } = props;
      let { image, title, price, isbn13, quantity } = cartItemDetails;
      price = parseFloat(price.replace(/[^0-9.]/g, ""));

      const onClickDecrement = () => {
        decrementCartItemQuantity(isbn13);
      };
      const onClickIncrement = () => {
        incrementCartItemQuantity(isbn13);
      };
      const onRemoveCartItem = () => {
        removeCartItem(isbn13);
      };

      return (
        <>
          <li className="cart-item-container">
            <div className="cart-item">
              <div className="cart-item-content">
                <div className="left-content">
                  <img src={image} alt={image} className="cart-item-img" />
                  <p className="cart-item-title">{title}</p>
                  <div className="cart-quantity-container">
                    <button
                      type="button"
                      className="quantity-controller-button"
                      data-testid="minus"
                      onClick={onClickDecrement}
                    >
                      <BsDashSquare color="#52606D" size={12} />
                    </button>
                    <p className="cart-quantity">{quantity}</p>
                    <button
                      type="button"
                      className="quantity-controller-button"
                      data-testid="plus"
                      onClick={onClickIncrement}
                    >
                      <BsPlusSquare color="#52606D" size={12} />
                    </button>
                  </div>
                  <p className="cart-item-price">{price}</p>
                </div>
                <div className="right-content">
                  <button
                    type="button"
                    className="delete-button"
                    onClick={onRemoveCartItem}
                  >
                    <RiDeleteBin6Fill className="delete-icon" />
                  </button>
                </div>
              </div>
            </div>
          </li>
        </>
      );
    }}
  </CartContext.Consumer>
);

export default CartItem;
