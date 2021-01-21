import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Users from "./components/users";
import UserDetails from "./components/UserDetails";
import CreateUser from "./components/CreateUser";
import Navbar from "./components/Navbar";
import Departments from "./components/Departments";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <header className="App-header">
          <Switch>
            <Route path="/" exact component={Users} />
            <Route path="/details/:id" component={UserDetails} />
            <Route path="/create" component={CreateUser} />
            <Route path="/departments" component={Departments} />
          </Switch>
        </header>
      </div>
    </Router>
  );
}

export default App;
