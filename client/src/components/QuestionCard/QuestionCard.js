import React, { Component } from "react";

function QuestionCard(props) {
  return(
    <div className="col s12 m6 offset-m3" key={props.index} style={{position: "absolute"}, {left: 0}, {top: 0}, {"z-index": props.index}}>
      <div className="card medium blue-grey darken-1">
        <div className="card-content white-text">
          <span className="card-title"></span>
          <p>{props.text}</p>
        </div>
        <a className="btn-floating waves-effect halfway-fab waves-light red"><i data-value={props.id} onClick={props.saveFunction} className="material-icons">+</i></a>
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
      </div>
    </div>
  )
};

export default QuestionCard;