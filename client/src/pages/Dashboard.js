import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Nav from "../components/Nav/Nav.js"
import SurveyUserCard from "../components/SurveyUserCard/SurveyUserCard";
import SurveyUserCardItem from "../components/SurveyUserCardItem/SurveyUserCardItem";
import QuestionCard from "../components/QuestionCard/QuestionCard.js"
import ResultsCard from "../components/ResultsCard/ResultsCard.js"

class Dashboard extends Component {
  constructor () {
    super();
    this.handleAnswers = this.handleAnswers.bind(this);
    this.getSurveyID = this.getSurveyID.bind(this);
    this.submitAnswers = this.submitAnswers.bind(this);
  }

  state = {
    answerArr: [],
    percentileRank: null,
    activeSurveyID: null,
    totalRawScore: null,
  }
  
  updateRawScore() {
    this.setState({
      totalRawScore: this.getTotalRawScore(this.state.answerArr)
    });
    console.log(this.state.totalRawScore);
  };

  handleAnswers(answer) {
    // Pushes value into answer array.
    this.state.answerArr.push(parseInt(answer));
    console.log(this.state.answerArr);
    this.updateRawScore();
  }

  getSurveyID(surveyID) {
    this.setState({
      activeSurveyID: surveyID
    })
    console.log(this.state.activeSurveyID) 
  }

  hideCard = () => {
    this.parentNode.style.display = 'none'
  }

  getTotalRawScore = arr => {
    return arr.reduce((a,b) => a + b, 0)
  }

  submitAnswers(answerArr) {
    axios.post("api/scores/", {
      rawScoreSeries: this.state.answerArr,
      totalRawScore: this.state.totalRawScore,
      userID: this.props.userID,
      surveyID: this.state.activeSurveyID
    })
    .then(response => {
      console.log("score post response: ");
      console.log(response);
      this.setState({
        percentileRank: response.data.percentileRank
      })
      console.log(this.state.percentileRank)
      axios.put("/user/", {
        userID: this.props.userID,
        scoresID: response.data._id 
      })
      .then(response => {
        console.log(response.data)
      })
      .catch(err => {
        console.log(err)
      });
      axios.put("/api/surveys/" + this.active.surveyID, {
        rawScore: this.state.totalRawScore
      }).then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err)
      })
    })
    .catch(err => {
      console.log(err)
    });

  };

  render() {
    return(
      <div>
        <Nav {...this.props} updateUser={this.props.updateUser} loggedIn={this.props.loggedIn} />
        <div className="container">
          {this.props.loggedIn && <p>Welcome, {this.props.username}! Your user id is: {this.props.userID}</p>}
          <SurveyUserCard>
            {this.props.savedSurveys.map(survey => (
              <div>
                <SurveyUserCardItem hideCard={this.hideCard} id={survey._id} name={survey.name} desc={survey.description} data={survey.items} userID={this.props.userID}>
                  {survey.item.map( (question, index) => (
                    <QuestionCard
                      text={question}
                      hideCard={this.hideCard}
                      index={index}
                      handler={this.handleAnswers}
                      getSurveyID={this.getSurveyID}
                      id={survey._id}
                    />
                  ))}
                  <ResultsCard submitAnswers={this.submitAnswers}/>
                </SurveyUserCardItem>
              </div>
            ))}
          </SurveyUserCard>
        </div>
      </div>
    )
  }
}

export default Dashboard;