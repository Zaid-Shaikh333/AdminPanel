import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { AddClient } from '../pages/AddClient';
import { AddProject } from '../pages/AddProject';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom'
import '../App.css'

export const Header = () => {
    return (
        <>
            <div className="container">
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static" color="default">
                        <Toolbar>
                            <div className="navbar">
                                <Link to='/addclient' className='links'>
                                    <Button color="secondary" disableElevation>
                                        <PersonAddAlt1Icon />
                                    </Button>
                                </Link>
                                &nbsp;
                                <Link to='/addproject' className='links'>
                                    <Button color="secondary" disableElevation>
                                        <NoteAddIcon />
                                    </Button>
                                </Link>
                                &nbsp;
                                <Link to='/' className='links'>
                                    <Button color="secondary" disableElevation>
                                        <HomeIcon />
                                    </Button>
                                </Link>
                            </div>
                        </Toolbar>
                    </AppBar>
                </Box>
            </div>
        </>
    )
}