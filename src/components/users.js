import React, {Component} from "react";
import axios from "axios";
import User from "./User";

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
            <div className="container">
                <h3 id="tableTitle">Users</h3>
                <div className="container">
                    <table className="table-content">
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>First Name</th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Birthday</th>
                            <th>Details</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.users.map(user =>
                            <User key={user.id} user={user}/>
                        )}
                        </tbody>

                    </table>
                </div>
            </div>)
    }
}

export default Users;