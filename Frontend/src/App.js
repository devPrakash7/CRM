import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import Dashboard from './components/pages/Dashboard'
 

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/admin/dashboard" component={Dashboard} />
                <Route path="/" component={Login} />
            </Switch>
        </Router>
    );
};

export default App;
