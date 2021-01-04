import React, { Component } from "react";
import axios from "axios";
import Pagination from "react-js-pagination";
class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      activePage: 1,
      usersPerPage: 10,
      currentUsers: 1,
    };
  }
  componentDidMount() {
    axios.get("http://localhost:8080/users").then((response) => {
      this.setState({ users: response.data });
    });
  }

  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({activePage: pageNumber});
  }

  render() {

    const indexOfLastUser = this.state.activePage * this.state.usersPerPage;
    const indexOfFirstUser = indexOfLastUser - this.state.usersPerPage;
    const currentUsers = this.state.users.slice(
        indexOfFirstUser,
        indexOfLastUser
    );

    return (
      <div className="container">
        <h3 id="tableTitle">Users</h3>
        <div className="container">
          <table className="table-content">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
                <th>Details</th>
                <th>Birthday</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.username}</td>
                  <td>{user.details}</td>
                  <td>{user.birthday}</td>
                </tr>
              ))}
            </tbody>
          </table>
     
        </div>
        <div>
          <Pagination
              activePage={this.state.activePage}
              itemsCountPerPage={this.state.usersPerPage}
              totalItemsCount={this.state.users.length}
              pageRangeDisplayed={5}
              onChange={this.handlePageChange.bind(this)}
          />
        </div>
      </div>
    );
  }
}

export default Users;
