import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./nav.css"
import Axios from "axios";
import indigo from '@material-ui/core/colors/indigo';


class Nav extends Component {

  state = {
    redirectTo: null
  }

  handleLogout = event => {
    event.preventDefault();
    Axios.post("/user/logout")
    .then(response => {
      console.log(response.data)
      if (response.data === 200) {
        this.props.updateUser({
          loggedIn: false,
          username: null
        })
      }
      this.setState({
        redirectTo: "/"
      })
    }).catch(error => {
      console.log("Logout error")
    })
  }
  
  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />
    } else {
      return (
        <nav style={{backgroundColor: indigo[500]}}>
          <ul style={{backgroundColor: indigo[500]}}>
            <li><a href="/dashboard">dashboard</a></li>
            <li><a href="/search">search</a></li>
            <li><a href="/create">create</a></li>
            <li className="right"><a id="logout" onClick={this.handleLogout} href="#">logout</a></li>
          </ul>
        </nav>
      );
    };
  };
};

export default Nav;