import * as React from 'react';
import { useEffect } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';


const mapAudits = (taskAudits, auditBy) => {
    return taskAudits.map(taskAudit => {
        switch(auditBy) {
            case 'STATUS':
                return (
                    <div key={taskAudit.id}>
                        <br/>
                        <Typography>
                            <b>Status: </b>{taskAudit.status}
                        </Typography>
                        <Typography>
                            <b>Modified On: </b>{dayjs(taskAudit.createdAt).format('D MMM hh:mm a')}
                        </Typography>
                    </div>
                )
            case 'ETA':
                return (
                    <div key={taskAudit.id}>
                        <br/>
                        <Typography>
                            <b>Eta: </b>{dayjs(taskAudit.eta).format('D MMM')}
                        </Typography>
                        <Typography>
                            <b>Modified On: </b> {dayjs(taskAudit.createdAt).format('D MMM hh:mm a')}
                        </Typography>
                    </div>
                )
        }
    })
}
export default function Timeline({taskId, handleClose, auditBy, open}) {
    const [taskAudits, setTaskAudits] = React.useState([]);
    const getTaskAudits = () => { 
        fetch(`${process.env.REACT_APP_BACKEND}/tasks/${taskId}/audit?taskAuditStrategy=${auditBy}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(res => setTaskAudits(res))
            .catch(error => console.log(error))
     }

    useEffect(() => { if (open) { getTaskAudits() } }, [open])

    return(
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{`Task ${auditBy} timeline`}</DialogTitle>
                <DialogContent>
                {mapAudits(taskAudits, auditBy)}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
    )
}