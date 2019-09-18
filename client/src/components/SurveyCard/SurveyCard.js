import React from "react";

export function SurveyCard({children}) {
  return (
    <div className="row">
    {children}
  </div>
  )
}

export function SurveyCardItem(props) {
  return(
    <div className="col s12 m6" key={props.id}>
      <div className="card blue-grey darken-1">
        <div className="card-content white-text">
          <span className="card-title">{props.name}</span>
          <p>{props.desc}</p>
        </div>
        <a className="btn-floating waves-effect halfway-fab waves-light red"><i data-value={props.id} onClick={props.saveFunction} className="material-icons">+</i></a>
      </div>
    </div>
  )
}
