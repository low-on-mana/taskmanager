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


export default function UpdateTask({ task, open, handleClose, reload, setAlert}) {
    const [taskState, setTaskState] = React.useState(task);
    const updateTask = () => (
        fetch(`${process.env.REACT_APP_BACKEND}/tasks/${task.id}`,
            {
                method: 'PUT',
                body: JSON.stringify(taskState),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(async res => {
                let resJson
                if (!res.ok) {
                resJson = await res.json();
                    setAlert(resJson.message);
                }
                return resJson;
            })
            .then(handleClose)
            .then(reload)
            .catch(error => console.log(error))
    )

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Update Task</DialogTitle>
                <DialogContent>
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
                        onChange={(e) => setTaskState({...taskState, status: e.target.value})}
                    >
                        <MenuItem value='PENDING'>pending</MenuItem>
                        <MenuItem value='IN_PROGRESS'>in progress</MenuItem>
                        <MenuItem value='IN_REVIEW'>in review</MenuItem>
                        <MenuItem value='COMPLETE'>complete</MenuItem>
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={updateTask}>Update</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}