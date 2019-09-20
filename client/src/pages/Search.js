import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Nav from "../components/Nav/Nav.js";
import { SurveyCard, SurveyCardItem } from "../components/SurveyCard/SurveyCard.js"

class Search extends Component {
  state = {
    surveys: [],
    redirectTo: null
  }

  getSurveys() {
    axios.get("/api/surveys/").then(response => {
      console.log("getSurveys response: ");
      console.log(response);
      this.setState({
        surveys: response.data
      })
      console.log(this.state.surveys)
    })
  }

  componentDidMount() {
    this.getSurveys();
  };

  // function to save survey to user document when clicked
  handleSaveSurvey = event => {
    event.preventDefault();
    console.log(event.target.getAttribute('data-value'));
    axios.put("/user/", {
      userID: this.props.userID,
      surveyID: event.target.getAttribute('data-value')
    }).then(response => {
      console.log("saveSurveys response: ")
      console.log(response);
      this.setState({
        redirectTo: "/dashboard"
      })
      window.location.reload()
    })
  }

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />
    } else {
      return(
        <div>
          <Nav {...this.props} updateUser={this.props.updateUser} loggedIn={this.props.loggedIn} />
          {this.props.loggedIn && <p>Welcome, {this.props.username}! Click to add available growth.trackers.</p>}
          <SurveyCard>
            {this.state.surveys.map(item => (
              <SurveyCardItem saveFunction={this.handleSaveSurvey} id={item._id} name={item.name} desc={item.description} />
            ))}
          </SurveyCard>
        </div>
      )
    }
  }
}

export default Search