import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Sidebar from './components/sidebar/SideNavbar';
import Dashboard from './components/pages/Dashboard';
import WorkManagement from './components/pages/WorkManagement';
import General from './components/pages/General/General';
import DepartmentManagement from './components/pages/General/DepartmentManagement';
import EmployeeManagement from './components/pages/General/EmployeeManagement';
import RoleManagement from './components/pages/General/RoleManagement';
import Attendance from './components/pages/Attendance';
import WorkAnalysis from './components/pages/WorkAnalysis';
import Payroll from './components/pages/Payroll';
import './App.css';



const App = () => {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <main>
          <Switch>
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/work-management" component={WorkManagement} />
            <Route path="/general" exact component={General} />
            <Route path="/general/department-management" component={DepartmentManagement} />
            <Route path="/general/employee-management" component={EmployeeManagement} />
            <Route path="/general/role-management" component={RoleManagement} />
            <Route path="/attendance" component={Attendance} />
            <Route path="/work-analysis" component={WorkAnalysis} />
            <Route path="/payroll" component={Payroll} />
          </Switch>
        </main>
      </div>
    </Router>
  );
};

export default App;
