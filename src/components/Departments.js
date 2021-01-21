import React, { Component } from "react";
import axios from "axios";

class Departments extends Component {
  componentDidMount() {
    axios
      .get(
        "http://20.52.146.224:8080/users/003952ec-4064-4668-9e98-6dc0372a8d16"
      )
      .then((response) => {
        console.log(response.data);
      });
  }
  render() {
    return <h3> under construction </h3>;
  }
}

export default Departments;
