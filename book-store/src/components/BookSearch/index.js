import { Component } from "react";
import { IoSearchSharp } from "react-icons/io5";

import "./index.css";

class BookSearch extends Component {

  handleChange = (event) => {
    const { onSearch } = this.props;
    onSearch(event.target.value);
  };

  render() {
    const { query } = this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6 mt-4 mb-4 d-flex search-input-alignment">
            <form onSubmit={(event) => event.preventDefault()}>
              <div className="search-input-container">
                <input
                  type="text"
                  value={query}
                  onChange={this.handleChange}
                  placeholder="Enter book title"
                  className="search-input"
                />
                <button type="submit" className="search-button">
                  <IoSearchSharp className="search-icon" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default BookSearch;
