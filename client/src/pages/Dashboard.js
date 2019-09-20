import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Nav from "../components/Nav/Nav.js"
import SurveyUserCard from "../components/SurveyUserCard/SurveyUserCard";
import SurveyUserCardItem from "../components/SurveyUserCardItem/SurveyUserCardItem";

class Dashboard extends Component {

  render() {
    return(
      <div>
        <Nav {...this.props} updateUser={this.props.updateUser} loggedIn={this.props.loggedIn} />
        {this.props.loggedIn && <p>Welcome, {this.props.username}! Your user id is: {this.props.userID}</p>}
        <SurveyUserCard>
          {this.props.savedSurveys.map(item => (
            <SurveyUserCardItem id={item._id} name={item.name} desc={item.description} data={item.items} userID={this.props.userID}/>
          ))}
        </SurveyUserCard>
      </div>
    )
  }
}

export default Dashboard;