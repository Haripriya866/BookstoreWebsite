import { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { FaHome, FaBook, FaShoppingBag } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import Cookies from "js-cookie";

import CartContext from "../../context/CartContext";

import "./index.css";

class Header extends Component {
  onClickLogout = () => {
    const { history } = this.props;
    Cookies.remove("jwt_token");
    history.replace("/login");
  };
  renderCartItemsCount = () => (
    <CartContext.Consumer>
      {(value) => {
        const { cartList } = value;
        const cartListCount = cartList.length;
        return (
          <>
            {cartListCount > 0 ? (
              <span className="cart-list-count">{cartListCount}</span>
            ) : null}
          </>
        );
      }}
    </CartContext.Consumer>
  );
  render() {
    return (
      <nav className="header-container">
        <div className="header-content-container">
          <Link to="/" className="nav-link">
            <div className="logo-container">
              <div className="logo">B</div>BOOKSTORE
            </div>
          </Link>

          <ul className="nav-items-container">
            <Link className="nav-link" to="/">
              <li className="icon-container">
                <FaHome className="icon" />
                <span className="icon-name">Home</span>
              </li>
            </Link>
            <Link className="nav-link" to="/books">
              <li className="icon-container">
                <FaBook className="icon" />
                <span className="icon-name">Book List</span>
              </li>
            </Link>
            <Link className="nav-link" to="/cart">
              <li className="icon-container">
                <FaShoppingBag className="icon" />

                <span className="icon-name">Cart</span>
                {this.renderCartItemsCount()}
              </li>
            </Link>
          </ul>
          <button
            type="button"
            className="logout-desktop-btn"
            onClick={this.onClickLogout}
          >
            <IoLogOut className="icon" />
            <span className="icon-name">Logout</span>
          </button>
        </div>
      </nav>
    );
  }
}
export default withRouter(Header);
