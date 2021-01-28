import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Users.css";
import Button from "react-bootstrap/Button";
import Axios from "axios";

const User = ({ user, deleteUser, department, onDepartment }) => {
  const handleDelete = (id, company) => {
    deleteUser(id, company);
  };

  const handleAdd = (id) => {
    console.log("data: ", {
      data: { department: department.department, userId: id },
    });
    Axios.post("http://20.71.162.122:8080/department", {
      department: department.department,
      userId: id,
    }).then((response) => console.log("single post response: ", response));
  };

  return (
    <tr>
      <td>{user.firstName}</td>
      <td>{user.lastName}</td>
      <td>{user.username}</td>
      <td>{user.details}</td>
      <td>{user.birthday}</td>
      <td>
        <Link
          to={{ pathname: `/details/${user.id}`, state: { user: user } }}
          className="details-link"
        >
          See Details
        </Link>
      </td>
      <td>
        <Button
          variant="outline-danger"
          style={{ display: onDepartment ? "none" : "inline" }}
          className="delete-button"
          onClick={() => handleDelete(user.id, user.company)}
        >
          Delete
        </Button>
        <Button
          variant="outline-success"
          style={{ display: !onDepartment ? "none" : "inline" }}
          className="delete-button"
          onClick={() => handleAdd(user.id)}
        >
          Add to department
        </Button>
      </td>
    </tr>
  );
};

export default User;
