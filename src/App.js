import './App.css';
import Users from "./components/users";
import React from "react";
import Hello from "./components/hellotext";

function App() {

    return (

        <div className="App">

            <header className="App-header">

                <Users/>
                {/*<Hello/>*/}
            </header>

        </div>
    );
}

export default App;
