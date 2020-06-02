import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';
import Header from './components/Layout/Header/Header';
import Landing from './components/Landing/Landing';
import Installations from './components/Installations/Installations';
import Installation from './components/Installation/Installation';
import Write from './components/Write/Write';

function App() {
	return (
		<Router>
			<div className="App">
				<Header />
				<main>
					<Route exact path="/" component={Landing} />
					<Route exact path="/installations" component={Installations} />
					<Route exact path="/installation" component={Installation} />
					<Route exact path="/write" component={Write} />
				</main>
			</div>
		</Router>
	);
}

export default App;
