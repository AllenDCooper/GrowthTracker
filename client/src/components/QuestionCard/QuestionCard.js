import React, { Component } from "react";

// let questionCardStyle = {
//   position: "absolute",
//   top: "0px",
//   right: "0px",
//   "z-index": (this.props.index - 1)
// }

class QuestionCard extends Component {
  state = {
    isHidden: false,
  }

  handleClick = () => {
    this.setState({
      isHidden: true
    });
  };

  render() {
    if (this.state.isHidden) {
      return(null)
    } else {
      return(
        <div className="col s12 m6 offset-m3" key={this.props.index} data-value={this.props.index} style={{ position: 'absolute', zIndex: -this.props.index }}>
          <div className="card medium blue-grey darken-1">
            <div className="card-content white-text">
              <span className="card-title"></span>
              <p>{this.props.text}</p>
            </div>
            <form>
              <p>
                <label>
                  <input value="6" name="group1" type="radio" />
                  <span>Strongly Agree</span>
                </label>
              </p>
              <p>
                <label>
                  <input value="5" name="group1" type="radio" />
                  <span>Agree</span>
                </label>
              </p>
              <p>
                <label>
                  <input value="4" name="group1" type="radio" />
                  <span>Somewhat Agree</span>
                </label>
              </p>
              <p>
                <label>
                  <input value="3" name="group1" type="radio" />
                  <span>Somewhat Disagree</span>
                </label>
              </p>
              <p>
                <label>
                  <input value="2" name="group1" type="radio" />
                  <span>Disagree</span>
                </label>
              </p>
              <p>
                <label>
                  <input value="1" name="group1" type="radio" />
                  <span>Strongly Disagree</span>
                </label>
              </p>
            </form>
            <a className="btn-floating waves-effect waves-light red"><i data-value={this.props.id} onClick={this.handleClick} className="material-icons">navigate_next</i></a>
          </div>
        </div>
      )
    }
  }
}
export default QuestionCard;