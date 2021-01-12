import React from 'react'
import { Link } from 'react-router-dom';
import userList from "../styles/users.module.css";
import Button from "react-bootstrap/Button";

const User = ({user, deleteUser}) => {

	const handleDelete = (id) => {
		deleteUser(id)
	}

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
					className={userList.detailsLink}>
					See Details
				</Link>
			</td>
			<td>
				<Button
					variant='outline-danger'
					className='deleteButton'
					onClick={() => handleDelete(user.id)}>
					Delete
				</Button>
			</td>
		</tr>
	);
}

export default User;
