import { Component } from "react";

import "./index.css";

class UserDetailsForm extends Component {
  state = {
    name: "",
    address: "",
    email: "",
    phone: "",
    nameError: "",
    emailError: "",
    addressError: "",
    phoneError: "",
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value, [`${name}Error`]: "" }); // Clear the error when user types
  };

  renderNameInputField = () => {
    const { name, nameError } = this.state;
    return (
      <div className="input-container">
        <input
          type="text"
          id="name"
          placeholder="Name"
          className="input-field"
          name="name"
          value={name}
          onChange={this.handleInputChange}
        />
        {nameError && <span className="error-message">{nameError}</span>}
      </div>
    );
  };
  renderAddressInputField = () => {
    const { address, addressError } = this.state;
    return (
      <div className="input-container">
        <input
          type="text"
          id="address"
          name="address"
          placeholder="Address"
          className="input-field"
          value={address}
          onChange={this.handleInputChange}
        />
        {addressError && <span className="error-message">{addressError}</span>}
      </div>
    );
  };
  renderEmailInputField = () => {
    const { email, emailError } = this.state;
    return (
      <div className="input-container">
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          className="input-field"
          value={email}
          onChange={this.handleInputChange}
        />
        {emailError && <span className="error-message">{emailError}</span>}
      </div>
    );
  };
  renderPhoneInputField = () => {
    const { phone, phoneError } = this.state;
    return (
      <div className="input-container">
        <input
          type="tel"
          id="phone"
          name="phone"
          placeholder="Phone"
          className="input-field"
          value={phone}
          onChange={this.handleInputChange}
        />
        {phoneError && <span className="error-message">{phoneError}</span>}
      </div>
    );
  };

  validateFields = () => {
    const { name, address, email, phone } = this.state;
    let isValid = true;

    this.setState({
      nameError: "",
      addressError: "",
      emailError: "",
      phoneError: "",
    });

    if (!name) {
      this.setState({ nameError: "Name is required" });
      isValid = false;
    }
    if (!address) {
      this.setState({ addressError: "Address is required" });
      isValid = false;
    }
    if (!email) {
      this.setState({ emailError: "Email is required" });
      isValid = false;
    }
    if (!phone) {
      this.setState({ phoneError: "Phone is required" });
      isValid = false;
    }

    return isValid;
  };

  submitForm = async (event) => {
    event.preventDefault();

    // Validate fields
    const isValid = this.validateFields();
    if (!isValid) {
      return; // Stop submission if validation fails
    }

    const { name, address, email, phone } = this.state;
    const userDetails = { name, address, email, phone };

    const url = "http://localhost:3005/users"; // Post to your backend server
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    };

    const response = await fetch(url, options);
    if (response.ok === true) {
      const data = await response.json();
      console.log(data);
      this.props.onPlaceOrder();
    } else {
      console.log("error occured while filling the userDetails form");
    }
  };

  render() {
    return (
      <>
        <h1 className="user-details-heading">Shipping Address</h1>
        <form className="form" onSubmit={this.submitForm}>
          {this.renderNameInputField()}
          {this.renderAddressInputField()}
          {this.renderEmailInputField()}
          {this.renderPhoneInputField()}
          <button type="submit" className="place-order-button">
            Place Order
          </button>
        </form>
      </>
    );
  }
}
export default UserDetailsForm;
