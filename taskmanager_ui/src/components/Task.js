import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import UpdateTask from './UpdateTask';
import TimeLine from './TimeLine';
import dayjs from 'dayjs';

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
    </Box>
);



export default function Task({task, reload, setAlert}) {
    const [updateDialogOpen, setUpdateDialogOpen] = React.useState(false);
    const [etaDialogOpen, setEtaDialogOpen] = React.useState(false);
    const [statusDialogOpen, setStatusDialogOpen] = React.useState(false);
    const deleteTask = () => (
        fetch(`${process.env.REACT_APP_BACKEND}/tasks/${task.id}`,
            {
                method: 'DELETE'
            })
            .then(reload)
            .catch(error => setAlert(error))
    )
    return (
        <>
        <Card variant="outlined"><CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {task.status}
            </Typography>
            <Typography variant="h4" component="div">
                {task.title}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                ETA: {dayjs(task.eta).format('MM/DD/YYYY')}
            </Typography>
            <Typography variant="body2">
                {task.content}
            </Typography>
        </CardContent>
            <CardActions>
                <Button variant="outlined" size="small" onClick={deleteTask}>delete</Button>
            </CardActions>
            <CardActions>
                <Button variant="outlined" size="small" onClick={() => setUpdateDialogOpen(true)}>edit</Button>
            </CardActions>
            <CardActions>
                <Button variant="outlined" size="small" onClick={() => setStatusDialogOpen(true)}>Status change timeline</Button>
            </CardActions>
            <CardActions>
                <Button variant="outlined" size="small" onClick={() => setEtaDialogOpen(true)}>Eta change timeline</Button>
            </CardActions>
        </Card>
        <UpdateTask open={updateDialogOpen} task={task} handleClose={() => setUpdateDialogOpen(false)} reload={reload} setAlert={setAlert} />
        <TimeLine taskId={task.id} open={etaDialogOpen} handleClose={() => setEtaDialogOpen(false)} auditBy='ETA'/>
        <TimeLine taskId={task.id} open={statusDialogOpen} handleClose={() => setStatusDialogOpen(false)} auditBy='STATUS'/>
        </>
    );
}