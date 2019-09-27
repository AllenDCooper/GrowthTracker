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
    questions: [],
    iterator: 1,
  }

  handleCreateQuestion = (event) => {
    event.preventDefault();
    this.state.iterator++;
    const questionDiv = this.refs.questionDiv;
    questionDiv.innerHTML += '<div ref="questionHTML" class="input-field inline col s12"> <i class="material-icons prefix">mode_edit</i> <input id="question' + this.state.iterator + '" ref="question' + this.state.iterator + '" type="text" class="validate" required /> <label for="question_inline">Question ' + this.state.iterator + '</label> </div>';
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.state.surveyTitle = this.refs.surveyTitle.value;
    this.state.surveyDescription = this.refs.surveyDescription.value;
    console.log(this.refs.surveyDescription.value);
    this.state.questions.push(this.refs.question1.value);
    console.log(this.refs.question1.value);

    for ( let i = 1; i < this.state.iterator; i++) {
      let questionRef = "question" + i;
      console.log(questionRef)
      let questionElement = this.refs.question1;
      console.log(questionElement);
      this.state.questions.push(questionElement.value);
    }

    //let questionHTML = this.refs.questionDiv
    //console.log(typeof questionHTML)
    //console.log(questionHTML)
    // this.refs.questionDiv;

    // this.refs.questionDiv.forEach(element => {
    //   let questionText = element.querySelector("input").getAttribute("ref");
    //   this.state.questions.push(questionText);
    // });

    console.log(this.state);
  }

  render() {
    return (
      <div>
        <Nav {...this.props} updateUser={this.props.updateUser} loggedIn={this.props.loggedIn} />
        <div className="container">
          <div className="row">
            <form className="col s12" style={formStyle}>
              <div className="input-field col s12">
                <input id="surveyTitle" ref="surveyTitle" name="surveyTitle" type="text" data-length="50" className="validate" required />
                <label for="surveyTitle">Survey Title</label>
              </div>
              <div className="input-field col s12">
                <textarea id="surveyDescription" ref="surveyDescription" name="surveyDescription" className="materialize-textarea" data-length="120"></textarea>
                <label for="surveyDescription">Description</label>
              </div>
              <div ref="questionDiv">
                <div ref="questionHTML" className="input-field inline col s12">
                  <i class="material-icons prefix">mode_edit</i>
                  <input id="question1" ref="question1" type="text" className="validate" required />
                  <label for="question1">Question 1</label>
                </div>
              </div>
              <button className="btn" onClick={this.handleCreateQuestion}>+ Add Question</button>
              <br />
              <br />
              <button className="btn" onClick={this.handleSubmit} type="submit">create survey</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Create;