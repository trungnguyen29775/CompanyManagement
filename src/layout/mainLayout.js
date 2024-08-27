import { Box, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import { useContext, useEffect, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Home from '../pages/home/home';
import Contact from '../pages/contact/contact';
import './mainLayout.css';
import ProjectCard from '../components/projectCard';
import ProjectDetail from '../pages/projectDetail/projectDetail';

const MainLayout = () => {
    const [profileMenu, setProfileMenu] = useState(null);
    const [value, setValue] = useState('Home');
    const [navElement, setNavElement] = useState('Home');
    const openProfileMenu = Boolean(profileMenu);

    const handleShowUserOption = (event) => {
        setProfileMenu(event.currentTarget);
    };
    const handleHideUserOption = () => {
        setProfileMenu(null);
    };
    const handleChangeNavHome = (newValue) => {
        setValue(newValue);
        setNavElement(newValue);
    };
    return (
        <div className="main-layout-wrapper">
            <div className="nav-bar-container">
                <a href="/" className="logo-container">
                    <img src="/image/logo.png" className="logo" />
                </a>
                <Box>
                    <Tabs value={value} indicatorColor="secondary" aria-label="secondary tabs example">
                        <Tab
                            style={{
                                color: 'white',
                            }}
                            value="Home"
                            label="Trang chủ"
                            onClick={(e) => handleChangeNavHome('Home')}
                        />
                        <Tab
                            style={{
                                color: 'white',
                            }}
                            value="Contact"
                            label="Liên hệ"
                            onClick={(e) => handleChangeNavHome('Contact')}
                        />
                        <Tab
                            style={{
                                color: 'white',
                            }}
                            value="Salary"
                            label="Lương"
                            onClick={(e) => handleChangeNavHome('Salary')}
                        />
                    </Tabs>
                </Box>
                <Button
                    id="profile-button"
                    aria-controls={openProfileMenu ? 'profile-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={openProfileMenu ? 'true' : undefined}
                    onClick={handleShowUserOption}
                >
                    <Avatar alt="Remy Sharp" src="/image/avt.jpg" />
                </Button>
                <Menu
                    id="profile-menu"
                    anchorEl={profileMenu}
                    open={openProfileMenu}
                    onClose={handleHideUserOption}
                    MenuListProps={{
                        'aria-labelledby': 'profile-button',
                    }}
                >
                    <MenuItem onClick={handleHideUserOption}>Profile</MenuItem>
                    <MenuItem onClick={handleHideUserOption}>My account</MenuItem>
                    <MenuItem onClick={handleHideUserOption}>Logout</MenuItem>
                </Menu>
            </div>
            {navElement === 'Home' ? <Home /> : navElement === 'Contact' ? <Contact /> : <ProjectDetail />}
        </div>
    );
};

export default MainLayout;
