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
    <div className="col s12 m6" key={props.key}>
      <div className="card blue-grey darken-1">
        <div className="card-content white-text">
          <span className="card-title">{props.name}</span>
          <p>{props.desc}</p>
        </div>
        <div className="card-action">
          <a href="#">This is a link</a>
          <a href="#">This is a link</a>
        </div>
      </div>
    </div>
  )
}
