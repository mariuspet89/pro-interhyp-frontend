import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Users from "./components/User/Users";
import UserDetails from "./components/User/UserDetails";
import CreateUser from "./components/User/CreateUser";
import Navbar from "./components/Navbar";
import Departments from "./components/Departments";
import CreateDepartment from "./components/CreateDepartment"

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <header className="pih-header">
          <Switch>
            <Route path="/" exact component={Users} />
            <Route path="/details/:id" component={UserDetails} />
            <Route path="/create" component={CreateUser} />
            <Route path="/departments" component={Departments} />
            <Route path="/createDep" component={CreateDepartment}/>
          </Switch>
        </header>
      </div>
    </Router>
  );
}

export default App;
