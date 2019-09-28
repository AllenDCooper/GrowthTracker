import React from "react";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import Icon from '@material-ui/core/Icon';
import indigo from '@material-ui/core/colors/indigo';
import Container from '@material-ui/core/Container'; 

export function SurveyCard({children}) {
  return (
    <div className="row">
      {children}
    </div>
  )
}

const useStyles = makeStyles({
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

export function SurveyCardItem(props) {
  const classes = useStyles();

  return(
    // <div className="col s12 m6" key={props.id}>
    //   <div className="card small blue-grey darken-1">
    //     <div className="card-content white-text">
    //       <span className="card-title">{props.name}</span>
    //       <p>{props.desc}</p>
    //     </div>
    //     <a className="btn-floating waves-effect halfway-fab waves-light red" ariaLabel="add"><i data-value={props.id} onClick={props.saveFunction} className="material-icons">+</i></a>
    //   </div>
    // </div>
      <Container>
        <Card className={classes.card} key={props.id} style={{backgroundColor: indigo[50]}}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
          {props.name}
          </Typography>
          <Typography variant="body2" component="p">
          {props.desc}
          </Typography>
        </CardContent>
        <CardActions>
          <a>
            {/* <a className="btn-floating waves-effect halfway-fab waves-light red" ariaLabel="add">
            <i data-value={props.id} onClick={props.saveFunction} className="material-icons">+</i> */}
            <Icon data-value={props.id} onClick={props.saveFunction}className={classes.iconHover} color="action" style={{ fontSize: 30 }}>
              add_circle
            </Icon>
          </a>
        </CardActions>
      </Card>
    </Container>
  )
}
