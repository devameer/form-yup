import React, { Component } from "react";
import Signup from "./Signup";
import Login from "./Login";

export default class Auth extends Component {
  state = {
    form: "signup",
  };
  handleToggle = () => {
    this.setState((prevState) => ({
      form: prevState.form === "signup" ? "login" : "signup",
    }));
  };

  render() {
    return (
      <div className="home">
        {this.state.form === "signup" ? (
          <Signup toggle={this.handleToggle} />
        ) : (
          <Login toggle={this.handleToggle} />
        )}
      </div>
    );
  }
}
