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



const Department = () => {
    const [open, setOpen] = useState(false);
    const [toggleSubmit, setToggleSubmit] = useState(true);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

    const [inputValue, setInputValue] = useState({
        departmentName: "",
        description: "",
        location: "",
    });
    
    const [depData, setDepData] = useState([])


    const handleInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        console.log(name, value)
        setInputValue({ ...inputValue, [name]: value })
    };

    const getApiData = async () => {
        try {
            const res = await axios.get('http://localhost:5001/v1/department/search_all_departments')  //will get a response
            console.log("res.data", res.data.data)
            setDepData(res.data.data);
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
        setDepData([...depData, inputValue]);
    }

    //Handle Delete
    // const handleDelete = (id) => {
    //     const updateddepData = depData.filter((employee, index) => index !== id);
    //     setDepData(updateddepData);
    //     alert('deleted')
    // }
       // Handle Delete
       const handleDelete = (id) => {
        setSelectedEmployeeId(id);
        setDeleteDialogOpen(true);
    }

    const confirmDelete = () => {
        const updateddepData = depData.filter((employee, index) => index !== selectedEmployeeId);
        setDepData(updateddepData);
        setDeleteDialogOpen(false);
    }


    //Handle Edit
    const handleEdit = (id) => {
        let newEditItems = depData.find((elem) => {
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
                                    name="departmentName"
                                    placeholder="Department Name"
                                    fullWidth
                                    value={inputValue.departmentName}
                                    onChange={handleInput}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    type="text"
                                    name=" description"
                                    placeholder=" Description"
                                    fullWidth
                                    value={inputValue. description}
                                    onChange={handleInput}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    type="text"
                                    name="location"
                                    placeholder="Location"
                                    fullWidth
                                    value={inputValue.location}
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
                                    <TableCell>Department Name</TableCell>
                                    <TableCell>Description</TableCell>
                                    <TableCell>Location</TableCell>
                                    <TableCell>Edit</TableCell>
                                    <TableCell>Delete</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {depData.map((data, id) => (
                                    <TableRow key={id} className="row-hover" style={{ whiteSpace: 'nowrap' }}>
                                        <TableCell>{id}</TableCell>                         
                                        <TableCell>{data.departmentName}</TableCell>
                                        <TableCell>{data. description}</TableCell>
                                        <TableCell>{data.location}</TableCell>
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
                            Are you sure you want to delete this?
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

export default Department