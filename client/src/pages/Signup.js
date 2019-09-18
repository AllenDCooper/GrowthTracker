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

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // change to get request
  handleSubmit = event => {
    console.log("sign-up handleSubmit, username: ")
    console.log(this.state.username);
    event.preventDefault();
    axios.post("/user/", {
      username: this.state.username,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      organization: this.state.organization
    })
    .then(response => {
      console.log("response");
      if (!response.data.errmsg) {
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
        console.log("username already taken")
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
        <div>
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
            <button onClick={this.handleSubmit} type="submit">submit</button>
          </form>
        </div>
      )
    }
  }
}

export default Signup;