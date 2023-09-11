import React, { useState } from 'react';
// import '../App.css';
import {
    FaGripHorizontal,
    FaBars,
    FaUsersCog,
    FaTv,
    FaRegCalendarCheck,
    FaTasks,
    FaAccessibleIcon,
    FaRegAddressCard,
    FaUsers,
    FaMoneyCheckAlt,
    FaBorderAll,
} from "react-icons/fa";
import { NavLink } from 'react-router-dom';

const Sidebar = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showGeneralSubMenu, setShowGeneralSubMenu] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
    const toggleGeneralSubMenu = () => setShowGeneralSubMenu(!showGeneralSubMenu);

    const menuItem = [
        {
            path: "/dashboard",
            name: "Dashboard",
            icon: <FaGripHorizontal />
        },
        {
            path: "/workmanagement",
            name: "Work Management",
            icon: <FaUsersCog />
        },
        {
            path: "/general",
            name: "General",
            icon: <FaTv />,
            subMenu: [  // Add submenu items here
                {
                    path: "/department",
                    name: "Department Management",
                    icon: <FaBorderAll />
                },
                {
                    path: "/role_management",
                    name: "Role Management",
                    icon: <FaRegAddressCard />
                },
                {
                    path: "/employee_management",
                    name: "Employee Management",
                    icon: <FaUsers />
                },
            ]
        },
        {
            path: "/attendance",
            name: "Attendance",
            icon: <FaRegCalendarCheck />
        },
        {
            path: "/requirement",
            name: "Requirement",
            icon: <FaTasks />
        },
        {
            path: "/work_analysis",
            name: "Work Analysis",
            icon: <FaAccessibleIcon />
        },
        {
            path: "/employee_training",
            name: "Employee Training",
            icon: <FaUsers />
        },
        {
            path: "/payrole",
            name: "PayRole",
            icon: <FaMoneyCheckAlt />
        }
    ];

    return (
        <div className="container">
            <div style={{ width: isOpen ? "260px" : "50px" }} className="sidebar">
                <div className="top_section">
                    <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">Admin</h1>
                    <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
                        <FaBars onClick={toggle} />
                    </div>
                </div>
                {
                    menuItem.map((item, index) => (
                        <div key={index}>
                            {item.subMenu ? (
                                <>
                                    <div
                                        className="link"
                                        onClick={() => toggleGeneralSubMenu()}
                                        style={{ cursor: "pointer" }}
                                    >
                                        <div className="icon">{item.icon}</div>
                                        <div
                                            style={{ display: isOpen ? "block" : "none" }}
                                            className="link_text"
                                        >
                                            {item.name}
                                        </div>
                                    </div>
                                    {showGeneralSubMenu && (
                                        <div className="submenu">
                                            {item.subMenu.map((subItem, subIndex) => (
                                                <NavLink to={subItem.path} key={subIndex} className="link" activeClassName="active">
                                                    <div className="icon">{subItem.icon}</div>
                                                    <div
                                                        style={{ display: isOpen ? "block" : "none" }}
                                                        className="link_text"
                                                    >
                                                        {subItem.name}
                                                    </div>
                                                </NavLink>
                                            ))}
                                        </div>
                                    )}
                                </>
                            ) : (
                                <NavLink to={item.path} key={index} className="link" activeClassName="active">
                                    <div className="icon">{item.icon}</div>
                                    <div
                                        style={{ display: isOpen ? "block" : "none" }}
                                        className="link_text"
                                    >
                                        {item.name}
                                    </div>
                                </NavLink>
                            )}
                        </div>
                    ))
                }
            </div>
            <main>{children}</main>
        </div>
    );
};

export default Sidebar;
