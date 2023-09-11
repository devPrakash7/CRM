import React, { useState, useEffect } from 'react';
import { TextField, Grid, Button, Typography } from '@mui/material';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import { DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
// import '.././empStyle.css'

import Sidebar from '../components/Sidebar';
import Header from '../components/Header';



const Attendance = () => {
    const [open, setOpen] = useState(false);
    const [toggleSubmit, setToggleSubmit] = useState(true);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

    const [inputValue, setInputValue] = useState({
        attendance_type: "",
        employeeId: "",
       
    });
    const [empAttendance, setEmpAttendance] = useState([])


    const handleInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        console.log(name, value)
        setInputValue({ ...inputValue, [name]: value })
    };

    const getApiData = async (attendanceId) => {
        try {
            const res = await axios.get(`http://localhost:5001/v1/attendance/get-attendance?attendanceId=${attendanceId}`);
            console.log("res.data", res.data.data);
            setEmpAttendance(res.data.data);
        } catch (error) {
            console.log("Error:", error);
        }
    }
    
    useEffect(() => {
        const attendanceId = '64fede30a2d3e12ca02151b7'; // Replace this with the desired attendanceId
        getApiData(attendanceId);
    }, []);

    //Handle Submit
    const submitHandler = (event) => {
        event.preventDefault()
        console.log('clicked');
        setEmpAttendance([...empAttendance, inputValue]);
    }

    //Handle Delete
    // const handleDelete = (id) => {
    //     const updatedempAttendance = empAttendance.filter((employee, index) => index !== id);
    //     setEmpAttendance(updatedempAttendance);
    //     alert('deleted')
    // }
       // Handle Delete
       const handleDelete = (id) => {
        setSelectedEmployeeId(id);
        setDeleteDialogOpen(true);
    }

    const confirmDelete = () => {
        const updatedempAttendance = empAttendance.filter((employee, index) => index !== selectedEmployeeId);
        setEmpAttendance(updatedempAttendance);
        setDeleteDialogOpen(false);
    }


    //Handle Edit
    const handleEdit = (id) => {
        let newEditItems = empAttendance.find((elem) => {
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
              <Header/>
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
                                    name="attendance_type"
                                    placeholder="Enter attendance_type Address"
                                    fullWidth
                                    value={inputValue.attendance}
                                    onChange={handleInput}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    type="text"
                                    name="employeeId"
                                    placeholder="Enter EmployeeId"
                                    value={inputValue.employeeId}
                                    onChange={handleInput}
                                />
                            </Grid>

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
                                    <TableCell>attendance type</TableCell>
                                    <TableCell>Employee Id</TableCell>
                                    <TableCell>Edit</TableCell>
                                    <TableCell>Delete</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {empAttendance.map((data, id) => (
                                    <TableRow key={id} className="row-hover" style={{ whiteSpace: 'nowrap' }}>
                                        <TableCell>{id}</TableCell>
                                        <TableCell>{data.attendance_type}</TableCell>
                                        <TableCell>{data.employeeId}</TableCell>
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

export default Attendance