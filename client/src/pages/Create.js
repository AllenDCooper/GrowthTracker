import React, { Component } from 'react';
import axios from 'axios';
import Nav from "../components/Nav/Nav.js"
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { Redirect } from "react-router-dom";

const formStyle = {
  marginTop: "15px",
}

class Create extends Component {
  state = {
    surveyTitle: "",
    surveyDescription: "",
    questions: [""],
    redirectTo: null
  }

  // This function adds new blank question text inputs onto the page; it is called as an onClick attribute on the "add questions" button in the render function below. 
  // It uses the prevState parameter on setState to get the current questions array, which is then destructured it into its elements.
  // Finally, it pushes a new empty question string to the existing array, updating the state, and causing an automatic re-render 
  addQuestion = (event) => {
    event.preventDefault();
    this.setState((prevState) => ({
      questions: [...prevState.questions, ""]
    }))
    console.log(this.state.questions);
  }
  
  // This function removes an empty question input
  removeQuestion = (event) => {
    event.preventDefault();
    console.log(this.state.questions);
    let index = event.target.parentNode.parentNode.getAttribute("datavalue") || event.target.parentNode.parentNode.parentNode.getAttribute("datavalue");
    console.log(event.target.parentNode.parentNode);
    console.log(event.target.parentNode.parentNode.parentNode);
    console.log(index);
    let arr = this.state.questions
    arr.splice(index, 1)
    console.log(arr);
    this.setState({
      questions: arr
    })
  }
  
  // This function dynamically adds the user's text for the survey title and description into state as they type.
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  // This function dynamically adds the user's question text into state, as they type.
  handleQuestionChange = (event) => {
    let questionIndex = event.target.getAttribute("datavalue")
    let questionArr = this.state.questions
    questionArr[questionIndex] = event.target.value
    this.setState({
      questions: questionArr
    })
    console.log(this.state.questions.questionIndex);
  }

  // This function uses an axios POST call to server to create new survey
  handleSubmit = (event) => {
    event.preventDefault();
    axios.post("/api/surveys/", {
      name: this.state.surveyTitle,
      description: this.state.surveyDescription,
      items: this.state.questions
    })
    .then(response => {
      console.log("survey successfully created")
      console.log(response);
      this.setState({
        redirectTo: "/search"
      })
    })
    .catch(error => {
      console.log(error);
    });
  };

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />
    } else {
      return (
        <div>
          <Nav {...this.props} updateUser={this.props.updateUser} loggedIn={this.props.loggedIn} />
          <div className="container">
            <div className="row">
              <form className="col s12" style={formStyle}>
                <div className="input-field col s12">
                  <input id="surveyTitle" value={this.state.surveyTitle} onChange={this.handleChange} name="surveyTitle" type="text" data-length="50" className="validate" required />
                  <label for="surveyTitle">Survey Title</label>
                </div>
                <div className="input-field col s12">
                  <textarea id="surveyDescription" value={this.state.surveyDescription} onChange={this.handleChange} ref="surveyDescription" name="surveyDescription" className="materialize-textarea validate" required data-length="120"></textarea>
                  <label for="surveyDescription">Description</label>
                </div>
                {this.state.questions.map((question, index) => (
                    <div ref="questionDiv">
                    <div ref="questionHTML" className="input-field inline col s12">
                      <i class="material-icons prefix">mode_edit</i>
                      <input datavalue={index} value={this.state.questions[index]} onChange={this.handleQuestionChange} style={{width: "90%"}} id={"question"+parseInt(index+1)} ref={"question"+parseInt(index+1)} type="text" className="validate" required />
                      <IconButton onClick={this.removeQuestion} datavalue={index} aria-label="delete">
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                      <label for={"question"+parseInt(index+1)}>{"question"+parseInt(index+1)}</label>
                    </div>
                  </div>
                ))}

                <button className="btn" onClick={this.addQuestion}>+ Add Question</button>
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
}

export default Create;