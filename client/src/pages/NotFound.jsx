import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import '../App.css';

export const NotFound = () => {
    return (
        <div className='not-found'>
            <Stack sx={{ width: '100%' }} spacing={5}>
                <Alert severity="error">
                    <AlertTitle><strong>Error</strong></AlertTitle>
                    The page that you're looking for does not Exist!!!
                </Alert>
            </Stack>
        </div>
    )
}