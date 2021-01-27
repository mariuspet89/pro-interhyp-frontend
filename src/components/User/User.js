import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Users.css";
import Button from "react-bootstrap/Button";

const User = ({ user, deleteUser }) => {
  const handleDelete = (id, company) => {
    deleteUser(id, company);
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
          className="delete-button"
          onClick={() => handleDelete(user.id, user.company)}
        >
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default User;
