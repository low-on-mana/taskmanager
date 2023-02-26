import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { MenuItem, Select } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

export default function CreateTask({ open, handleClose, reload, setAlert }) {
    const [taskState, setTaskState] = React.useState({ title: '', content: '', status: 'PENDING', eta: dayjs().add(7, 'day')});
    const createTask = () => (
        fetch(`${process.env.REACT_APP_BACKEND}/tasks/`,
            {
                method: 'POST',
                body: JSON.stringify(taskState),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(handleClose)
            .then(reload)
            .catch(error => console.log(error))
    )

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Create Task</DialogTitle>
                <DialogContent>
                    <DialogContentText></DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="title"
                        label="Title"
                        value={taskState.title}
                        onChange={(e) => { setTaskState({ ...taskState, title: e.target.value }) }}
                        fullWidth
                        variant="standard"
                    />
                    <br/><br/>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="content"
                        label="Content"
                        value={taskState.content}
                        onChange={(e) => { setTaskState({ ...taskState, content: e.target.value }) }}
                        fullWidth
                        rows={4}
                        multiline
                    />
                    <br/><br/>
                    <DesktopDatePicker
                        label="eta"
                        value={taskState.eta}
                        onChange={(val) => { setTaskState({ ...taskState, eta: val }) }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    <br/><br/>
                    <Select
                        labelId="select-status-label"
                        id="select-status-label"
                        value={taskState.status}
                        label="status"
                        onChange={(e) => setTaskState({ ...taskState, status: e.target.value })}
                    >
                        <MenuItem value='PENDING'>pending</MenuItem>
                        <MenuItem value='IN_PROGRESS'>in progress</MenuItem>
                        <MenuItem value='IN_REVIEW'>in review</MenuItem>
                        <MenuItem value='COMPLETE'>complete</MenuItem>
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={createTask}>Create</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}