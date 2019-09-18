import React, { Component } from "react";
import axios from "axios";
import Nav from "../components/Nav/Nav.js";

function Search(props) {
  return(
    <div>
      <Nav {...props} updateUser={props.updateUser} loggedIn={props.loggedIn} />
      {props.loggedIn && <p>Welcome, {props.username}! Click to add available growth.trackers.</p>}
    </div>
  )
}

export default Search