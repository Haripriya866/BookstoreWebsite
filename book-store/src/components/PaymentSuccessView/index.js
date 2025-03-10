import Header from "../Header";
import { Link } from "react-router-dom";

import "./index.css";

const PaymentSuccessView = () => {
  return (
    <>
      <Header />
      <div className="payment-success-view-container">
        <img
          className="payment-img"
          alt="payment-img"
          src="https://res.cloudinary.com/dlm3dx684/image/upload/v1729947535/x8nrcdxy3sfzmw6xjw9n.png"
        />
        <h1 className="payment-heading">Payment Successful</h1>
        <p className="payment-para">
          Thank you for orderingYour payment is successfully completed.
        </p>
        <Link to="/" className="nav-link">
          <button type="button" className="payment-button">
            Go To Home Page
          </button>
        </Link>
      </div>
    </>
  );
};

export default PaymentSuccessView;
