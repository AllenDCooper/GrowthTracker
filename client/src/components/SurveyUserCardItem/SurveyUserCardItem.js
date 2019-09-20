import React, { Component } from "react";
import axios from "axios";

class SurveyUserCardItem extends Component {

  unsave = () => {
    console.log("axios request: ");
    console.log(this.props.userID);
    console.log(this.props.id);
    axios.put("/api/users/", {
      userID: this.props.userID,
      surveyID: this.props.id
    })
    .then(response => {
      console.log("unsave response: ");
      console.log(response);
      window.location.reload()
    })
    .catch(err => console.log(err))
  }

  render() {
    return(
      <div>
        <div className="col s12 m6 offset-m3" key={this.props.id}>
        <div className="card medium blue-grey darken-1">
          <div className="card-content white-text">
            <span className="card-title">{this.props.name}</span>
            <p>{this.props.desc}</p>
          </div>
          <div className="card-action">
            <a data-value={this.props.data} href="#">Start Survey</a>
            <a href="#">View Results</a>
            <a className="btn-floating btn waves-effect waves-light grey darken-4"><i data-value1={this.props.userID} data-value2={this.props.id} className="material-icons" onClick={this.unsave}>close</i></a>
          </div>
        </div>
      </div>
      {this.props.children}
    </div>
    )
  }
}

export default SurveyUserCardItem;