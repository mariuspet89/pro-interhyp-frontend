import React, { Component } from "react";
import axios from "axios";
import Pagination from "react-js-pagination";
import User from "./User";
import userList from '../styles/users.module.css'

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
					sortUsername: false,
					sortJob: false,
					sortBirthday: false,
				};
 		}

  componentDidMount() {
    axios.get("http://20.52.146.224:8080/users").then((response) => {
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
		const currentUsers = this.state.users.slice(indexOfFirstUser,indexOfLastUser);

		const handleSort = (e) => {
			switch (e.target.parentElement.id) {
				case "firstName":
					// call BE & check for true/false before changing state
					this.setState({ sortFirstName: !this.state.sortFirstName });
					break;
				case "lastName":
					// call BE & check for true/false before changing state
					this.setState({ sortLastName: !this.state.sortLastName });
					break;
				case "username":
					// call BE & check for true/false before changing state
					this.setState({ sortUsername: !this.state.sortUsername });
					break;
				case "job":
					// call BE & check for true/false before changing state
					this.setState({ sortJob: !this.state.sortJob });
					break;
				case "birthday":
					// call BE & check for true/false before changing state
					this.setState({ sortBirthday: !this.state.sortBirthday });
					break;
				default:
					return;
			}
		}

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
												onClick={(e) => handleSort(e)}>
												{this.state.sortFirstName ? "▲" : "▼"}
											</span>
										</th>
										<th id='lastName'>
											Last Name
											<span
												className={userList.sortArrow}
												onClick={(e) => handleSort(e)}>
												{this.state.sortLastName ? "▲" : "▼"}
											</span>
										</th>
										<th id='username'>
											Username
											<span
												className={userList.sortArrow}
												onClick={(e) => handleSort(e)}>
												{this.state.sortUsername ? "▲" : "▼"}
											</span>
										</th>
										<th id='job'>
											Job
											<span
												className={userList.sortArrow}
												onClick={(e) => handleSort(e)}>
												{this.state.sortJob ? "▲" : "▼"}
											</span>
										</th>
										<th id='birthday'>
											Birthday
											<span
												className={userList.sortArrow}
												onClick={(e) => handleSort(e)}>
												{this.state.sortBirthday ? "▲" : "▼"}
											</span>
										</th>
										<th>Details</th>
										<th/>
									</tr>
								</thead>
								<tbody>
									{currentUsers.map((user) => (
										<User key={user.id} user={user} />
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
