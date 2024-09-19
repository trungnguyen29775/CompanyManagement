import React, { useContext, useEffect, useState } from 'react';
import {
    TextField,
    Button,
    Grid,
    Typography,
    Autocomplete,
    Avatar,
    Box,
    AvatarGroup,
    List,
    Fab,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Checkbox,
    Drawer,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import StateContext from '../context/context.context';
import { hideEditProject, updateProject } from '../context/action.context';

const totalMembers = [
    { id: 1, name: 'Alice', avatar: '/image/avt.jpg' },
    { id: 2, name: 'Bob', avatar: '/image/avt.jpg' },
    { id: 3, name: 'Charlie', avatar: '/image/avt.jpg' },
    { id: 4, name: 'David', avatar: '/image/avt.jpg' },
    { id: 5, name: 'Eva', avatar: '/image/avt.jpg' },
    { id: 6, name: 'Frank', avatar: '/image/avt.jpg' },
    { id: 7, name: 'Grace', avatar: '/image/avt.jpg' },
    { id: 8, name: 'Hannah', avatar: '/image/avt.jpg' },
    { id: 9, name: 'Isaac', avatar: '/image/avt.jpg' },
    { id: 10, name: 'Jack', avatar: '/image/avt.jpg' },
    { id: 11, name: 'Katie', avatar: '/image/avt.jpg' },
    { id: 12, name: 'Leo', avatar: '/image/avt.jpg' },
    { id: 13, name: 'Mia', avatar: '/image/avt.jpg' },
    { id: 14, name: 'Nina', avatar: '/image/avt.jpg' },
    { id: 15, name: 'Oscar', avatar: '/image/avt.jpg' },
    { id: 16, name: 'Paul', avatar: '/image/avt.jpg' },
    { id: 17, name: 'Quinn', avatar: '/image/avt.jpg' },
    { id: 18, name: 'Rachel', avatar: '/image/avt.jpg' },
    { id: 19, name: 'Sam', avatar: '/image/avt.jpg' },
    { id: 20, name: 'Tina', avatar: '/image/avt.jpg' },
    { id: 21, name: 'Minh Trung', avatar: '/image/avt.jpg' },
];

const EditProjectForm = () => {
    const [state, dispatchState] = useContext(StateContext);
    const [projectName, setProjectName] = useState(state.editProject.data.projectName);
    const [contractCode, setContractCode] = useState(state.editProject.data.contractCode);
    const [members, setMembers] = useState(state.editProject.data.members);
    const [statusProject, setStatusProject] = useState(state.editProject.data.statusProject);
    const [salaryStatus, setSalaryStatus] = useState(state.editProject.data.salaryStatus);
    const [editProjectMember, setEditProjectMember] = useState(false);
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [dayStart, setDayStart] = useState('');
    const [monthStart, setMonthStart] = useState('');
    const [yearStart, setYearStart] = useState('');
    const [mentor, setMentor] = useState(state.editProject.data.mentor);
    const [editMentor, setEditMentor] = useState(false);
    const [selectedMentor, setSelectedMentor] = useState(state.editProject.data.mentor);
    // Context
    // Funtion
    useEffect(() => {
        const temp = [];
        const regex = /(\d{4})-(\d{2})-(\d{2})/;
        state.editProject.data.members?.map((item) => temp.push(item.id));
        setSelectedMembers(temp);
        const match = state.editProject.data.startDate?.match(regex);
        setDayStart(match[3]);
        setMonthStart(match[2]);
        setYearStart(match[1]);
    }, []);

    const handleToggleMentor = (memberData) => {
        setSelectedMentor(memberData);
    };
    const handleToggle = (memberId) => {
        const currentIndex = selectedMembers.indexOf(memberId);
        const newSelectedMembers = [...selectedMembers];

        if (currentIndex === -1) {
            newSelectedMembers.push(memberId);
        } else {
            newSelectedMembers.splice(currentIndex, 1);
        }

        setSelectedMembers(newSelectedMembers);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const temp = [];
        totalMembers.map((item, index) => {
            if (selectedMembers.indexOf(item.id) !== -1) temp.push(item);
        });
        const projectData = {
            projectName: projectName,
            contractCode: contractCode,
            startDate: `${yearStart}-${monthStart}-${dayStart}`,
            members: temp,
            statusProject: statusProject,
            salaryStatus: salaryStatus,
            id: state.editProject.data.id,
            mentor: mentor,
        };
        dispatchState(updateProject(projectData));
        dispatchState(hideEditProject(''));
    };

    const handleShowEditProjectMember = (e) => {
        e.preventDefault();
        setEditProjectMember(true);
    };

    const handleShowEditProjectMentor = (e) => {
        e.preventDefault();
        setEditMentor(true);
    };

    const handleSaveMentor = (e) => {
        setEditMentor(false);
    };

    const handleHideEditProject = () => {
        dispatchState(hideEditProject(''));
    };

    const handleSaveMember = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setEditProjectMember(false);
        const temp = [];
        totalMembers?.map((member, index) => {
            if (selectedMembers.indexOf(member.id) != -1) temp.push(member);
        });
        setMembers(temp);
    };

    const memberOptions = ['Alice', 'Bob', 'Charlie', 'David'];

    return (
        <form onSubmit={handleSubmit}>
            <Typography variant="h6" gutterBottom>
                Chỉnh sửa thông tin dự án
            </Typography>

            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography span="h5" marginBottom={'10px'}>
                        Tên dự án
                    </Typography>

                    <TextField
                        required
                        id="projectName"
                        label="Tên dự án"
                        fullWidth
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Typography span="h5" marginBottom={'10px'}>
                        Mã hợp đồng
                    </Typography>
                    <TextField
                        required
                        id="contractCode"
                        label="Mã hợp đồng"
                        fullWidth
                        value={contractCode}
                        onChange={(e) => setContractCode(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography span="h5" marginBottom={'10px'}>
                        Thời gian bắt đầu
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap' }}>
                        <TextField
                            onChange={(e) => setDayStart(e.target.value)}
                            value={dayStart}
                            sx={{ marginRight: '10px', flex: 1 }}
                            required
                            label="Ngày"
                        />
                        <TextField
                            onChange={(e) => setMonthStart(e.target.value)}
                            value={monthStart}
                            sx={{ marginRight: '10px', flex: 1 }}
                            required
                            label="Tháng"
                        />
                        <TextField
                            onChange={(e) => setYearStart(e.target.value)}
                            value={yearStart}
                            sx={{ marginRight: '10px', flex: 1 }}
                            required
                            label="Năm"
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography marginBottom={'10px'} span="h5">
                        Trạng thái
                    </Typography>
                    <TextField
                        required
                        id="status"
                        label="Trạng thái"
                        fullWidth
                        value={statusProject}
                        onChange={(e) => setStatusProject(e.target.value)}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Typography span="h5" marginBottom={'10px'}>
                        Thành viên
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <AvatarGroup max={4} sx={{ marginRight: '5px' }}>
                            {members?.map((item, index) => (
                                <Avatar key={index} src={item.avatar} alt={item.name} />
                            ))}
                        </AvatarGroup>

                        <Fab
                            sx={{ height: '40px', width: '40px', zIndex: 2 }}
                            color="secondary"
                            aria-label="edit"
                            onClick={handleShowEditProjectMember}
                        >
                            <EditIcon />
                        </Fab>
                    </Box>

                    <Drawer open={editProjectMember} anchor="right">
                        <Box
                            sx={{
                                width: '350px',
                                '&::-webkit-scrollbar': {
                                    display: 'none',
                                },
                                overflow: 'auto',

                                msOverflowStyle: 'none',
                                scrollbarWidth: 'none',
                            }}
                        >
                            <List
                                sx={{
                                    position: 'relative',
                                    '&::-webkit-scrollbar': {
                                        display: 'none',
                                    },
                                    msOverflowStyle: 'none',
                                    scrollbarWidth: 'none',
                                }}
                            >
                                <ListItem>
                                    <Typography variant="h6" gutterBottom>
                                        Chọn thành viên dự án
                                    </Typography>
                                </ListItem>
                                <ListItem>
                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        options={totalMembers}
                                        getOptionLabel={(option) => option.name}
                                        sx={{ width: '100%' }}
                                        renderInput={(params) => (
                                            <Box>
                                                <TextField {...params} label="Tìm kiếm theo Tên" />
                                            </Box>
                                        )}
                                    />
                                </ListItem>
                                {totalMembers?.map((member) => {
                                    const labelId = `checkbox-list-label-${member.id}`;
                                    return (
                                        <ListItem key={member.id} onClick={() => handleToggle(member.id)}>
                                            <ListItemAvatar>
                                                <Avatar alt={member.name} src={member.avatar} />
                                            </ListItemAvatar>
                                            <ListItemText id={labelId} primary={member.name} />
                                            <Checkbox
                                                edge="end"
                                                checked={selectedMembers.indexOf(member.id) !== -1}
                                                tabIndex={-1}
                                                disableRipple
                                                inputProps={{ 'aria-labelledby': labelId }}
                                            />
                                        </ListItem>
                                    );
                                })}
                                <ListItem style={{ padding: 0 }}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        sx={{
                                            position: 'fixed',
                                            bottom: 0,
                                            right: 0,
                                            width: '350px',
                                            boxSizing: 'border-box',
                                            borderRadius: 0,
                                            height: '50px',
                                        }}
                                        onClick={handleSaveMember}
                                    >
                                        Lưu thay đổi
                                    </Button>
                                </ListItem>
                            </List>
                        </Box>
                    </Drawer>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Typography span="h5" marginBottom={'10px'}>
                        Phụ trách chính
                    </Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <AvatarGroup max={4} sx={{ marginRight: '5px' }}>
                            <Avatar src={mentor.avatar} alt={mentor.name} />
                        </AvatarGroup>

                        <Fab
                            sx={{ height: '40px', width: '40px', zIndex: 2 }}
                            color="secondary"
                            aria-label="edit"
                            onClick={handleShowEditProjectMentor}
                        >
                            <EditIcon />
                        </Fab>
                    </Box>
                    <Drawer open={editMentor} anchor="right">
                        <Box
                            sx={{
                                width: '350px',
                                '&::-webkit-scrollbar': {
                                    display: 'none',
                                },
                                overflow: 'auto',

                                msOverflowStyle: 'none',
                                scrollbarWidth: 'none',
                                marginBottom: '60px',
                            }}
                        >
                            <List
                                sx={{
                                    position: 'relative',
                                    '&::-webkit-scrollbar': {
                                        display: 'none',
                                    },
                                    msOverflowStyle: 'none',
                                    scrollbarWidth: 'none',
                                }}
                            >
                                <ListItem>
                                    <Typography variant="h6" gutterBottom>
                                        Điều chỉnh chuyên viên dự án
                                    </Typography>
                                </ListItem>
                                <ListItem>
                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        options={totalMembers}
                                        getOptionLabel={(option) => option.name}
                                        sx={{ width: '100%' }}
                                        renderInput={(params) => (
                                            <Box>
                                                <TextField {...params} label="Tìm kiếm theo Tên" />
                                            </Box>
                                        )}
                                    />
                                </ListItem>
                                {totalMembers?.map((member) => {
                                    const labelId = `checkbox-list-label-${member.id}`;
                                    return (
                                        <ListItem key={member.id} onClick={() => handleToggleMentor(member)}>
                                            <ListItemAvatar>
                                                <Avatar alt={member.name} src={member.avatar} />
                                            </ListItemAvatar>
                                            <ListItemText id={labelId} primary={member.name} />
                                            <Checkbox
                                                edge="end"
                                                checked={selectedMentor.id === member.id}
                                                tabIndex={-1}
                                                disableRipple
                                                inputProps={{ 'aria-labelledby': labelId }}
                                            />
                                        </ListItem>
                                    );
                                })}
                                <ListItem style={{ padding: 0 }}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        sx={{
                                            position: 'fixed',
                                            bottom: 0,
                                            right: 0,
                                            width: '350px',
                                            boxSizing: 'border-box',
                                            borderRadius: 0,
                                            height: '50px',
                                        }}
                                        onClick={handleSaveMentor}
                                    >
                                        Lưu thay đổi
                                    </Button>
                                </ListItem>
                            </List>
                        </Box>
                    </Drawer>
                </Grid>

                <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary">
                        Lưu thay đổi
                    </Button>
                    <Button
                        sx={{ marginLeft: '20px' }}
                        type="button"
                        variant="contained"
                        color="primary"
                        onClick={handleHideEditProject}
                    >
                        Thoát
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default EditProjectForm;
