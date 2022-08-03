import { useQuery } from '@apollo/client';
import { Spinner} from './Spinner';
import { ClientRow } from '../pages/ClientRow';
import '../App.css';
import {GET_CLIENTS} from '../queries/clientQueries';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export const Clients = () => {
    const { loading, error, data } = useQuery(GET_CLIENTS);
    if (loading) return (
        <div className="spinner">
            <Spinner/>
        </div>
    )
    if (error) return <p>Something went wrong</p>

    return (
        <div className="table-clients">
            <h1>List of Users</h1>
            {
                !loading && !error &&
                (
                <Paper elevation={6}>
                    <TableContainer>
                        <Table sx={{ minWidth: 600 }} aria-label="caption table">
                            <TableHead>
                                <TableRow >
                                    <TableCell style={{backgroundColor:'black', color: 'white'}} align="center">Name</TableCell>
                                    <TableCell style={{backgroundColor:'black', color: 'white'}} align="center">Email</TableCell>
                                    <TableCell style={{backgroundColor:'black', color: 'white'}} align="center">Phone</TableCell>
                                    <TableCell style={{backgroundColor:'black', color: 'white'}} align="center">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.clients.map((client) => (
                                    <ClientRow key = {client.id} client = {client}/>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    </Paper>
                )
            }
        </div>
    )

}