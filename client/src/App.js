import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Signup from "./pages/Signup.js";
import Login from "./pages/Login.js";
// import additional pages as created

function App() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Login} />
        <Route exact path="/signup" component={Signup} />
      </div>
    </Router>
  );
}

export default App;
