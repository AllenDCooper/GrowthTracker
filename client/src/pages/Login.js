import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Video from "../components/Video.js"

class Login extends Component {
  state = {
    username: "",
    password: "",
    redirectTo: null
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    axios.post("/user/login", {
      username: this.state.username,
      password: this.state.password
    })
    .then(response => {
      console.log("login response: ")
      console.log(response);
      if (response.status === 200) {
        // update App.js state
        this.props.updateUser({
          loggedIn: true,
          username: response.data.username
        })
        // update the state to redirect to home
        this.setState({
          redirectTo: "/dashboard"
        })
      }
    }).catch(error => {
      console.log("login error: ")
      console.log(error);
    })
  }

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />
    } else {
      return (
        <div>
          <h1>Welcome to GrowthTracker</h1>
          <Video />
          <h4>Login</h4>
          <form>
            <input type="text" id="username" placeholder="email address" name="username" value={this.state.username} onChange={this.handleChange}/>
            <input placeholder="password" type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
            <button onClick={this.handleSubmit} type="submit">submit</button>
          </form>
          <p>New user? Create an account <a href="/signup">here</a></p>
        </div>
      )
    }
  }
}

export default Login;