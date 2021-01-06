import './App.css';
import React from "react";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Users from "./components/users";
import UserDetails from './components/UserDetails';
function App() {

    return (
			<Router>
				<div className='App'>
					<header className='App-header'>
						<Switch>
							<Route path='/' exact component={Users} />
							<Route path='/details/:id' component={UserDetails} />
						</Switch>
					</header>
				</div>
			</Router>
		);
}

export default App;
