import React, { Component } from "react";
import axios from "axios";
import { relative } from "path";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import Icon from '@material-ui/core/Icon';
import Container from '@material-ui/core/Container';

const cardStyle = {
  position: relative
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
  iconHover: {
    '&:hover': {
      color: red[200],
    },
  },
});

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
      console.log(response.data)
      console.log(response.data.savedSurveys);
      // pass state back up app
      this.props.updateSurveys(response.data.savedSurveys);
    })
    .catch(err => console.log(err))
  }

  render() {
    const classes = useStyles();

    if (this.state.isHidden) {
      return(<div style={{ position: 'relative', minHeight: "440px", zIndex: 5 }}>{this.props.children}
      </div>)
    } else {
      return(
          // <div style={{ position: "relative", minHeight: "440px" }}> 
          //   {this.props.children}
            <Container>
            <Card className={classes.card} key={this.props.id}  style={{zIndex: 1}}>
              <CardContent style={{ padding: "5px", height: "450px"}}>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                {this.props.name}
                </Typography>
                <Typography variant="body2" component="p">
                {this.props.desc}
                </Typography>
                <CardActions>
              <a data-value={this.props.data} href="#" onClick={this.handleClick}>Start Survey</a>
                  <a href="#">View Results</a>
                  <a className="btn-floating btn waves-effect waves-light grey darken-4" ariaLabel="close"><i data-value1={this.props.userID} data-value2={this.props.id} className="material-icons" onClick={this.unsave}>close</i></a>
              </CardActions>
              </CardContent>
            </Card>
            </Container>
            /* <div className="col s12 m6 offset-m3" key={this.props.id} style={{zIndex: 1, position: "absolute" }}>
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
            </div> */
      //     </div>
        
      )
    }
  }
}

export default SurveyUserCardItem;