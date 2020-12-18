import React, {Component} from "react";
import axios from "axios";

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
                console.log(response.data)
            })
    }

    render() {
        return (
            <div className="container">
                <h3>Users</h3>
                <div className="container">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>First Name</th>
                            <th>Name</th>
                            <th>Details</th>


                        </tr>
                        </thead>
                        <tbody>{this.state.users.map(user =>
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.firstName}</td>
                                <td>{user.name}</td>
                                <td>{user.details}</td>

                            </tr>
                        )}
                        </tbody>

                    </table>
                </div>
            </div>)
    }
}

export default Users;