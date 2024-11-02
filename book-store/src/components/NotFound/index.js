import { Component } from "react";
import { Link } from "react-router-dom";
import Header from "../Header";

import "./index.css";

class NotFound extends Component {
  render() {
    return (
      <>
        <Header />
        <div className="not-found-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/not-found-blog-img.png"
            alt="not found"
            className="not-found-img"
          />
          <p className="not-found-para">
            We are sorry, the page you requested could not be found. Please go
            back to the homepage
          </p>
          <Link to="/" className="nav-link">
            <button type="button" className="not-found-button">
              Home Page
            </button>
          </Link>
        </div>
      </>
    );
  }
}
export default NotFound;
