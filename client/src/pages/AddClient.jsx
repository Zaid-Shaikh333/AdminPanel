import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import PersonAddSharpIcon from '@mui/icons-material/PersonAddSharp';
import '../App.css';
import { useState } from 'react';
import { ADD_CLIENT } from '../mutations/clientMutations';
import { GET_CLIENTS } from '../queries/clientQueries';
import { useMutation } from '@apollo/client';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import React from 'react';

export const AddClient = () => {
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [open, setOpen] = useState()

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const [addClient] = useMutation(ADD_CLIENT, {
        variables: { name, email, phone },
        onCompleted: (data) => {
            handleClick();
        },
        update(cache, { data: { addClient } }) {
            const { clients } = cache.readQuery({
                query: GET_CLIENTS
            });

            cache.writeQuery({
                query: GET_CLIENTS,
                data: { clients: [...clients, addClient] }
            })
        }
    })
    const Submit = (e) => {
        e.preventDefault()
        if (name && email && phone) {
            addClient(name, email, phone)
            setName('')
            setEmail('')
            setPhone('')
        }
    }
    return (
        <div className="addclient-form">
            <Accordion>
                <AccordionSummary
                    expandIcon={<AddSharpIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <h3 className='form-title'>Create Clients here...</h3>
                </AccordionSummary>
                <AccordionDetails>
                    <form onSubmit={Submit}>
                        <p className='form-title'>Fill out the Form Below</p>
                        <div className="input">
                            <TextField className='textfield'
                                variant='standard' id='email'
                                type='text' label='Name' color='error'
                                onChange={(e) => setName(e.target.value)}
                                required />
                        </div>
                        <div className="input">
                            <TextField className='textfield'
                                variant='standard' id='email'
                                type='email' label='Email' color='error'
                                onChange={(e) => setEmail(e.target.value)}
                                required />
                        </div>
                        <div className="input">
                            <TextField className='textfield'
                                variant='standard' id='email'
                                type='text' label='Phone' color='error'
                                onChange={(e) => setPhone(e.target.value)}
                                required />
                        </div>
                        <div className="input">
                            <Button type='submit' color="error" variant='contained' size='small'
                                startIcon={<PersonAddSharpIcon className='text-snippet' />}>
                                Create
                            </Button>
                        </div>
                    </form>
                </AccordionDetails>
            </Accordion>

            {(open) && <Stack spacing={2} sx={{ width: '100%' }}>

                <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Client added successfully
                    </Alert>
                </Snackbar>
            </Stack>}
        </div>
    )
}