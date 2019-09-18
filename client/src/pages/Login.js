import React, { Component } from "react";
import axios from "axios";
import Video from "../components/Video.js"

class Login extends Component {
  state = {
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
      console.log(response.data);
      if (!response.data.error){
        console.log("successful signup")
        // this.setState({
        //   redirectTo: "/login"
        // })
      } else {
        console.log("username already taken")
      }
    }).catch(error => {
      console.log("signup error: ")
      console.log(error);
    })
  }

  render() {
    return (
      <div>
        <h1>growth.tracker | Learn how you learn</h1>
        <Video />
        <h4>Sign up</h4>
        <form>
          <input type="text" id="username" placeholder="username" name="username" value={this.state.username} onChange={this.handleChange}/>
          <input placeholder="password" type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
          <button onClick={this.handleSubmit} type="submit" />
        </form>
      </div>
    )
  }
}

export default Login;