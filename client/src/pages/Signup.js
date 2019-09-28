import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

class Signup extends Component {
  state = {
    firstName: "",
    lastName: "",
    organization: "",
    username: "",
    password: "",
    confirmPassword: "",
    redirectTo: null
  }

  validateName = name => {
    const regex = /[A-Za-z]{3,}/;

    return !regex.test(name)
      ? "The name must contain at least three letters. Numbers and special characters are not allowed."
      : "";
  };
  
  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // Change to get request.
  handleSubmit = event => {
    console.log("sign-up handleSubmit, username: ")
    console.log(this.state.username);
    event.preventDefault();
    axios.post("/user/", {
      username: this.state.username,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      organization: this.state.organization,
      confirmPassword: this.state.confirmPassword
    })
    .then(response => {
      console.log("response");
      console.log(response)
      if (!response.data.errors) {
        console.log(response);
        console.log("successful signup");
        this.props.updateUser({
          loggedIn: true,
          username: response.data.username,
          userID: response.data._id,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          organization: response.data.organization
        })
        this.setState({
          redirectTo: "/dashboard"
        })
      } else {
        console.log("error")
      }
    }).catch(error => {
      console.log("signup error: ")
      console.log(error);
    })
  }

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />
    } else {
      return (
        <div className="container">
          <h4>Sign up</h4>
          <form>
            <input type="text" id="firstName" placeholder="first name" name="firstName" value={this.state.firstName} onChange={this.handleChange}/>
            <br></br>
            <input type="text" id="lastName" placeholder="last name" name="lastName" value={this.state.lastName} onChange={this.handleChange}/>
            <br></br>
            <input type="text" id="organization" placeholder="organization" name="organization" value={this.state.organization} onChange={this.handleChange}/>
            <br></br>
            <input type="text" id="username" placeholder="email address" name="username" value={this.state.username} onChange={this.handleChange}/>
            <br></br>
            <input placeholder="password" type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
            <br></br>
            <input placeholder="confirm password" type="password" name="confirmPassword" value={this.state.confirmPassword} onChange={this.handleChange}/>
            <br></br>
            <button className="btn" onClick={this.handleSubmit} type="submit">sign up</button>
          </form>
        </div>
      )
    }
  }
}

export default Signup;