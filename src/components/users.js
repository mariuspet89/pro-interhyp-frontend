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
		
        return (
					<>
						<h2>Users</h2>
						<div>
							<table className={userList.tableContent}>
								<thead>
									<tr>
										<th>First Name</th>
										<th>Last Name</th>
										<th>Username</th>
										<th>Job</th>
										<th>Birthday</th>
										<th>Details</th>
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
								className="pagination"
								onChange={this.handlePageChange.bind(this)}
							/>
					</>
				);
		}
	}

export default Users;
