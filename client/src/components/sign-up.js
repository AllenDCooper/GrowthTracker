import React, { Component } from "react"
import Axios from "axios";

class Signup extends Component {
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

  handleSubmit(event) {
    event.preventDefault();
    Axios.post("/user/", {
      username: this.state.username,
      password: this.state.password
    })
    .then(response => {
      if (response.data.errmsg){
        console.log("successful signup")
        this.setState({
          redirectTo: "/login"
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
    return (
      <div>
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

export default Signup; 