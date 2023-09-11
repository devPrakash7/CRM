import React, { useState } from 'react';
import './login.css';
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Card, TextField, Button, Typography, Container, Radio, RadioGroup, FormControlLabel, FormLabel } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

const Login = (userType) => {

    const [showPassword, setShowPassword] = useState(false);
    const [inputValues, setInputValues] = useState({
        email: "",
        password: "",
        userRole: 1,
    });


    const navigate = useNavigate();
    const inputHandler = (event) => {
        const { name, value } = event.target;
        setInputValues({
            ...inputValues,
            [name]: name === "userRole" ? parseInt(value, 10) : value,
        });
    };

    // const submitHandler = (event) => {
    //     event.preventDefault();
    //     console.log("Email:", inputValues.email);
    //     console.log("Password:", inputValues.password);
    //     alert("Successfully Signing in !");
    //     navigate('/sidebar');
    // };

    const ADMIN_API = "http://localhost:5001/admin/login";
    const MANAGER_API = "http://localhost:5001/manager/login";

    // admin login
    const getApiEndpoint = (userType) => {
        if (userType === 1) {
            return ADMIN_API;
        } else if (userType === 2) {
            return MANAGER_API;
        }
    };

    const apiRequest = async (data, userType) => {
        try {
            const apiUrl = getApiEndpoint(userType);
            console.log("API URL:", apiUrl);
            const response = await axios.post(apiUrl, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        const userRole = inputValues.userRole;
        let userType;
        if (userRole === 1 || userRole === 2) {
            userType = userRole;
        } else {
            console.error("Invalid Input:", userRole);
            alert("Invalid Input");
            return;
        }
        try {
            const response = await apiRequest(
                {
                    email: inputValues.email,
                    password: inputValues.password,
                },
                userType
            );
            console.log("API Response:", response);
            alert("Successfully Signed In!");
            setInputValues({
                email: "",
                password: "",
            });
            navigate('/sidebar');
        } catch (error) {
            console.error("API Error:", error);
            alert("Please try again.");
        }
    };
    return (
        <>
            <div className="navbar">
                <img src="logo-2.png" width={130} height={30} alt="logo" />
            </div>
            <Container maxWidth="xs">
                <Card style={{ height: "400px", padding: 20 }}>
                    <form onSubmit={submitHandler}>
                        <div>
                            <Typography variant="h5">Welcome To TRUC!</Typography>
                            <TextField
                                type="text"
                                label="Email"
                                name="email"
                                variant="outlined"
                                fullWidth
                                required
                                value={inputValues.email}
                                onChange={inputHandler}
                                margin="normal"
                            />
                            <TextField
                                type={showPassword ? 'text' : 'password'}
                                label="Password"
                                name="password"
                                variant="outlined"
                                fullWidth
                                required
                                value={inputValues.password}
                                onChange={inputHandler}
                                margin="normal"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPassword(!showPassword)}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <RadioGroup
                                row
                                name="userRole"
                                value={inputValues.userRole}
                                onChange={inputHandler}
                            >
                                <FormControlLabel
                                    value="1"
                                    control={<Radio />}
                                    label="Admin"
                                />
                                <FormControlLabel
                                    value="2"
                                    control={<Radio />}
                                    label="Manager"
                                />
                            </RadioGroup>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                            >
                                Sign In
                            </Button>
                            <Typography variant="body2">
                                <a href="#" className='forgot'>Forgot Password?</a>
                            </Typography>
                        </div>
                    </form>
                </Card>
            </Container>
        </>
    )
}

export default Login;
