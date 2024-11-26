import { Component } from "react";
import { BsPlusSquare, BsDashSquare } from "react-icons/bs";

import Loader from "../Loader";
import Header from "../Header";
import ErrorMessage from "../ErrorMessage";
import CartContext from "../../context/CartContext";

import "./index.css";

const apiStatusConstant = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

class BookDetails extends Component {
  state = {
    bookDetailsData: {},
    apiStatus: apiStatusConstant.initial,
    quantity: 1,
  };

  componentDidMount() {
    this.getBookDetailsData();
  }

  getBookDetailsData = async () => {
    try {
      const { match } = this.props;
      const { params } = match;
      const { isbn13 } = params;
      const response = await fetch(
        `https://api.itbook.store/1.0/books/${isbn13}`
      );
      if (response.ok === true) {
        const data = await response.json();
        const updatedData = {
          title: data.title,
          subtitle: data.subtitle,
          image: data.image,
          price: data.price,
          isbn13: data.isbn13,
          description: data.desc,
        };
        this.setState({
          bookDetailsData: updatedData,
          apiStatus: apiStatusConstant.success,
        });
      } else {
        this.setState({
          apiStatus: apiStatusConstant.failure,
        });
      }
    } catch (error) {
      console.error("Failed to fetch book details:", error);
      this.setState({
        apiStatus: apiStatusConstant.failure,
      });
    }
  };

  onDecrementQuantity = () => {
    const { quantity } = this.state;
    if (quantity > 1) {
      this.setState((prevState) => ({ quantity: prevState.quantity - 1 }));
    }
  };

  onIncrementQuantity = () => {
    this.setState((prevState) => ({ quantity: prevState.quantity + 1 }));
  };

  renderBookDetailsSuccessView = () => (
    <CartContext.Consumer>
      {(value) => {
        const { addCartItem } = value;
        const { bookDetailsData, quantity } = this.state;

        const { title, subtitle, image, price, description } = bookDetailsData;

        const onClickAddToCart = () => {
          addCartItem({ ...bookDetailsData, quantity });
        };

        return (
          <>
            <div className="book-detail-view-container">
              <div className="book-details-info">
                <img src={image} alt={image} className="book-details-img" />
                <div className="book-details-content">
                  <h1 className="book-details-title">{title}</h1>
                  <p className="book-details-subtitle">{subtitle}</p>
                  <p className="book-details-price">{price}</p>

                  <hr className="short-horizontal-line" />
                  <div className="quantity-container">
                    <button
                      type="button"
                      className="quantity-controller-button"
                      onClick={this.onDecrementQuantity}
                      data-testid="minus"
                    >
                      <BsDashSquare className="quantity-controller-icon" />
                    </button>
                    <p className="quantity">{quantity}</p>
                    <button
                      type="button"
                      className="quantity-controller-button"
                      onClick={this.onIncrementQuantity}
                      data-testid="plus"
                    >
                      <BsPlusSquare className="quantity-controller-icon" />
                    </button>
                  </div>

                  <button
                    type="button"
                    className="book-details-add-to-cart-button"
                    onClick={onClickAddToCart}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
              <hr className="horizontal-line" />
              <div className="description-container">
                <h1 className="description-heading">Product Description</h1>
                <p className="book-details-description">{description}</p>
              </div>
            </div>
          </>
        );
      }}
    </CartContext.Consumer>
  );

  renderLoadingView = () => (
    <div className="bookDetails-loader-container">
      <Loader />
    </div>
  );

  renderFailureView = () => <ErrorMessage />;

  renderView = () => {
    const { apiStatus } = this.state;
    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.renderBookDetailsSuccessView();
      case apiStatusConstant.failure:
        return this.renderFailureView();
      case apiStatusConstant.inProgress:
        return this.renderLoadingView();
      default:
        return null;
    }
  };

  render() {
    return (
      <>
        <Header />
        <div className="book-details-container">{this.renderView()}</div>
      </>
    );
  }
}
export default BookDetails;
