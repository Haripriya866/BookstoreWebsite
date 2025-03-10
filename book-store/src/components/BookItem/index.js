import { Link } from "react-router-dom";

import "./index.css";

const BookItem = (props) => {
  const { bookDetails } = props;
  const { title, subtitle, price, image, isbn13 } = bookDetails;
  return (
    <Link to={`/books/${isbn13}`} className="link-book-item">
      <li className="books-list-item">
        <img src={image} alt="book-item-img" className="book-item-image" />
        <p className="book-item-title">{title}</p>
        <p className="book-item-subtitle">{subtitle}</p>
        <p className="book-item-price">{price}</p>
      </li>
    </Link>
  );
};
export default BookItem;
