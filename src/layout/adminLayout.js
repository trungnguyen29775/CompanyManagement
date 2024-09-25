import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useContext, useEffect, useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import WorkIcon from '@mui/icons-material/Work';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import ProjectTable from '../components/projectTable';
import AdminProject from '../pages/adminProject';
import { color } from '../constant/style';
import AdminMember from '../pages/adminMember';
import StateContext from '../context/context.context';
import { useNavigate } from 'react-router-dom';
import { getAdminMember, getAdminProject, hideNotify, loggout } from '../context/action.context';
import { Snackbar } from '@mui/material';
import instance from '../axios/instance';
import { GET_ADMIN_MEMBER, GET_ADMIN_PROJECT } from '../constant/endPoint';
const AdminLayout = () => {
    const [adminNav, setAdminNav] = useState('Project');
    const navigation = useNavigate();
    const [state, dispatchState] = useContext(StateContext);
    const handleChangeNavAdmin = (e, value) => {
        setAdminNav(value);
    };
    const handleLoggout = () => {
        dispatchState(loggout('a'));
    };
    useEffect(() => {
        if (adminNav === 'Member' && state.adminMemberData === null) {
            instance
                .post(GET_ADMIN_MEMBER, state.userData)
                .then((res) => {
                    dispatchState(getAdminMember(res.data));
                    console.log(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else if (adminNav === 'Project' && state.adminProjectData === null) {
            instance
                .post(GET_ADMIN_PROJECT, state.userData)
                .then((res) => {
                    dispatchState(getAdminProject(res.data));
                    console.log(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    });

    return (
        <Box
            sx={{
                color: color.mainColor,
                display: 'flex',
                flexDirection: 'row',
                overflowY: 'auto',
                height: '100vh',
                width: '100vw',
            }}
        >
            <Box sx={{ width: 250 }} role="presentation">
                <List>
                    <ListItem disablePadding onClick={(e) => handleChangeNavAdmin(e, 'Home')}>
                        <ListItemButton>
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary={'Home'} />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding onClick={(e) => handleChangeNavAdmin(e, 'Member')}>
                        <ListItemButton>
                            <ListItemIcon>
                                <PeopleIcon />
                            </ListItemIcon>
                            <ListItemText primary={'Member'} />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding onClick={(e) => handleChangeNavAdmin(e, 'Project')}>
                        <ListItemButton>
                            <ListItemIcon>
                                <WorkIcon />
                            </ListItemIcon>
                            <ListItemText primary={'Project'} />
                        </ListItemButton>
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem disablePadding onClick={(e) => handleChangeNavAdmin(e, 'Setting')}>
                        <ListItemButton>
                            <ListItemIcon>
                                <SettingsIcon />
                            </ListItemIcon>
                            <ListItemText primary={'Setting'} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding onClick={handleLoggout}>
                        <ListItemButton>
                            <ListItemIcon>
                                <LogoutIcon />
                            </ListItemIcon>
                            <ListItemText primary={'Loggout'} />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
            <Box
                sx={{
                    padding: '16px',
                    boxSizing: 'border-box',
                    display: 'flex',
                    alignItems: 'center',
                    height: '100%',
                    width: '100%',
                }}
            >
                {adminNav === 'Project' ? <AdminProject /> : adminNav === 'Member' ? <AdminMember /> : ''}
            </Box>
            <Snackbar
                open={state.notify?.show}
                onClose={() => dispatchState(hideNotify(''))}
                message={state.notify?.data?.message}
                autoHideDuration={6000}
                variant="success"
                sx={{
                    '& .MuiSnackbarContent-root': {
                        backgroundColor: 'white',
                        color: 'green',
                    },
                }}
            />
        </Box>
    );
};

export default AdminLayout;
