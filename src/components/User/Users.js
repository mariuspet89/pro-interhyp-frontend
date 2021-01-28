import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Pagination from "react-js-pagination";
import User from "./User";
import "../../styles/Users.css";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { SearchContext } from "../searchContext";

function Users(department) {
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
    birthdaySort: [],
  });
  const [searchValue, setSearchValue] = useContext(SearchContext);

  const setUserPerPage = (e) => {
    setState({ ...state, usersPerPage: parseInt(e.target.value) });
  };

  const updateUsers = () => {
    axios.get("http://20.71.162.122:8080/users").then((response) => {
      setState({ ...state, users: response.data });
    });
  };

  let onDepartment = false;
  console.log("ondepartment: ", onDepartment, window.location.href);
  if (window.location.href.includes("department")) {
    onDepartment = true;
    console.log("ondepartment: ", onDepartment);
  }

  useEffect(() => {
    updateUsers();
  }, []);

  useEffect(() => {
    const filteredUser = state.users.filter(
      (user) =>
        user.firstName
          .toUpperCase()
          .includes(searchValue.replace(/[^a-zA-Z ]/g, "").toUpperCase()) ||
        user.lastName
          .toUpperCase()
          .includes(searchValue.replace(/[^a-zA-Z ]/g, "").toUpperCase())
    );

    setState({ ...state, filteredUsers: filteredUser });
  }, [searchValue]);

  const sortField = (field) => {
    if (state.birthdaySort.length > 0) {
      if (state[`sort${field.charAt(0).toUpperCase() + field.slice(1)}`]) {
        setState({
          ...state,
          users: state.birthdaySort.sort((a, b) =>
            a[field]?.toUpperCase() > b[field]?.toUpperCase() ? -1 : 1
          ),
        });
      } else {
        setState({
          ...state,
          users: state.birthdaySort.sort((a, b) =>
            a[field]?.toUpperCase() > b[field]?.toUpperCase() ? 1 : -1
          ),
        });
      }
    } else {
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
    }
  };

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
        setState({
          ...state,
          sortBirthday: !state.sortBirthday,
          birthdaySort: [],
        });
        break;
      default:
        return;
    }
  };

  const handlePageChange = (pageNumber) => {
    setState({ ...state, activePage: pageNumber });
  };

  const setStartDate = (e) => {
    const startDate = e.target.value;
    console.log(typeof e.target.value);
    setState({ ...state, startDate: startDate });
  };

  const setEndDate = (e) => {
    const endDate = e.target.value;
    setState({ ...state, endDate: endDate });
  };

  const sortByDate = () => {
    if (state.startDate > state.endDate) {
      alert("Start Date Newer Than End Date");
    } else if (state.startDate == null || state.endDate == null) {
      alert("Select range");
    } else {
      let dateFilter = state.users.filter(
        (user) =>
          user.birthday >= state.startDate && user.birthday <= state.endDate
      );
      const birthdaySort = dateFilter.sort((a, b) =>
        a.birthday > b.birthday ? 1 : -1
      );
      if (birthdaySort.length == 0) {
        alert("No user found between this dates");
      } else {
        setState({
          ...state,
          birthdaySort: dateFilter.sort((a, b) =>
            a.birthday > b.birthday ? 1 : -1
          ),
        });
      }
    }
  };

  const deleteUser = (id, company) => {
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        axios
          .delete("http://20.71.162.122:8080/users/" + id + "/" + company)
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

  searchValue !== ""
    ? (currentUsers = state.filteredUsers.slice(
        indexOfFirstUser,
        indexOfLastUser
      ))
    : state.birthdaySort.length > 0
    ? (currentUsers = state.birthdaySort.slice(
        indexOfFirstUser,
        indexOfLastUser
      ))
    : (currentUsers = state.users.slice(indexOfFirstUser, indexOfLastUser));

  return (
    <>
      <h2>Users</h2>
      <div>
        <label htmlFor="usersPerPage">Users Per Page </label>
        <select
          name="usersPerPage"
          value={state.usersPerPage}
          onChange={setUserPerPage}
        >
          <option>5</option>
          <option>10</option>
          <option>50</option>
          <option>100</option>
        </select>
      </div>
      <div>
        <table className="table-content">
          <thead>
            <tr>
              <th id="firstName">
                First Name
                <span className="sort-arrow" onClick={handleSort}>
                  {state.sortFirstName ? "▲" : "▼"}
                </span>
              </th>
              <th id="lastName">
                Last Name
                <span className="sort-arrow" onClick={handleSort}>
                  {state.sortLastName ? "▲" : "▼"}
                </span>
              </th>
              <th id="username">
                Username
                <span className="sort-arrow" onClick={handleSort}>
                  {state.sortUsername ? "▲" : "▼"}
                </span>
              </th>
              <th id="details">
                Job
                <span className="sort-arrow" onClick={handleSort}>
                  {state.sortDetails ? "▲" : "▼"}
                </span>
              </th>
              <th id="birthday">
                Birthday
                <span className="sort-arrow" onClick={handleSort}>
                  {state.sortBirthday ? "▲" : "▼"}
                </span>
                {state.sortBirthday && (
                  <div>
                    <input
                      className="date-picker"
                      value={state.startDate}
                      type="date"
                      onChange={setStartDate}
                    />
                    <br />
                    <input
                      className="date-picker"
                      type="date"
                      value={state.endDate}
                      onChange={setEndDate}
                    />
                    <br />
                    <Button onClick={sortByDate}>Search</Button>
                  </div>
                )}
              </th>
              <th>Details</th>
              <th>
                <Link to={{ pathname: `/create` }} className="details-link">
                  <Button
                    variant="outline-light"
                    size="lg"
                    style={{ display: onDepartment ? "none" : "inline" }}
                  >
                    {" "}
                    Add new user
                  </Button>
                </Link>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <User
                key={user.id}
                user={user}
                deleteUser={deleteUser}
                onDepartment={onDepartment}
                department={department}
              />
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        activePage={state.activePage}
        itemsCountPerPage={state.usersPerPage}
        totalItemsCount={
          searchValue !== ""
            ? state.filteredUsers.length
            : state.birthdaySort.length > 0
            ? state.birthdaySort.length
            : state.users.length
        }
        pageRangeDisplayed={5}
        onChange={handlePageChange}
      />
    </>
  );
}

export default Users;
