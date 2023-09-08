<<<<<<< HEAD
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
=======
import React from "react";
import styled from "styled-components";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";
export default function App() {
  return (
    <Div>
      <Sidebar />
      <Dashboard />
    </Div>
  );
}
>>>>>>> e15c969b2f01d1054cb0e316d40b40bc5bd79136

const Div = styled.div`
  position: relative;
`;
