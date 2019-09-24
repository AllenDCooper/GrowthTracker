import React, { Component } from 'react';
import axios from 'axios';
import Nav from "../components/Nav/Nav.js"

const formStyle = {
  marginTop: "15px",
}

class Create extends Component {
  state = {
    surveyTitle: "",
    surveyDescription: "",
    question1: "",
    question2: "",
    question3: "",
    question4: "",
    question5: "",
    question6: "",
    question7: "",
    question8: "",
    question9: "",
    question10: "",
    iterator: 1,
  }

  handleCreateQuestion = (event) => {
    event.preventDefault();
    this.state.iterator++;
    const questionDiv = this.refs.questionDiv;
    questionDiv.innerHTML += '<div class="input-field inline col s12"> <i class="material-icons prefix">mode_edit</i> <input id="question_inline" type="text" class="validate" /> <label for="question_inline">Question ' + this.state.iterator + '</label> </div>'
  }

  render() {
    return (
      <div>
        <Nav {...this.props} updateUser={this.props.updateUser} loggedIn={this.props.loggedIn} />
        <div className="container">
          <div className="row">
            <form className="col s12" style={formStyle}>
              <div className="input-field col s12">
                <input id="survey_title" name="surveyTitle" type="text" data-length="20" className="validate" />
                <label for="survey_title">Survey Title</label>
              </div>
              <div className="input-field col s12">
                <textarea id="textarea1" name="surveyDescription" className="materialize-textarea" data-length="120"></textarea>
                <label for="textarea1">Description</label>
              </div>
              <div ref="questionDiv">
                <div className="input-field inline col s12">
                  <i class="material-icons prefix">mode_edit</i>
                  <input id="question_inline" type="text" className="validate" />
                  <label for="question_inline">Question 1</label>
                </div>
              </div>
              <button className="btn" onClick={this.handleCreateQuestion}>+ Add Question</button>
              <button className="btn" onClick={this.handleSubmit} type="submit">create survey</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Create;