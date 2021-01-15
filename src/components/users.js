import React, { Component } from "react";
import axios from "axios";
import Pagination from "react-js-pagination";
import User from "./User";
import userList from "../styles/users.module.css";
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';

class Users extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users: [],
			activePage: 1,
			usersPerPage: 10,
			currentUsers: 1,
			sortFirstName: false,
			sortLastName: false,
			sortUserName: false,
			sortJob: false,
			sortBirthday: false,
		};
	}

	// updateUsers = () => {
	// 	axios.get("http://20.52.146.224:8080/users").then((response) => {
	// 		this.setState({ users: response.data });
	// 	});
	// }
	updateUsers = () => {
			axios.get("http://127.0.0.1:8080/users").then((response) => {
				this.setState({ users: response.data });
			});
		}

	componentDidMount() {
		this.updateUsers()
	}

	handleSort = (e) => {
		switch (e.target.parentElement.id) {
			// check for true/false then call BE accordingly for list of sorted users;
			// setState with the updated users, then inverse the value of sort field
			case "firstName":
				this.setState({ sortFirstName: !this.state.sortFirstName });
				break;
			case "lastName":
				this.setState({ sortLastName: !this.state.sortLastName });
				break;
			case "username":
				this.setState({ sortUsername: !this.state.sortUsername });
				break;
			case "job":
				this.setState({ sortJob: !this.state.sortJob });
				break;
			case "birthday":
				this.setState({ sortBirthday: !this.state.sortBirthday });
				break;
			default:
				return;
		}
	};

	handlePageChange(pageNumber) {
		console.log(`active page is ${pageNumber}`);
		this.setState({ activePage: pageNumber });
	}

	deleteUser = (id, company) => {
			if (window.confirm("Are you sure you want to delete?")) {
				try {
					axios.delete( "http://20.52.146.224:8080/users/" + id + "/" + company)	
						.then(() => {
							this.updateUsers();
					})
				} catch(err) {
					console.log(err)
				}
			} else {
				console.log("Delete, cancelled");
			}
	}

	render() {
		const indexOfLastUser = this.state.activePage * this.state.usersPerPage;
		const indexOfFirstUser = indexOfLastUser - this.state.usersPerPage;
		const currentUsers = this.state.users.slice(
			indexOfFirstUser,
			indexOfLastUser
		);

		return (
			<>
				<h2>Users</h2>
				<div>
					<table className={userList.tableContent}>
						<thead>
							<tr>
								<th id='firstName'>
									First Name
									<span
										className={userList.sortArrow}
										onClick={(e) => this.handleSort(e)}>
										{this.state.sortFirstName ? "▲" : "▼"}
									</span>
								</th>
								<th id='lastName'>
									Last Name
									<span
										className={userList.sortArrow}
										onClick={(e) => this.handleSort(e)}>
										{this.state.sortLastName ? "▲" : "▼"}
									</span>
								</th>
								<th id='username'>
									Username
									<span
										className={userList.sortArrow}
										onClick={(e) => this.handleSort(e)}>
										{this.state.sortUsername ? "▲" : "▼"}
									</span>
								</th>
								<th id='job'>
									Job
									<span
										className={userList.sortArrow}
										onClick={(e) => this.handleSort(e)}>
										{this.state.sortJob ? "▲" : "▼"}
									</span>
								</th>
								<th id='birthday'>
									Birthday
									<span
										className={userList.sortArrow}
										onClick={(e) => this.handleSort(e)}>
										{this.state.sortBirthday ? "▲" : "▼"}
									</span>
								</th>
								<th>Details</th>
								<th>
								<Link
									to={{ pathname: `/create` }}
									className={userList.detailsLink}>
									<Button  variant="outline-light" size="lg"> Add new user</Button>
								</Link>
								</th>
							</tr>
						</thead>
						<tbody>
							{currentUsers.map((user) => (
								<User key={user.id} user={user} deleteUser={this.deleteUser} />
							))}
						</tbody>
					</table>
				</div>
				<Pagination
					activePage={this.state.activePage}
					itemsCountPerPage={this.state.usersPerPage}
					totalItemsCount={this.state.users.length}
					pageRangeDisplayed={5}
					onChange={this.handlePageChange.bind(this)}
				/>
			</>
		);
	}
}

export default Users;
