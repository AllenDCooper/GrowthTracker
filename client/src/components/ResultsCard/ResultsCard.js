import React from "react";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import Icon from '@material-ui/core/Icon';
import Container from '@material-ui/core/Container';
import { typography } from "@material-ui/system";

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
  iconHover: {
    '&:hover': {
      color: red[200],
    },
  },
});

function ResultsCard(props) {
  const classes = useStyles();
  
return (
  <Container>
    <Card className={classes.card} key={props.id} style={{ position: 'absolute', zIndex: -200, width: "80%" }}>
      <CardContent style={{ padding: "5px", height: "450px" }}>
      <Typography variant="h5" component="h2">
          Your percentile rank is {props.results}%.
          </Typography>
          <Typography style={{margin: "10px 0px"}}variant="body2" component="p">
            This means you scored at or above {props.results}% of respondents taking this survey.
            </Typography>
        <CardActions>
            <Button onClick={props.submitAnswers} >get results</Button>
        </CardActions>
      </CardContent>
    </Card>
  </Container>
    // <div className="col s12 m6" key={props.id} style={{ position: 'absolute', zIndex: -200 }}>
    //   <div className="card small blue-grey darken-1">
    //   <div className="card-content white-text">
    //     <span className="card-title">{props.name}</span>
    //     <button onClick={props.submitAnswers} className="btn" >get results</button>
    //     <h3>Your percentile rank is {props.results}%.</h3>
    //     <p>This means you scored at or above {props.results}% of respondents taking this survey.</p>
    //   </div>
    //   </div>
    // </div>
)
}

  export default ResultsCard;