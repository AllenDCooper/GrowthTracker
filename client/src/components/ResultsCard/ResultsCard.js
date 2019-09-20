import React from "react";

function ResultsCard(props) {
return (
    <div className="col s12 m6" key={props.id} style={{ position: 'absolute', zIndex: -200 }}>
      <div className="card small blue-grey darken-1">
      <div className="card-content white-text">
        <span className="card-title">{props.name}</span>
        <button onClick={props.submitAnswers} className="btn" >get results</button>
      </div>
      </div>
    </div>
)
}

  export default ResultsCard;