import React, { Component } from "react";
import axios from "axios";
import Nav from "../components/Nav/Nav.js";
import { SurveyCard, SurveyCardItem } from "../components/SurveyCard/SurveyCard.js"

class Search extends Component {
  state = {
    surveys: []
  }

  getSurveys() {
    axios.get("/api/surveys/").then(response => {
      console.log("getSurveys response: ");
      console.log(response);
      this.setState({
        surveys: response.data
      })
    })
  }

  componentDidMount() {
    this.getSurveys();
  };

  render() {
    return(
      <div>
        <Nav {...this.props} updateUser={this.props.updateUser} loggedIn={this.props.loggedIn} />
        {this.props.loggedIn && <p>Welcome, {this.props.username}! Click to add available growth.trackers.</p>}
        <SurveyCard>
          {this.state.surveys.map(item => (
            <SurveyCardItem key={item.id} name={item.name} desc={item.description} />
          ))}
        </SurveyCard>
      </div>
    )
  }
}

export default Search