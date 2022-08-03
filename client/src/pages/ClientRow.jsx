import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';
import { useMutation } from '@apollo/client';
import { DELETE_CLIENT } from '../mutations/clientMutations';
import { GET_CLIENTS } from '../queries/clientQueries';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import React, { useState } from 'react';

export const ClientRow = ({ client }) => {
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const [open, setOpen] = useState()

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const [deleteClient] = useMutation(DELETE_CLIENT, {
        variables: { id: client.id },
        onCompleted: (data) => {
            setOpen(true);
        },
        update(cache, { data: { deleteClient } }) {
            const { clients } = cache.readQuery({
                query: GET_CLIENTS,
            })
            cache.writeQuery({
                query: GET_CLIENTS,
                data: { clients: clients.filter((client) => client.id !== deleteClient.id) }
            })
        }
    });
    return (
        <>
            <TableRow key={client.id}>
                <TableCell align="center">{client.name}</TableCell>
                <TableCell align="center">{client.email}</TableCell>
                <TableCell align="center">{client.phone}</TableCell>
                <TableCell align="center">
                    <span>
                        <DeleteForeverSharpIcon style={{ color: 'darkred', fontSize: '1.75rem' }}
                            onClick={deleteClient}
                        />
                    </span>
                </TableCell>
            </TableRow>
            {
                (open) && <Stack spacing={2} sx={{ width: '100%' }}>

                    <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                            Client deleted successfully
                        </Alert>
                    </Snackbar>
                </Stack>
            }
        </>
    )
}