import React, { Component } from "react";

class SurveyUserCard extends Component {
  state ={
  }

  render() {
    return(
      <div className="row">
        {this.props.children}
      </div>
    )
  }
}

export default SurveyUserCard;