import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Nav from "../components/Nav/Nav.js"
import { SurveyCard, SurveyCardItem } from "../components/SurveyCard/SurveyCard.js"

class Dashboard extends Component {
  state = {
    savedSurveys: []
  }

  getSurveys() {
    axios.get("api/users/" + this.props.userID, {
      userID: this.props.userID
    }).then(response => {
      console.log("getSurveys from user response: ")
      console.log(response.data)
      this.setState({
        savedSurveys: response.data.savedSurveys
      })
    })
    .catch(err => console.log(err));
  };

  componentDidMount() {
    this.getSurveys()
  }

  render() {
    return(
      <div>
      <Nav {...this.props} updateUser={this.props.updateUser} loggedIn={this.props.loggedIn} />
      {this.props.loggedIn && <p>Welcome, {this.props.username}! Your user id is: {this.props.userID}</p>}
      <SurveyCard>
        {this.state.savedSurveys.map(item => (
          <SurveyCardItem id={item._id} name={item.name} desc={item.description} />
        ))}
      </SurveyCard>
    </div>
    )
  }
}

export default Dashboard;