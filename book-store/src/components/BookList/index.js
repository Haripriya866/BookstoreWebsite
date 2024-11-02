import { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "rc-slider/assets/index.css";

import Header from "../Header";
import BookItem from "../BookItem";
import BookSearch from "../BookSearch";
import Loader from "../Loader";
import ErrorMessage from "../ErrorMessage";
import Slider from "rc-slider";

import "./index.css";

const apiStatusConstant = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

const bookListApiUrl = "https://api.itbook.store/1.0/new";
const bookSearchApiUrl = (query) =>
  `https://api.itbook.store/1.0/search/${query}`;

class BookList extends Component {
  state = {
    booksData: [],
    apiStatus: apiStatusConstant.initial,
    minPrice: 0,
    maxPrice: 100,
    query: "",
  };

  componentDidMount() {
    this.getBookListData();
  }

  getBookListData = async () => {
    this.setState({
      apiStatus: apiStatusConstant.inProgress,
    });
    const { query } = this.state;
    const apiUrl = query ? bookSearchApiUrl(query) : bookListApiUrl;
    const response = await fetch(apiUrl);

    if (response.ok === true) {
      const data = await response.json();

      const formattedData = data.books.map((eachItem) => ({
        title: eachItem.title,
        subtitle: eachItem.subtitle,
        price: parseFloat(eachItem.price.replace("$", "")) || 0, 
        image: eachItem.image,
        url: eachItem.url,
        isbn13: eachItem.isbn13,
      }));

      this.setState({
        booksData: formattedData,
        apiStatus: apiStatusConstant.success,
      });
    } else {
      this.setState({
        apiStatus: apiStatusConstant.failure,
      });
    }
  };

  handleRangeChange = (value) => {
    const [minPrice, maxPrice] = value;
    this.setState({ minPrice, maxPrice });
  };

  renderRangeSlider = () => {
    const { minPrice, maxPrice } = this.state;
    return (
      <div className="range-filter-container">
        <h5>Filter by Price</h5>
        <Slider
          range
          min={0}
          max={100}
          value={[minPrice, maxPrice]}
          onChange={this.handleRangeChange}
          className="mb-4"
        />
        <div className="price-range">
          <span className="range-min">Min: ${minPrice}</span>
          <span className="range-max">Max: ${maxPrice}</span>
        </div>
      </div>
    );
  };

  renderSuccessView = () => {
    const { booksData, minPrice, maxPrice } = this.state;

    const filteredBooks = booksData.filter(
      (book) => book.price >= minPrice && book.price <= maxPrice
    );

    return (
      <>
        <div>
          <ul className="book-search-list-container">
            {filteredBooks.map((eachBook) => (
              <BookItem bookDetails={eachBook} key={eachBook.isbn13} />
            ))}
          </ul>
        </div>
      </>
    );
  };

  renderFailureView = () => <ErrorMessage />;

  renderLoadingView = () => (
    <div className="booksList-loader-container">
      <Loader />
    </div>
  );

  renderView = () => {
    const { apiStatus } = this.state;
    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.renderSuccessView();
      case apiStatusConstant.failure:
        return this.renderFailureView();
      case apiStatusConstant.inProgress:
        return this.renderLoadingView();
      default:
        return null;
    }
  };

  handleSearchChange = (query) => {
    this.setState({ query }, this.getBookListData); 
  };

  render() {
    const { query } = this.state;
    return (
      <>
        <Header />
        <div className="bookslist-container">
          <div className="book-search-container">
            <BookSearch query={query} onSearch={this.handleSearchChange} />
          </div>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h1 className="bookslist-main-heading ml-4 mb-4">Books</h1>
              </div>
            </div>
          </div>
          {this.renderRangeSlider()}
          {this.renderView()}
        </div>
      </>
    );
  }
}
export default BookList;
