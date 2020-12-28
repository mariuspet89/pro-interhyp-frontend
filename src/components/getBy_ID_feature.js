import React, {Component} from "react";
import axios from "axios";

class UserById extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
    }

    componentDidMount() {
        axios.get("http://localhost:8080/users/1")

            .then(response => {
                this.setState({users: response.data})
                console.log(response.data)
            })
    }

    render() {
        return (

            <div>
                <p> {this.state.data} </p>

            </div>
        )
    }
}
export default UserById;