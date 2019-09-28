import React, { Component } from "react";
import axios from "axios";
import { relative } from "path";

const cardStyle = {
  position: relative
}

class SurveyUserCardItem extends Component {
  state = {
    isHidden: false
  }

  handleClick = () => {
    this.setState({
      isHidden: true
    });
  };

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
    if (this.state.isHidden) {
      return(<div style={{ position: 'relative', minHeight: "440px", zIndex: 5 }}>{this.props.children}
      </div>)
    } else {
      return(
        <div>
          <div style={{ position: "relative", minHeight: "440px" }}> 
            {this.props.children}
            <div className="col s12 m6 offset-m3" key={this.props.id} style={{zIndex: 1, position: "absolute" }}>
              <div className="card medium blue-grey darken-1">
                <div className="card-content white-text">
                  <span className="card-title">{this.props.name}</span>
                  <p>{this.props.desc}</p>
                </div>
                <div className="card-action">
                  <a data-value={this.props.data} href="#" onClick={this.handleClick}>Start Survey</a>
                  <a href="#">View Results</a>
                  <a className="btn-floating btn waves-effect waves-light grey darken-4" ariaLabel="close"><i data-value1={this.props.userID} data-value2={this.props.id} className="material-icons" onClick={this.unsave}>close</i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}

export default SurveyUserCardItem;