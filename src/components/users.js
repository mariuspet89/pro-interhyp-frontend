import React, {Component} from "react";
import axios from "axios";
import User from "./User";
import tableStyle from '../styles/users.module.css'

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
    }

    componentDidMount() {
        axios.get("http://localhost:8080/users")

            .then(response => {
                this.setState({users: response.data})
            })
    }

    render() {
        return (
					<>
						<h2>Users</h2>
						<div>
							<table className={tableStyle.tableContent}>
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
									{this.state.users.map((user) => (
										<User key={user.id} user={user} />
									))}
								</tbody>
							</table>
						</div>
					</>
				);
    }
}

export default Users;