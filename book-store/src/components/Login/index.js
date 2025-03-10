import { Component } from "react";
import Cookies from "js-cookie";
import { Redirect } from "react-router-dom";

import "./index.css";

class Login extends Component {
  state = {
    username: "",
    password: "",
    showSubmitError: false,
    errorMsg: "",
  };
  onChangeUsername = (event) => {
    this.setState({ username: event.target.value });
  };

  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };
  onSubmitSuccess = (jwtToken) => {
    const { history } = this.props;

    Cookies.set("jwt_token", jwtToken, {
      expires: 30,
      path: "/",
    });
    history.push("/");
  };

  onSubmitFailure = (errorMsg) => {
    this.setState({ showSubmitError: true, errorMsg });
  };
  submitForm = async (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    const userDetails = { username, password };
    const url = "https://bookstore-website-api.vercel.app/login";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    };
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwtToken);
    } else {
      this.onSubmitFailure(data.error_msg);
    }
  };
  renderUsernameField = () => {
    const { username } = this.state;
    return (
      <>
        <label className="login-input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="login-input-field"
          value={username}
          onChange={this.onChangeUsername}
          placeholder="Username"
        />
      </>
    );
  };
  renderPasswordField = () => {
    const { password } = this.state;
    return (
      <>
        <label className="login-input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="login-input-field"
          value={password}
          onChange={this.onChangePassword}
          placeholder="Password"
        />
      </>
    );
  };
  render() {
    const { showSubmitError, errorMsg } = this.state;
    const jwtToken = Cookies.get("jwt_token");
    if (jwtToken !== undefined) {
      return <Redirect to="/" />;
    }
    return (
      <div className="login-form-container">
        <form className="form-container" onSubmit={this.submitForm}>
          <div className="login-input-container">
            {this.renderUsernameField()}
          </div>
          <div className="login-input-container">
            {this.renderPasswordField()}
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
          {showSubmitError && (
            <p className="login-error-message">*{errorMsg}</p>
          )}
        </form>
      </div>
    );
  }
}

export default Login;
