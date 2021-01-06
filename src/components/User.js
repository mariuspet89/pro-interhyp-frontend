import React from 'react'
import { Link } from 'react-router-dom';
import userList from "../styles/users.module.css";

const User = ({user}) => {
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
		</tr>
	);
}

export default User;
