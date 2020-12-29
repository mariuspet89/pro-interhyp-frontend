import React, { Component } from "react";
import axios from "axios";
import Pagination from "./pagination";
class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      currentPage: 1,
      usersPerPage: 1,
    };
  }
  componentDidMount() {
    axios.get("http://localhost:8080/users").then((response) => {
      this.setState({ users: response.data });
    });
  }

  render() {
    const indexOfLastUser = this.state.currentPage * this.state.usersPerPage;
    const indexOfFirstUser = indexOfLastUser - this.state.usersPerPage;
    const currentUsers = this.state.users.slice(
      indexOfFirstUser,
      indexOfLastUser
    );
    //display the users(usersPerPage) when the user clicks a new number on the pagination section
    const paginate = (pageNumber) => this.setState({ currentPage: pageNumber });

    return (
      <div className="container">
        <h3 id="tableTitle">Users</h3>
        <div className="container">
          <table className="table-content">
            <thead>
              <tr>
                <th>Id</th>
                <th>First Name</th>
                <th>Name</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.firstName}</td>
                  <td>{user.name}</td>
                  <td>{user.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            usersPerPage={this.state.usersPerPage}
            totalUsers={this.state.users.length}
            paginate={paginate}
          />
        </div>
      </div>
    );
  }
}

export default Users;
