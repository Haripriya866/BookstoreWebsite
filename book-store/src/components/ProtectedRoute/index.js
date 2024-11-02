import { Redirect, Route } from "react-router-dom";

import CartContext from "../../context/CartContext";

const ProtectedRoute = (props) => (
  <CartContext.Consumer>
    {(value) => {
      const { cartList } = value;
      if (cartList.length === 0) {
        return <Redirect to="/cart" />;
      }
      return <Route {...props} />;
    }}
  </CartContext.Consumer>
);
export default ProtectedRoute;
