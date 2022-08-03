import { useParams } from 'react-router-dom';
import { GET_PROJECT } from '../queries/projectQueries';
import { useQuery } from '@apollo/client';
import { Spinner } from '../components/Spinner';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';
import SyncDisabledIcon from '@mui/icons-material/SyncDisabled';
import CachedIcon from '@mui/icons-material/Cached';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import { DeleteButton } from '../components/DeleteButton';

import '../App.css';

export const SingleProject = () => {
    const { id } = useParams();
    const { loading, error, data } = useQuery(GET_PROJECT,
        { variables: { id } });

    if (loading) return <Spinner />
    if (error) return <p>Something went wrong</p>

    return (
        <div className='single-project'>
            <Box>
                <Paper elevation={6} className='single-project-paper'>
                    <div className="settings-menu">
                        <DeleteButton projectId={id}/>
                    </div>
                    <h1>{data.project.name}</h1>
                    <p><SpeakerNotesIcon className='notes-icon'/>{data.project.description}</p>
                    <p>
                        {
                            data.project.status === 'Completed' ?
                                <FileDownloadDoneIcon className='notes-icon' /> :
                                data.project.status === 'In Progress' ?
                                <CachedIcon className='notes-icon' /> :
                                <SyncDisabledIcon className='notes-icon' />
                        }
                        {data.project.status}
                    </p>
                    <div>
                        <h4>{data.project.client.name}</h4>
                    </div>
                </Paper>
            </Box>
        </div>
    )
}