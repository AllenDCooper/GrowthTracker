import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Nav from "../components/Nav/Nav.js";
import { SurveyCard, SurveyCardItem } from "../components/SurveyCard/SurveyCard.js"

const userDiv = {
  paddingTop: "15px",
  marginLeft: "0",
  fontWeight: "bolder",
}

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

  // Function to save survey to user document when clicked.
  handleSaveSurvey = event => {
    event.preventDefault();
    console.log(event.target.getAttribute('data-value'));
    axios.put("/user/", {
      userID: this.props.userID,
      surveyID: event.target.getAttribute('data-value')
    }).then(response => {
      console.log("saveSurveys response: ")
      console.log(response);
      // Lift returned user object up to parent (App.js).
      this.props.updateRedirect(response.data);
      // Redirect to dashboard where user can take the saved survey.
      // this.setState({
      //   redirectTo: "/dashboard"
      // })
    })
  }

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />
    } else {
      return(
        <div>
          <Nav {...this.props} updateUser={this.props.updateUser} loggedIn={this.props.loggedIn} />
          {this.props.loggedIn && <div className="container" style={userDiv}><p><i class="small material-icons" style={{verticalAlign: "middle"}}>account_circle</i>&nbsp;Welcome,&nbsp;{this.props.username}! Click to add available growth.trackers.</p></div>}
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