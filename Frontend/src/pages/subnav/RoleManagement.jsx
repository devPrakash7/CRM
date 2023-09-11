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



const RoleManagement = () => {
    const [open, setOpen] = useState(false);
    const [toggleSubmit, setToggleSubmit] = useState(true);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const [inputValue, setInputValue] = useState({
        name: "",
         userTypeName: "",
        role: "",
        email: "",
    });
    const [roleData, setRoleData] = useState([])


    const handleInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        console.log(name, value)
        setInputValue({ ...inputValue, [name]: value })
    };

    const getApiData = async () => {
        try {
            const res = await axios.get('http://localhost:5001/v1/role/get-all_role')  //will get a response
            console.log("res.data", res.data.data)
            setRoleData(res.data.data);
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
        setRoleData([...roleData, inputValue]);
    }
       // Handle Delete
       const handleDelete = (id) => {
        setSelectedId(id);
        setDeleteDialogOpen(true);
        // console.log('deletd')
    }

    const confirmDelete = () => {
        const updatedroleData = roleData.filter((employee, index) => index !== selectedId);
        setRoleData(updatedroleData);
        setDeleteDialogOpen(false);
    }


    //Handle Edit
    const handleEdit = (id) => {
        let newEditItems = roleData.find((elem) => {
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
                        <Grid item xs={12}>
                                <TextField
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    fullWidth
                                    value={inputValue.name}
                                    onChange={handleInput}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    type="text"
                                    name=" userTypeName"
                                    placeholder="Enter UserType Name"
                                    fullWidth
                                    value={inputValue. userTypeName}
                                    onChange={handleInput}
                                />
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    type="text"
                                    name="role"
                                    placeholder="role"
                                    fullWidth
                                    value={inputValue.role}
                                    onChange={handleInput}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    type="text"
                                    name="email"
                                    placeholder="email"
                                    fullWidth
                                    value={inputValue.email}
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
                                    <TableCell>Name</TableCell>
                                    <TableCell>userType Name</TableCell>
                                    <TableCell>role</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Edit</TableCell>
                                    <TableCell>Delete</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {roleData.map((data, id) => (
                                    <TableRow key={id} className="row-hover" style={{ whiteSpace: 'nowrap' }}>
                                        <TableCell>{id}</TableCell>                         
                                        <TableCell>{data.name}</TableCell>
                                        <TableCell>{data. userTypeName}</TableCell>
                                        <TableCell>{data.email}</TableCell>
                                        <TableCell>{data.role}</TableCell>
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

export default RoleManagement