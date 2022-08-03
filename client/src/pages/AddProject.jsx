import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

import '../App.css';
import { useState } from 'react';
import { ADD_PROJECT} from '../mutations/projectMutations';
import { GET_PROJECTS } from '../queries/projectQueries';
import { GET_CLIENTS } from '../queries/clientQueries';
import { useMutation, useQuery } from '@apollo/client';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import React from 'react';
import { Navigate } from 'react-router-dom';

export const AddProject = () => {
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('new');
    const [clientId, setClientId] = useState('')
    const [open, setOpen] = useState()

    const[addProject] = useMutation(ADD_PROJECT, {
        variables: {name, description, clientId, status},
        update(cache, { data : {addProject}}){
            const projects = cache.readQuery({query: GET_PROJECTS})
            cache.writeQuery({
                query: GET_PROJECTS,
                data: { projects: [...projects, addProject]},
            });
        },
    })

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const { loading, error, data } = useQuery(GET_CLIENTS);
    
    const Submit = (e) => {
        e.preventDefault()
        if (name && description && status) {
            addProject(name, description, clientId, status)
            setName('')
            setDescription('')
            setStatus('new')
            setClientId('')
            handleClick()
        }
    }

    if (loading) return null;
    if (error) return "Something went wrong";

    return (
        <>
            {
                !loading && !error &&
                <>
                    <div className="addclient-form">
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<AddSharpIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <h3 className='form-title'>Add new Project...</h3>
                            </AccordionSummary>
                            <AccordionDetails>
                                <form onSubmit={Submit}>
                                    <p className='form-title'>Fill out the Form Below</p>
                                    <div className="input">
                                        <TextField className='textfield'
                                            variant='standard' id='email'
                                            type='text' label='Title' color='info'
                                            onChange={(e) => setName(e.target.value)}
                                            required />
                                    </div>
                                    <div className="input">
                                        <TextareaAutosize
                                            className="textarea"
                                            placeholder="Add Description"
                                            minRows={2}
                                            color='info'
                                            required
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                    </div>
                                    <div className="input">
                                        <InputLabel>Client</InputLabel>
                                        <Select
                                            className='select-status'
                                            value={clientId}
                                            label="Client"
                                            required
                                            onChange={(e) => setClientId(e.target.value)}
                                        >
                                            {data.clients.map((client) => (
                                                <MenuItem key={client.id} value={client.id}>{client.name}</MenuItem>
                                            ))}
                                        </Select>
                                    </div>
                                    <div className="input">
                                        <InputLabel>Project Status</InputLabel>
                                        <Select
                                            className='select-status'
                                            value={status}
                                            label="Status"
                                            required
                                            onChange={(e) => setStatus(e.target.value)}
                                        >
                                            <MenuItem value="new">New</MenuItem>
                                            <MenuItem value="progress">In Progress</MenuItem>
                                            <MenuItem value="completed">Completed</MenuItem>
                                        </Select>
                                    </div>
                                    <div className="input">
                                        <Button type='submit' color="info" variant='contained' size='small'
                                            startIcon={<EditSharpIcon className='text-snippet' />}>
                                            Create
                                        </Button>
                                    </div>
                                </form>
                            </AccordionDetails>
                        </Accordion>

                        {(open) && <Stack spacing={2} sx={{ width: '100%' }}>

                            <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
                                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                                    Project added successfully
                                </Alert>
                            </Snackbar>
                        </Stack>}
                    </div>
                </>
            }
        </>
    )
}