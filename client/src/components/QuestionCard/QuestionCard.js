import React, { Component } from "react";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Slider } from '@material-ui/core';
import Container from '@material-ui/core/Container'; 

const buttonStyle = {
  marginLeft: "5px",
  marginBottom: "5px"
}

const useStyles = makeStyles => ({
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const marks = [
  {
    value: 1,
    label: 'Strongly Disagree',
  },
  {
    value: 2,
    label: 'Disagree',
  },
  {
    value: 3,
    label: 'Somewhat Disagree',
  },
  {
    value: 4,
    label: 'Somewhat Agree',
  },
  {
    value: 5,
    label: 'Agree',
  },
  {
    value: 6,
    label: 'Strongly Agree',
  },
];

class QuestionCard extends Component {
  state = {
    isHidden: false,
    answer: null,
    surveyID: this.props.id,
  }

  handleClick = () => {
    this.setState({
      isHidden: true
    });
    this.props.handler(this.state.answer);
    this.props.getSurveyID(this.props.id);
  };

  handleAnswerClick = (event) => {
    this.setState({
      answer: event.target.value
    })
    console.log(this.state.answer);
  }

  render() {

    const classes = useStyles();

    if (this.state.isHidden) {
      return(null)
    } else {
      return(
        // <div className="col s12 m6 offset-m3" key={this.props.index} data-value={this.props.index} style={{ position: 'absolute', zIndex: -this.props.index }}>
        //   <div className="card medium blue-grey darken-1">
        //     <div className="card-content white-text">
        //       <span className="card-title"></span>
        //       <p>{this.props.text}</p>
        //     </div>
        <Container>
        <Card className={classes.card} key={this.props.index} data-value={this.props.index} style={{ position: 'absolute', zIndex: -this.props.index }}>
          <CardContent>
            <Typography id="vertical-slider" className={classes.title} color="textSecondary" gutterBottom>
            </Typography>
            <Typography variant="body2" component="p">
              {this.props.text}
            </Typography>
            <form>
              <Slider
                orientation="vertical"
                defaultValue={3}
                aria-labelledby="vertical-slider"
                valueLabelDisplay="auto"
                step={1}
                marks={marks}
                min={1}
                max={6}
              />
              {/* <p>
                <label>
                  <input value="6" name="group1" type="radio" onChange={this.handleAnswerClick} />
                  <span>Strongly Agree</span>
                </label>
              </p>
              <p>
                <label>
                  <input value="5" name="group1" type="radio" onChange={this.handleAnswerClick} />
                  <span>Agree</span>
                </label>
              </p>
              <p>
                <label>
                  <input value="4" name="group1" type="radio" onChange={this.handleAnswerClick} />
                  <span>Somewhat Agree</span>
                </label>
              </p>
              <p>
                <label>
                  <input value="3" name="group1" type="radio" onChange={this.handleAnswerClick} />
                  <span>Somewhat Disagree</span>
                </label>
              </p>
              <p>
                <label>
                  <input value="2" name="group1" type="radio" onChange={this.handleAnswerClick} />
                  <span>Disagree</span>
                </label>
              </p>
              <p>
                <label>
                  <input value="1" name="group1" type="radio" onChange={this.handleAnswerClick} />
                  <span>Strongly Disagree</span>
                </label>
              </p> */}
            </form>
            <a className="btn-floating waves-effect waves-light red" style={buttonStyle}><i data-value={this.props.id} onClick={this.handleClick} className="material-icons">navigate_next</i></a>
          {/* </div>
        </div> */}
        </CardContent>
        </Card>
        </Container>
      )
    }
  }
}
export default QuestionCard;