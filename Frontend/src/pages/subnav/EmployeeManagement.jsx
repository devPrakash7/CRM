import React, { useState, useEffect } from 'react';
import { TextField, Grid, Button, Typography } from '@mui/material';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import { DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import './empStyle.css'
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';



const EmployeeManagement = () => {
    const [open, setOpen] = useState(false);
    const [toggleSubmit, setToggleSubmit] = useState(true);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

    const [inputValue, setInputValue] = useState({
        email: "",
        mobileNumber: "",
        password: "",
        firstName: "",
        lastName: "",
        hireDate: "",
        user_type: "",
        age: "",
        gender: "",
    });
    const [empData, setEmpData] = useState([])


    const handleInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        console.log(name, value)
        setInputValue({ ...inputValue, [name]: value })
    };

    const getApiData = async () => {
        try {
            const res = await axios.get('http://localhost:5001/v1/users/get_all_employee')  //will get a response
            console.log("res.data", res.data.data)
            setEmpData(res.data.data);
        } catch (error) {
            console.log("Error:", error);
        }
    }


    useEffect(() => {
        getApiData();
    }, [])

    //Handle Submit
    const submitHandler = (event) => {
        event.preventDefault()
        console.log('clicked');
        setEmpData([...empData, inputValue]);
    }

    //Handle Delete
    // const handleDelete = (id) => {
    //     const updatedEmpData = empData.filter((employee, index) => index !== id);
    //     setEmpData(updatedEmpData);
    //     alert('deleted')
    // }
       // Handle Delete
       const handleDelete = (id) => {
        setSelectedEmployeeId(id);
        setDeleteDialogOpen(true);
    }

    const confirmDelete = () => {
        const updatedEmpData = empData.filter((employee, index) => index !== selectedEmployeeId);
        setEmpData(updatedEmpData);
        setDeleteDialogOpen(false);
    }


    //Handle Edit
    const handleEdit = (id) => {
        let newEditItems = empData.find((elem) => {
            return elem.id === id
        })
        console.log(newEditItems)
        setToggleSubmit(false)
        // setInputValue(newEditItems)
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>

            <Sidebar>
                <Header />
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button variant="contained" color="primary" style={{ width: 200, marginTop: "10px" }} onClick={handleClickOpen}>ADD NEW</Button>
                </div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <form style={{ padding: '20px' }} onSubmit={submitHandler}>
                        <Typography variant="h6">Please Fill The Form</Typography>
                        <Grid container spacing={2}>
                        <Grid item xs={6}>
                                <TextField
                                    type="text"
                                    name="firstName"
                                    placeholder="First Name"
                                    fullWidth
                                    value={inputValue.firstName}
                                    onChange={handleInput}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    type="text"
                                    name="lastName"
                                    placeholder="Last Name"
                                    fullWidth
                                    value={inputValue.lastName}
                                    onChange={handleInput}
                                />
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    type="text"
                                    name="gender"
                                    placeholder="Gender"
                                    fullWidth
                                    value={inputValue.gender}
                                    onChange={handleInput}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    type="text"
                                    name="age"
                                    placeholder="Age"
                                    fullWidth
                                    value={inputValue.age}
                                    onChange={handleInput}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    type="text"
                                    name="email"
                                    placeholder="Enter Email Address"
                                    fullWidth
                                    value={inputValue.email}
                                    onChange={handleInput}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    type="text"
                                    name="mobileNumber"
                                    placeholder="Enter Mobile No"
                                    fullWidth
                                    value={inputValue.mobileNumber}
                                    onChange={handleInput}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    fullWidth
                                    value={inputValue.password}
                                    onChange={handleInput}
                                />
                            </Grid>                                                     
                            {/* <Grid item xs={6}>
                                <TextField
                                    type="text"
                                    name="departmentId"
                                    placeholder="Department Id"
                                    fullWidth
                                    value={inputValue.departmentId}
                                    onChange={handleInput}
                                />
                            </Grid> */}
                            <Grid item xs={12}>
                                <TextField
                                    type="date"
                                    name="hireDate"
                                    placeholder="Hire Date"
                                    fullWidth
                                    value={inputValue.hireDate}
                                    onChange={handleInput}
                                />
                            </Grid>
                            {/* <Grid item xs={6}>
                                <TextField
                                    type="text"
                                    name="user_type"
                                    placeholder="User Type"
                                    fullWidth
                                    value={inputValue.user_type}
                                    onChange={handleInput}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    type="text"
                                    name="status"
                                    placeholder="Status"
                                    fullWidth
                                    value={inputValue.status}
                                    onChange={handleInput}
                                />
                            </Grid> */}
                            <Grid item xs={12}>
                                {
                                    toggleSubmit ? <Button type="submit" variant="contained" color="primary">Submit</Button> :
                                        <Button type="submit" variant="contained" color="primary">Update</Button>
                                }
                            </Grid>
                        </Grid>
                    </form>
                </Dialog>
                <div>
                    <TableContainer style={{ padding: "20px" }}>
                        <Table>
                            <TableHead style={{
                                whiteSpace: 'nowrap', background: "#87CEFA",
                                color: "white", fontSize: '30px'
                            }}>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Mobile No</TableCell>
                                    <TableCell>First Name</TableCell>
                                    <TableCell>Last Name</TableCell>
                                    <TableCell>Hire Date</TableCell>
                                    <TableCell>Age</TableCell>
                                    <TableCell>Gender</TableCell>
                                    {/* <TableCell>Status</TableCell> */}
                                    <TableCell>Edit</TableCell>
                                    <TableCell>Delete</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {empData.map((data, id) => (
                                    <TableRow key={id} className="row-hover" style={{ whiteSpace: 'nowrap' }}>
                                        <TableCell>{id}</TableCell>
                                        <TableCell>{data.email}</TableCell>
                                        <TableCell>{data.mobileNumber}</TableCell>
                                        <TableCell>{data.firstName}</TableCell>
                                        <TableCell>{data.lastName}</TableCell>
                                        <TableCell>{data.hireDate}</TableCell>
                                        <TableCell>{data.age}</TableCell>
                                        <TableCell>{data.gender}</TableCell>
                                        {/* <TableCell>{data.status}</TableCell> */}
                                        <TableCell onClick={handleClickOpen}>
                                            <FaEdit onClick={() => handleEdit(id)} />
                                        </TableCell>
                                        <TableCell variant="outlined" color="secondary" onClick={() => handleDelete(id)}>
                        <FaTrash />
                    </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <Dialog
                    open={deleteDialogOpen}
                    onClose={() => setDeleteDialogOpen(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">Confirm Delete</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to delete this employee?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={confirmDelete} color="primary" autoFocus>
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </Sidebar>
        </>
    )
}

export default EmployeeManagement