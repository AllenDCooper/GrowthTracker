import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Nav from "../components/Nav/Nav.js"
import SurveyUserCard from "../components/SurveyUserCard/SurveyUserCard";
import SurveyUserCardItem from "../components/SurveyUserCardItem/SurveyUserCardItem";
import QuestionCard from "../components/QuestionCard/QuestionCard.js"

class Dashboard extends Component {
  constructor () {
    super();
    this.handleAnswers = this.handleAnswers.bind(this);
  }

  state = {
    answerArr: []
  }

  handleAnswers(answer) {
    // pushes value into answer array
    this.state.answerArr.push(answer)
    console.log(this.state.answerArr)
  }

  hideCard = () => {
    this.parentNode.style.display = 'none'
  }

  render() {
    return(
      <div>
        <Nav {...this.props} updateUser={this.props.updateUser} loggedIn={this.props.loggedIn} />
        <div className="container">
          {this.props.loggedIn && <p>Welcome, {this.props.username}! Your user id is: {this.props.userID}</p>}
          <SurveyUserCard>
            {this.props.savedSurveys.map(survey => (
              <SurveyUserCardItem hideCard={this.hideCard} id={survey._id} name={survey.name} desc={survey.description} data={survey.items} userID={this.props.userID}>
                {survey.item.map( (question, index) => (
                  <QuestionCard
                    text={question}
                    hideCard={this.hideCard}
                    index={index}
                    handler={this.handleAnswers}
                  />
                ))}
              </SurveyUserCardItem>
            ))}
          </SurveyUserCard>
        </div>
      </div>
    )
  }
}

export default Dashboard;