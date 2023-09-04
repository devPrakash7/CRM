import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const [isGeneralOpen, setIsGeneralOpen] = useState(false);

  const toggleGeneralDropdown = () => {
    setIsGeneralOpen(!isGeneralOpen);
  };

  return (
    <nav className="sidebar">
      <ul>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/work-management">Work Management</Link>
        </li>
        <li className={isGeneralOpen ? 'open' : ''}>
          <span onClick={toggleGeneralDropdown}>General</span>
          <ul>
            <li>
              <Link to="/general/department-management">Department Management</Link>
            </li>
            <li>
              <Link to="/general/employee-management">Employee Management</Link>
            </li>
            <li>
              <Link to="/general/role-management">Role Management</Link>
            </li>
          </ul>
        </li>
        <li>
          <span>Outside General</span>
          <ul>
            <li>
              <Link to="/attendance">Attendance</Link>
            </li>
            <li>
              <Link to="/work-analysis">Work Analysis</Link>
            </li>
            <li>
              <Link to="/payroll">Payroll</Link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
