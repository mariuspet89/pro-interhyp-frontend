import React from 'react'
import { Link } from 'react-router-dom';
import userList from "../styles/users.module.css";
import Button from "react-bootstrap/Button";
import axios from "axios";



const User = ({user}) => {

	function deleteUser(id) {
			if (window.confirm("Are you sure you want to delete?")) {
				// delete it
				axios.delete( "http://20.52.146.224:8080/users/" + id)
					.then((response) => {
					console.log(response.data + " " + id);
				})
				window.location.reload();
			} else {
				// Do nothing!
				console.log("Delete, canceled");
			}
	}

  return (

		<tr>
			<td>{user.firstName}</td>
			<td>{user.lastName}</td>
			<td>{user.username}</td>
			<td>{user.details}</td>
			<td>{user.birthday}</td>
			<td>
			<Link to={{pathname: `/details/${user.id}`, state: {user: user}}} className={userList.detailsLink}>
				See Details
			</Link>
			</td>
			<td><Button variant="outline-danger" className="deleteButton" onClick={() => deleteUser(user.id)}>Delete</Button></td>
		</tr>
	);
}

export default User;
