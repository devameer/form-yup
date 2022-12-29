import React, { Component } from "react";
import gamelogo from "../assets/images/gamelogo.png";
import bg from "../assets/images/bg.png";
import Button from "../components/Button";
import * as yup from "yup";

export default class Signup extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    RePassword: "",
    check: false,
    error: "",
    message: "",
    errors: [],
  };
  schema = yup.object().shape({
    name: yup.string().min(6).max(16).required(),
    email: yup.string().email().required(),
    password: yup
      .string()
      .min(8)
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number"
      )
      .required(),
    RePassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),

    check: yup.string(),
  });
  handleChangeInput = (e) => {
    const { value, id } = e.target;
    const checked = e.target.checked;

    this.setState({ [id]: value, checked });
  };

  handleSubmit = (e) => {
    const self = this;
    e.preventDefault();
    this.schema
      .validate(
        {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
          RePassword: this.state.RePassword,
          check: this.state.check,
        },
        { abortEarly: false }
      )
      .catch(function (err) {
        console.log(err.errors);
        self.setState({ errors: err.errors });
      });
  };

  render() {
    return (
      <div className="sign_up">
        <div className="sign_desc">
          <img src={bg} alt="bg" className="bg" />
          <div className="overlay"></div>

          <img src={gamelogo} alt="game_logo" className="game_logo" />
          <div className="symbol">،،</div>
          <p className="game_desc">
            I always observe the people who pass by when I ride an escalator.
            I'll never see most of them again, so I imagine a lot of things
            about their lives... about the day ahead of them.
          </p>
          <div className="gamer">Hideo Kojima</div>
          <div className="vector"></div>
        </div>
        <a href="/#" className="back" onClick={this.props.toggle}>
          &lt; back
        </a>
        <form className="sign_form pt-30" onSubmit={this.handleSubmit}>
          <div className="sign_title">
            <h3 className="form_sign_title">Register Individual Account!</h3>
            <p className="form_sign_desc">
              For the purpose of gamers regulation, your details are required.
            </p>
          </div>
          <div className="form-group">
            <label htmlFor="email">Your name*</label>
            <input
              id="name"
              type="text"
              className="form-control"
              placeholder="Enter Your name"
              onChange={this.handleChangeInput}
              value={this.state.name}
              
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email address*</label>
            <input
              id="email"
              type="email"
              className="form-control"
              placeholder="Enter email address"
              onChange={this.handleChangeInput}
              value={this.state.email}
              
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Create password*</label>
            <input
              id="password"
              type="password"
              className="form-control"
              placeholder="Password"
              onChange={this.handleChangeInput}
              value={this.state.password}
              onKeyUp={this.passwordStrength}
              autoComplete="off"
              
            />
            {this.state.message && (
              <div
                dangerouslySetInnerHTML={{ __html: this.state.message }}
              ></div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="confirmpass">Repeat password*</label>
            <input
              id="RePassword"
              type="password"
              className="form-control"
              placeholder="Repeat password"
              autoComplete="off"
              onChange={this.handleChangeInput}
              value={this.state.RePassword}
            />
          </div>

          <div>
            <div className="form-group">
              <input
                type="checkbox"
                id="check"
                checked={this.state.check}
                onChange={this.handleChangeInput}
                name="checked"
              />
              <label htmlFor="repeatpassword*" className="label">
                I agree to terms & conditions
              </label>
            </div>
          </div>
          <Button myBtn={"Register Account"} />

          {this.state.errors.length
            ? this.state.errors.map((error) => (
                <p className="error" key={error}>
                  {error}
                </p>
              ))
            : null}
        </form>
      </div>
    );
  }
}
