import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Axios from "axios";
import Signup from "./pages/Signup.js";
import Login from "./pages/Login.js";
// import additional pages as created
import Dashboard from "./pages/Dashboard.js";

class App extends Component {
  state = {
    loggedIn: false,
    username: null
  };

  // gets user on mount
  componentDidMount() {
    this.getUser();
  };

  // function to get current user saved in the session
  getUser() {
    Axios.get("/user/").then(response => {
      console.log("Get user response: ")
      console.log(response.data)
      if(response.data.user) {
        console.log("Get User: there is a user saved in the server session: ")
        this.setState({
          loggedIn: true,
          username: response.data.user.username,
          firstName: response.data.user.firstName,
          lastName: response.data.user.lastName
        })
      } else {
        console.log("Get user: no user");
        this.setState({
          loggedIn: false,
          username: null
        })
      }
    });
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
            render={(props) => <Dashboard {...props} updateUser={this.updateUser} loggedIn={this.state.loggedIn} username={this.state.username}/>}
          />
        </div>
      </Router>
    )
  }
}

export default App;
