import React, { Component } from "react";
import axios from "axios";
import Nav from "../components/Nav/Nav.js";

class Search extends Component {
  state = {
    surveys: []
  }

  componentDidMount() {
    this.getSurveys();
  };

  getSurveys() {
    axios.get("/api/surveys/").then(response => {
      console.log("getSurveys response: ");
      console.log(response);
      this.setState({
        surveys: response.data
      })
    })
  }

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