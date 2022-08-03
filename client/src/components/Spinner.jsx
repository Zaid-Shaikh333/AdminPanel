import { CircularProgress } from '@mui/material';
import Stack from '@mui/material/Stack';

export const Spinner = () => {
    return(
        <>
            <Stack sx={{display: 'flex', justifyContent: 'center'}}spacing={2} direction="row">
                <CircularProgress color='inherit'/>
            </Stack>
        </>
    )
}