import React, { Component } from "react";
import axios from "axios";
import Pagination from "react-js-pagination";
import User from "./User";
import userList from "../styles/users.module.css";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      currentUsers: 1,
      activePage: 1,
      usersPerPage: 10,
      sortFirstName: false,
      sortLastName: false,
      sortUserName: false,
      sortDetails: false,
      sortBirthday: false,
    };
  }
  setUserPerPage(e) {
    this.setState({ usersPerPage: e.target.value });
  }

  updateUsers = () => {
    axios.get("http://20.52.146.224:8080/users").then((response) => {
      this.setState({ users: response.data });
    });
  };

  componentDidMount() {
    this.updateUsers();
  }

  sortField = (field) => {
    if (this.state[`sort${field.charAt(0).toUpperCase() + field.slice(1)}`]) {
      this.setState({
        users: this.state.users.sort((a, b) =>
          a[field]?.toUpperCase() > b[field]?.toUpperCase() ? -1 : 1
        ),
      });
    } else {
      this.setState({
        users: this.state.users.sort((a, b) =>
          a[field]?.toUpperCase() > b[field]?.toUpperCase() ? 1 : -1
        ),
      });
    }
  };

  handleSort = (e) => {
    switch (e.target.parentElement.id) {
      case "firstName":
        this.sortField(e.target.parentElement.id);
        this.setState({ sortFirstName: !this.state.sortFirstName });
        break;
      case "lastName":
        this.sortField(e.target.parentElement.id);
        this.setState({ sortLastName: !this.state.sortLastName });
        break;
      case "username":
        this.sortField(e.target.parentElement.id);
        this.setState({ sortUsername: !this.state.sortUsername });
        break;
      case "details":
        this.sortField(e.target.parentElement.id);
        this.setState({ sortDetails: !this.state.sortDetails });
        break;
      case "birthday":
        this.sortField(e.target.parentElement.id);
        this.setState({ sortBirthday: !this.state.sortBirthday });
        break;
      default:
        return;
    }
  };

  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber });
  }

  deleteUser = (id, company) => {
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        axios
          .delete("http://20.52.146.224:8080/users/" + id + "/" + company)
          .then(() => {
            this.updateUsers();
          });
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("Delete, cancelled");
    }
  };

  render() {
    const indexOfLastUser = this.state.activePage * this.state.usersPerPage;
    const indexOfFirstUser = indexOfLastUser - this.state.usersPerPage;
    const currentUsers = this.state.users.slice(
      indexOfFirstUser,
      indexOfLastUser
    );

    return (
      <>
        <h2>Users</h2>
        <div>
          <table className={userList.tableContent}>
            <thead>
              <tr>
                <th id="firstName">
                  First Name
                  <span
                    className={userList.sortArrow}
                    onClick={(e) => this.handleSort(e)}
                  >
                    {this.state.sortFirstName ? "▲" : "▼"}
                  </span>
                </th>
                <th id="lastName">
                  Last Name
                  <span
                    className={userList.sortArrow}
                    onClick={(e) => this.handleSort(e)}
                  >
                    {this.state.sortLastName ? "▲" : "▼"}
                  </span>
                </th>
                <th id="username">
                  Username
                  <span
                    className={userList.sortArrow}
                    onClick={(e) => this.handleSort(e)}
                  >
                    {this.state.sortUsername ? "▲" : "▼"}
                  </span>
                </th>
                <th id="details">
                  Job
                  <span
                    className={userList.sortArrow}
                    onClick={(e) => this.handleSort(e)}
                  >
                    {this.state.sortJob ? "▲" : "▼"}
                  </span>
                </th>
                <th id="birthday">
                  Birthday
                  <span
                    className={userList.sortArrow}
                    onClick={(e) => this.handleSort(e)}
                  >
                    {this.state.sortBirthday ? "▲" : "▼"}
                  </span>
                </th>
                <th>Details</th>
                <th>
                  <label for="usersPerPage">Users Per Page</label>
                  <select
                    name="usersPerPage"
                    value={this.state.usersPerPage}
                    onChange={(e) => this.setUserPerPage(e)}
                  >
                    <option>5</option>
                    <option>10</option>
                    <option>15</option>
                  </select>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <User key={user.id} user={user} deleteUser={this.deleteUser} />
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={this.state.usersPerPage}
          totalItemsCount={this.state.users.length}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange.bind(this)}
        />
      </>
    );
  }
}

export default Users;
