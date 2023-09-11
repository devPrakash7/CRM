import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard.jsx';
import WorkManagement from './pages/WorkManagement';
import General from './pages/General';
import Attendance from './pages/Attendance';
import WorkAnalysis from './pages/WorkAnalysis';
import Requirement from './pages/Requirement';
import EmployeeTraining from './pages/EmployeeTraining';
import PayRole from './pages/PayRole';
import Login from './Authentication/Login';
import Department from './pages/subnav/Department';
import RoleManagement from './pages/subnav/RoleManagement';
import EmployeeManagement from './pages/subnav/EmployeeManagement';

const App = () => {
  return (
    <BrowserRouter>
      {/* <Sidebar> */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Workmanagement" element={<WorkManagement />} />
        <Route path="/general" element={<General />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/requirement" element={<Requirement />} />
        <Route path="/work_analysis" element={<WorkAnalysis />} />
        <Route path="/employee_training" element={<EmployeeTraining />} />
        <Route path="/payrole" element={<PayRole />} />
        <Route path="/department" element={<Department />} />
        <Route path="/role_management" element={<RoleManagement />} />
        <Route path="/employee_management" element={<EmployeeManagement />} />
      </Routes>
      {/* </Sidebar> */}
    </BrowserRouter>
  );
};

export default App;