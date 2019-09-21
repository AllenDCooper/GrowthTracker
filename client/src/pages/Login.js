import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Video from "../components/Video/Video.js"

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
    axios.post("/user/login/", {
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
          username: response.data.username,
          userID: response.data.userID,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          organization: response.data.organization
        })
        // update the state to redirect to home
        this.setState({
          redirectTo: "/dashboard"
        })
        window.location.reload()
      }
    }).catch(error => {
      console.log("login error: ")
      console.log(error);
    })
  }

  render() {
    // if (this.state.redirectTo) {
    //   return <Redirect to={{ pathname: this.state.redirectTo }} />
    // } else {
      return (
        <div className="container">
          <h1>growth.tracker</h1>
          <Video />
          <div className="row">
            <div className="col s12">
              <h4>login</h4>
              <form>
                <div className="row">
                  <div className="input-field col s6">
                    <input type="text" id="username" placeholder="email address" name="username" value={this.state.username} onChange={this.handleChange}/>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s6">
                    <input placeholder="password" type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s6">
                    <button className="btn" onClick={this.handleSubmit} type="submit">submit</button>
                  </div>
                </div>
              </form>
              <p>New user? Create an account <a href="/signup">here</a></p>
            </div>
          </div>
        </div>
      )
    }
  }
// }

export default Login;