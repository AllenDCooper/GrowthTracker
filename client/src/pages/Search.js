import React, { Component } from "react";
import axios from "axios";
import Nav from "../components/Nav/Nav.js";

class Search extends Component {
  render() {
    return(
      <div>
        <Nav {...this.props} updateUser={this.props.updateUser} loggedIn={this.props.loggedIn} />
        {this.props.loggedIn && <p>Welcome, {this.props.username}! Click to add available growth.trackers.</p>}
      </div>
    )
  }
}

export default Search