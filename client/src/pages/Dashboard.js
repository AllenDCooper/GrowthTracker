import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Nav from "../components/Nav/Nav.js"
import SurveyUserCard from "../components/SurveyUserCard/SurveyUserCard";
import SurveyUserCardItem from "../components/SurveyUserCardItem/SurveyUserCardItem";
import QuestionCard from "../components/QuestionCard/QuestionCard.js"
import ResultsCard from "../components/ResultsCard/ResultsCard.js"
import { set } from "mongoose";

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
    // pushes value into answer array
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

  // function that returns the percentile rank of a raw score value given an array of historical raw score values
  calcPercentileRank(value, arr) {
    // sort array in ascending order
    const sortArr = arr.sort(function(a, b){return a-b});
    console.log(sortArr);
    // set variables for value frequency
    let count = 0;
    // loop through array and count scores at or below the value
    let i = 0;
    while (sortArr[i] <= value) {
        count++
        i++
      }
    // calculate the percentile rank
    let rawRank = count/sortArr.length
    // round the rank to nearest integer
    let roundedRank = Math.round(rawRank * 100)
    // if 0 or 100, round to 1 and 99 respectively
    if (roundedRank === 0) {
        roundedRank = 1;
    } else if (roundedRank === 100) {
        roundedRank = 99;
    }
    console.log(roundedRank + "%");
    return (roundedRank);
  }

  submitAnswers() {
    // create new score document in the scores collection
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
      // update user document with score
      axios.put("api/users/scores/", {
        userID: this.props.userID,
        scoresID: response.data._id 
      })
      .then(response => {
        console.log(response.data)
      })
      .catch(err => {
        console.log(err)
      });
      // update survey with total raw score
      axios.put("/api/surveys/" + this.state.activeSurveyID, {
        rawScore: this.state.totalRawScore
      }).then(response => {
        console.log(response);
          this.setState({
            percentileRank: this.calcPercentileRank(this.state.totalRawScore, response.data.rawScores)
          })
        }
      )
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
                  <ResultsCard submitAnswers={this.submitAnswers} results={this.state.percentileRank} rawScore={this.state.totalRawScore}/>
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