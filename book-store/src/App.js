import { Component } from "react";
import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom";

import Home from "./components/Home";
import BookList from "./components/BookList";
import BookDetails from "./components/BookDetails";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import NotFound from "./components/NotFound";
import CartContext from "./context/CartContext";

import ProtectedRoute from "./components/ProtectedRoute";

import "./App.css";

class App extends Component {
  state = { cartList: [] };

  removeAllCartItems = () => {
    this.setState({ cartList: [] });
  };

  removeCartItem = (isbn13) => {
    const { cartList } = this.state;
    const updatedCartList = cartList.filter(
      (eachCartItem) => eachCartItem.isbn13 !== isbn13
    );

    this.setState({ cartList: updatedCartList });
  };

  incrementCartItemQuantity = (isbn13) => {
    this.setState((prevState) => ({
      cartList: prevState.cartList.map((eachCartItem) => {
        if (isbn13 === eachCartItem.isbn13) {
          const updatedQuantity = eachCartItem.quantity + 1;
          return { ...eachCartItem, quantity: updatedQuantity };
        }
        return eachCartItem;
      }),
    }));
  };

  decrementCartItemQuantity = (isbn13) => {
    const { cartList } = this.state;
    const productObject = cartList.find(
      (eachCartItem) => eachCartItem.isbn13 === isbn13
    );
    if (productObject.quantity > 1) {
      this.setState((prevState) => ({
        cartList: prevState.cartList.map((eachCartItem) => {
          if (isbn13 === eachCartItem.isbn13) {
            const updatedQuantity = eachCartItem.quantity - 1;
            return { ...eachCartItem, quantity: updatedQuantity };
          }
          return eachCartItem;
        }),
      }));
    } else {
      this.removeCartItem(isbn13);
    }
  };

  addCartItem = (product) => {
    const { cartList } = this.state;
    const productObject = cartList.find(
      (eachCartItem) => eachCartItem.isbn13 === product.isbn13
    );

    if (productObject) {
      this.setState((prevState) => ({
        cartList: prevState.cartList.map((eachCartItem) => {
          if (productObject.isbn13 === eachCartItem.isbn13) {
            const updatedQuantity = eachCartItem.quantity + product.quantity;

            return { ...eachCartItem, quantity: updatedQuantity };
          }

          return eachCartItem;
        }),
      }));
    } else {
      const updatedCartList = [...cartList, product];

      this.setState({ cartList: updatedCartList });
    }
  };

  render() {
    const { cartList } = this.state;
    return (
      <BrowserRouter>
        <CartContext.Provider
          value={{
            cartList,
            addCartItem: this.addCartItem,
            removeCartItem: this.removeCartItem,
            removeAllCartItems: this.removeAllCartItems,
            incrementCartItemQuantity: this.incrementCartItemQuantity,
            decrementCartItemQuantity: this.decrementCartItemQuantity,
          }}
        >
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/books" component={BookList} />
            <Route exact path="/books/:isbn13" component={BookDetails} />
            <Route exact path="/cart" component={Cart} />
            <ProtectedRoute exact path="/checkout" component={Checkout} />
            <Route exact path="/not-found" component={NotFound} />
            <Redirect to="/not-found" />
          </Switch>
        </CartContext.Provider>
      </BrowserRouter>
    );
  }
}

export default App;
