import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Button from '@mui/material/Button'
import '../App.css';
import { Link} from 'react-router-dom';

export const ProjectCard = ({ project }) => {

    return (
        <div>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    '& > :not(style)': {
                        width: 300,
                        height: 180,
                    },
                }}
            >
                <Paper elevation={8}>
                    <h2 className='project-title'>{project.name}</h2>
                    <p className='project-description'><b>Status:</b> {project.status}</p>
                    <div className="preview-button">
                        <Link to={`/project/${project.id}`} className='project-links'>
                            <Button>
                                <VisibilityIcon />
                                &nbsp;
                                View
                            </Button>
                        </Link>
                    </div>
                    <h4 className='project-client-name'>{project.client.name}</h4>
                </Paper>
            </Box>
        </div>
    )
}