import React from 'react';
import "./i18n";
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Header from "./components/Header/Header"
import Placeholder from "./components/Placeholder";
import Laundries from "./components/Laundries/Laundries";
import Laundry from "./components/Laundry/Laundry";
import CheckOrder from "./components/CheckOrder/CheckOrder";
import AdminPanel from "./components/AdminPanel/AdminPanel";
import LogIn from "./components/AdminPanel/LogIn/LogIn";

export default class App extends React.Component {
    render() {

        return (
            <div className="App">
                <Header/>
                <div style={contentStyle}>
                    <Router>
                        <Switch>
                            <Route exact path='/' component={Laundries}/>
                            <Route exact path='/laundries' component={Laundries}/>
                            <Route exact path='/check' component={CheckOrder}/>
                            <Route exact path='/laundries/:id' component={Laundry}/>
                            <Route exact path='/about' component={Placeholder}/>
                            <Route exact path='/contacts' component={Placeholder}/>
                            <Route exact path='/admin' component={AdminPanel}/>
                            <Route exact path='/admin/login' component={LogIn}/>
                            <Route component={Placeholder}/>
                        </Switch>
                    </Router>
                </div>
                <footer style={footerStyle}>
                    <p>email: oleksii.sihalov@nure.ua</p>
                </footer>
            </div>
        );
    }
}

const contentStyle = {
    'minHeight': 'calc(100vh - 80px - 60px)'
};

const footerStyle = {
    height: '60px',
    'fontSize':'16px',
    'fontFamily': '-apple-system,sans-serif'
}