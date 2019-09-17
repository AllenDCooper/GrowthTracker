import React, { Component } from "react";
import axios from "axios";

class Signup extends Component {
  state = {
    firstName: "",
    lastName: "",
    organization: "",
    username: "",
    password: "",
    confirmPassword: ""
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // change to get request
  handleSubmit = event => {
    event.preventDefault();
    axios.post("/user/", {
      username: this.state.username,
      password: this.state.password
    })
    .then(response => {
      console.log("login response: ");
      console.log(response);
      if (!response.status === 200) {
        this.updateUser({
          loggedIn: true,
          username: response.data.username
        })
      }
    }).catch(error => {
      console.log("signup error: ")
      console.log(error);
    })
  }

  render() {
    return (
      <div>
        <h4>Sign up</h4>
        <form>
          <input type="text" id="firstname" placeholder="first name" name="firstname" value={this.state.firstName} onChange={this.handleChange}/>
          <br></br>
          <input type="text" id="lastname" placeholder="last name" name="lastname" value={this.state.lastName} onChange={this.handleChange}/>
          <br></br>
          <input type="text" id="organization" placeholder="organization" name="organization" value={this.state.organization} onChange={this.handleChange}/>
          <br></br>
          <input type="text" id="username" placeholder="email address" name="username" value={this.state.username} onChange={this.handleChange}/>
          <br></br>
          <input placeholder="password" type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
          <br></br>
          <input placeholder="confirm password" type="confirmpassword" name="confirmpassword" value={this.state.confirmPassword} onChange={this.handleChange}/>
          <br></br>
          <button onClick={this.handleSubmit} type="submit">submit</button>
        </form>
      </div>
    )
  }
}

export default Signup;