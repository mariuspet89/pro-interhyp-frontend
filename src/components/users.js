import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Pagination from "react-js-pagination";
import User from "./User";
import userList from "../styles/users.module.css";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { SearchContext } from "./searchContext";

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
        // sortField(e.target.parentElement.id);
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

  const deleteUser = (id, company) => {
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        axios
          .delete("http://20.71.162.122:8080/users" + id + "/" + company)
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
  let startDate = "";
  let endDate = "";

  if (searchValue !== "") {
    currentUsers = state.filteredUsers;
  } else if (state.birthdaySort.length > 0) {
    currentUsers = state.birthdaySort.slice(indexOfFirstUser, indexOfLastUser);
  }

  const setStartDate = (e) => {
    startDate = e.target.value;
    console.log(e.target.value);
    console.log(state.users[0].birthday);
    console.log(state.users[0].birthday > startDate);
  };
  const setEndDate = (e) => {
    endDate = e.target.value;
    console.log(startDate > endDate);
    if (startDate > endDate) {
      alert("Start Date Newer Than End Date");
    } else {
      let dateFilter = state.users.filter(
        (user) => user.birthday >= startDate && user.birthday <= endDate
      );
      setState({
        ...state,
        birthdaySort: dateFilter.sort((a, b) =>
          a.birthday > b.birthday ? 1 : -1
        ),
      });
    }
  };
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
                {state.sortBirthday && (
                  <div>
                    <input required="" type="date" onChange={setStartDate} />
                    <br />
                    <input type="date" required onChange={setEndDate} />
                    <br />
                  </div>
                )}
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
        totalItemsCount={
          searchValue !== "" ? state.filteredUsers.length : state.users.length
        }
        pageRangeDisplayed={5}
        onChange={handlePageChange}
      />
    </>
  );
}

export default Users;
