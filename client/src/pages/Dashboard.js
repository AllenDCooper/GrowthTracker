import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Nav from "../components/Nav/Nav.js"


function Dashboard(props) {
  return (
    <div>
      <Nav {...props} updateUser={props.updateUser} loggedIn={props.loggedIn} />
      {props.loggedIn && <p>Welcome, {props.username}!</p>}
    </div>
  )
}

export default Dashboard;