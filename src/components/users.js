import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "react-js-pagination";
import User from "./User";
import userList from "../styles/users.module.css";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

function Users() {
  const [state, setState] = useState({
    users: [],
    currentUsers: 1,
    activePage: 1,
    usersPerPage: 10,
    sortFirstName: false,
    sortLastName: false,
    sortUserName: false,
    sortDetails: false,
    sortBirthday: false,
    searchValue: "",
    filteredUsers: [],
  });

  const setUserPerPage = (e) => {
    setState({ ...state, usersPerPage: parseInt(e.target.value) });
  };
  console.log(state);

  const updateUsers = () => {
    axios.get("http://20.71.162.122:8080/users").then((response) => {
      setState({ ...state, users: response.data });
    });
  };

  useEffect(() => {
    axios.get("http://20.52.146.224:8080/users/").then((response) => {
      setState({ ...state, users: response.data });
      console.log(response.data);
    });
    console.log(state);
  }, []);

  const sortField = (field) => {
    if (state[`sort${field.charAt(0).toUpperCase() + field.slice(1)}`]) {
      setState({
        ...state,
        users: state.users.sort((a, b) =>
          a[field]?.toUpperCase() > b[field]?.toUpperCase() ? -1 : 1
        ),
      });
    } else {
      setState({
        ...state,
        users: state.users.sort((a, b) =>
          a[field]?.toUpperCase() > b[field]?.toUpperCase() ? 1 : -1
        ),
      });
    }
  };
  // searchUser(e) {
  //   this.setState({ searchValue: e.target.value });
  //   console.log(e.target.value);
  //   const filteredUser = this.state.users.filter((user) =>
  //     user.firstName.toUpperCase().includes(e.target.value.toUpperCase())
  //   );
  //   this.setState({ filteredUsers: filteredUser });
  //   console.log(this.state.users.map((x) => Object.values(x)));
  // }

  const handleSort = (e) => {
    switch (e.target.parentElement.id) {
      case "firstName":
        sortField(e.target.parentElement.id);
        setState({ ...state, sortFirstName: !state.sortFirstName });
        break;
      case "lastName":
        sortField(e.target.parentElement.id);
        setState({ ...state, sortLastName: !state.sortLastName });
        break;
      case "username":
        sortField(e.target.parentElement.id);
        setState({ ...state, sortUsername: !state.sortUsername });
        break;
      case "details":
        sortField(e.target.parentElement.id);
        setState({ ...state, sortDetails: !state.sortDetails });
        break;
      case "birthday":
        sortField(e.target.parentElement.id);
        setState({ ...state, sortBirthday: !state.sortBirthday });
        break;
      default:
        return;
    }
  };

  const handlePageChange = (pageNumber) => {
    setState({ ...state, activePage: pageNumber });
  };

  const deleteUser = (id, company) => {
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        axios
          .delete("http://20.52.146.224:8080/users/" + id + "/" + company)
          .then(() => {
            updateUsers();
          });
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("Delete, cancelled");
    }
  };
  const indexOfLastUser = state.activePage * state.usersPerPage;
  const indexOfFirstUser = indexOfLastUser - state.usersPerPage;
  let currentUsers = state.users.slice(indexOfFirstUser, indexOfLastUser);

  if (state.searchValue !== "") {
    currentUsers = state.filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  }
  return (
    <>
      <h2>Users</h2>
      {/* <input type="text" onChange={(e) => searchUser(e)} /> */}
      <div>
        <label htmlFor="usersPerPage">Users Per Page </label>
        <select
          name="usersPerPage"
          value={state.usersPerPage}
          onChange={setUserPerPage}
        >
          <option>5</option>
          <option>10</option>
          <option>15</option>
        </select>
      </div>
      <div>
        <table className={userList.tableContent}>
          <thead>
            <tr>
              <th id="firstName">
                First Name
                <span className={userList.sortArrow} onClick={handleSort}>
                  {state.sortFirstName ? "▲" : "▼"}
                </span>
              </th>
              <th id="lastName">
                Last Name
                <span className={userList.sortArrow} onClick={handleSort}>
                  {state.sortLastName ? "▲" : "▼"}
                </span>
              </th>
              <th id="username">
                Username
                <span className={userList.sortArrow} onClick={handleSort}>
                  {state.sortUsername ? "▲" : "▼"}
                </span>
              </th>
              <th id="details">
                Job
                <span className={userList.sortArrow} onClick={handleSort}>
                  {state.sortDetails ? "▲" : "▼"}
                </span>
              </th>
              <th id="birthday">
                Birthday
                <span className={userList.sortArrow} onClick={handleSort}>
                  {state.sortBirthday ? "▲" : "▼"}
                </span>
              </th>
              <th>Details</th>

              <th>
                <Link
                  to={{ pathname: `/create` }}
                  className={userList.detailsLink}
                >
                  <Button variant="outline-light" size="lg">
                    {" "}
                    Add new user
                  </Button>
                </Link>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <User key={user.id} user={user} deleteUser={deleteUser} />
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        activePage={state.activePage}
        itemsCountPerPage={state.usersPerPage}
        totalItemsCount={state.users.length}
        pageRangeDisplayed={5}
        onChange={handlePageChange}
      />
    </>
  );
}

export default Users;
