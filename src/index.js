import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import Explore from './Explore';
import Tags from './Tags';
import Navbar from './Navbar';
import logo from './logo.svg';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    BrowserRouter,
    Route
} from 'react-router-dom'

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo"/>
                        <p>
                            BTCN03
                        </p>
                        <Navbar/>
                    </header>
                    <div className="container">
                        <Route exact path="/" component={Explore}/>
                        <Route path="/tags" component={Tags}/>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));