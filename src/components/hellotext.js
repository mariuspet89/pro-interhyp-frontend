import axios from 'axios';
import React, {Component} from 'react';

class Hello extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null
        };
    }

    componentDidMount() {

        axios.get("http://localhost:8080/hello/world")

            .then(response => {
                this.setState({
                    data: response.data
                })
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

export default Hello;