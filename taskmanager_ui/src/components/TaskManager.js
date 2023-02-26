import * as React from 'react';
import Button from '@mui/material/Button';
import { useEffect, useState } from "react";
import CreateTask from "./CreateTask";
import Task from "./Task";
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import Alert from '@mui/material/Alert';

export default function TaskManager() {
    const [tasks, setTasks] = useState([]);
    const [alert, setAlert] = useState('')
    const [createDialogOpen, setCreateDialogOpen] = React.useState(false);

    const reloadTasks = () => {
            fetch(`${process.env.REACT_APP_BACKEND}/tasks/`,
                {
                    method: 'GET',
                })
                .then(res => res.json())
                .then(response => {
                    setTasks(response)
                })
                .catch(error => console.log(error))
    }


    useEffect(reloadTasks, [])

    return (
        <>
            <Alert sx={{marginBottom: 2, display: alert === '' ? 'none' : ''}} variant="filled" severity="error" >
            {alert}
            </Alert>
            <Button size="large" sx={{ marginBottom: 3 }} onClick={() => setCreateDialogOpen(true)} variant="outlined" endIcon={<AddIcon />}>Create</Button>
            <CreateTask open={createDialogOpen} handleClose={() => setCreateDialogOpen(false)} reload={reloadTasks} setAlert={setAlert}/>
            <Grid container spacing={4}>
                {
                    tasks.map((task) => (
                        <Grid item key={task.id}>
                            <Task key={task.id} task={task} reload={reloadTasks} setAlert={setAlert}></Task>
                        </Grid>
                    ))
                }
            </Grid>
        </>
    );
}