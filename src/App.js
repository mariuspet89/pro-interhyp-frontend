import './App.css';
import Users from "./components/users";
import React from "react";
import Hello from "./components/hellotext";
import UserById from "./components/getBy_ID_feature";

function App() {

    return (

        <div className="App">

            <header className="App-header">

                <Users/>
                {/*<UserById/>*/}
                {/*<Hello/>*/}
            </header>

        </div>
    );
}

export default App;
