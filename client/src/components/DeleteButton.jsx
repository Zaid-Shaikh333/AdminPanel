import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { GET_PROJECTS } from '../queries/projectQueries';
import { DELETE_PROJECT } from '../mutations/projectMutations';
import { useMutation } from '@apollo/client';

export const DeleteButton = ({ projectId }) => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [deleteProject] = useMutation(DELETE_PROJECT, {
        variables : { id: projectId},
        onCompleted: () => navigate('/'),
        refetchQueries: [{query: GET_PROJECTS}]
    })

    return (
        <>
            <div
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <MenuIcon />
            </div>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem className="settings-icon" onClick={handleClose}><BorderColorIcon fontSize='2rem'/> &nbsp; Edit</MenuItem>
                <MenuItem className="settings-icon" onClick={deleteProject}><DeleteForeverIcon fontSize='2rem'/> &nbsp; Delete</MenuItem>
            </Menu>
        </>
    )
}