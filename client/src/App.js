import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";
import Signup from "./pages/Signup.js";
import Login from "./pages/Login.js";
// Import additional pages as created.
import Dashboard from "./pages/Dashboard.js";
import Search from "./pages/Search.js";
import Create from "./pages/Create.js";

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

  // Gets user on mount.
  componentDidMount() {
    this.getUser();
  };

  // Function to get current user saved in the session.
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

  getSurveys = this.getSurveys.bind(this);

  // This function will save the userObject into the state.
  updateUser(userObject) {
    console.log(userObject);
    this.setState(userObject)
  }
  
  updateUser = this.updateUser.bind(this);

  updateRedirect(userObject) {
    this.setState(userObject, () => {
      document.location.href = "/dashboard"
    });
  }

  updateRedirect = this.updateRedirect.bind(this)

  render() {
    return (
      <Router>
        <div>
          <Route 
            exact path="/" 
            // This will pass the updateUser function as props into the Login component that is called in this route.
            render={(props) => <Login {...props} updateUser={this.updateUser}/>}
          />
          <Route
            exact path="/signup"
            render={(props) => <Signup {...props} updateUser={this.updateUser}/>}
          />
          <Route 
            exact path="/dashboard" 
            // This will pass the updateUser function as props into the Login component that is called in this route.
            render={(props) => <Dashboard {...props} updateUser={this.updateUser} loggedIn={this.state.loggedIn} username={this.state.username} userID={this.state.userID} getUser={this.getUser} getSurveys={this.getSurveys} savedSurveys={this.state.savedSurveys}/>}
          />
          <Route 
            exact path="/search"
            render={(props) => <Search {...props} updateUser={this.updateUser} updateRedirect={this.updateRedirect}loggedIn={this.state.loggedIn} username={this.state.username} userID={this.state.userID} />}
          />
          <Route 
            exact path="/create"
            render={(props) => <Create {...props} updateUser={this.updateUser} loggedIn={this.state.loggedIn} username={this.state.username} userID={this.state.userID} />}
          />
        </div>
      </Router>
    )
  }
}

export default App;
