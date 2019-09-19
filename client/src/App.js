import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";
import Signup from "./pages/Signup.js";
import Login from "./pages/Login.js";
// import additional pages as created
import Dashboard from "./pages/Dashboard.js";
import Search from "./pages/Search.js";

class App extends Component {
  state = {
    loggedIn: false,
    firstName: null,
    lastName: null,
    organization: null,
    username: null,
    userID: null,
    savedSurveys: []
  };

  // gets user on mount
  componentDidMount() {
    this.getUser();
  };

  // function to get current user saved in the session
  getUser() {
    axios.get("/user/").then(response => {
      console.log("Get user response: ")
      console.log(response.data)
      if(response.data.user) {
        console.log("Get User: there is a user saved in the server session: ")
        this.setState({
          loggedIn: true,
          username: response.data.user.username,
          userID: response.data.user._id,
          firstName: response.data.user.firstName,
          lastName: response.data.user.lastName
        })
        console.log(this.state);
        this.getSurveys()
      } else {
        console.log("Get user: no user");
        this.setState({
          loggedIn: false,
          username: null
        })
      }
    });
  };

  getSurveys() {
    console.log("getSurveys request:")
    console.log(this.state.userID);
    axios.get("api/users/" + this.state.userID, {
      userID: this.state.userID
    }).then(response => {
      console.log("getSurveys from user response: ")
      console.log(response.data)
      this.setState({
        savedSurveys: response.data.savedSurveys
      })
    })
    .catch(err => console.log(err));
  };

  // this function will save the userObject into the state
  updateUser(userObject) {
    this.setState(userObject)
  }
  
  updateUser = this.updateUser.bind(this);

  render() {
    return (
      <Router>
        <div>
          <Route 
            exact path="/" 
            // this will pass the updateUser function as props into the Login component that is called in this route
            render={(props) => <Login {...props} updateUser={this.updateUser}/>}
          />
          <Route
            exact path="/signup"
            render={(props) => <Signup {...props} updateUser={this.updateUser}/>}
          />
          <Route 
            exact path="/dashboard" 
            // this will pass the updateUser function as props into the Login component that is called in this route
            render={(props) => <Dashboard {...props} updateUser={this.updateUser} loggedIn={this.state.loggedIn} username={this.state.username} userID={this.state.userID} getUser={this.getUser} savedSurveys={this.state.savedSurveys}/>}
          />
          <Route 
            exact path="/search"
            render={(props) => <Search {...props} updateUser={this.updateUser} loggedIn={this.state.loggedIn} username={this.state.username} userID={this.state.userID} />}
          />
        </div>
      </Router>
    )
  }
}

export default App;
