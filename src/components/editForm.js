import React, { useEffect, useState } from 'react';
import {
    TextField,
    Button,
    Grid,
    Typography,
    MenuItem,
    Autocomplete,
    Avatar,
    Box,
    AvatarGroup,
    Card,
    List,
    Fab,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Checkbox,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { CheckBox, Edit } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

const membersProjectList = [
    { id: 1, name: 'Alice', avatar: '/image/avt.jpg' },
    { id: 2, name: 'Bob', avatar: '/image/avt.jpg' },
    { id: 3, name: 'Charlie', avatar: '/image/avt.jpg' },
    { id: 4, name: 'David', avatar: '/image/avt.jpg' },
    { id: 5, name: 'Eva', avatar: '/image/avt.jpg' },
    { id: 6, name: 'Frank', avatar: '/image/avt.jpg' },
];

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
];

const EditProjectForm = () => {
    const [projectName, setProjectName] = useState('');
    const [contractCode, setContractCode] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [members, setMembers] = useState();
    const [editProjectMember, setEditProjectMember] = useState(false);
    const [selectedMembers, setSelectedMembers] = useState(membersProjectList);

    useEffect(() => {
        console.log(selectedMembers.indexOf(membersProjectList[0]));
        console.log(selectedMembers);
        console.log(membersProjectList[0]);
    }, [selectedMembers]);
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
        const projectData = {
            projectName,
            contractCode,
            startDate,
            members,
        };
        console.log('Project Data:', projectData);
    };

    const handleShowEditProjectMember = (e) => {
        e.preventDefault();
        setEditProjectMember(true);
    };
    const memberOptions = ['Alice', 'Bob', 'Charlie', 'David'];

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <form onSubmit={handleSubmit}>
                <Typography variant="h6" gutterBottom>
                    Chỉnh sửa thông tin dự án
                </Typography>

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Typography span="h5">Tên dự án</Typography>

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
                        <Typography span="h5">Mã hợp đồng</Typography>
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
                        <Typography span="h5">Thành viên</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <AvatarGroup max={4} sx={{ marginRight: '5px' }}>
                                {membersProjectList.map((item, index) => (
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

                        {editProjectMember === true ? (
                            <div
                                style={{
                                    display: 'flex',
                                    height: '100vh',
                                    width: '100vw',
                                    alignItems: 'center',
                                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                                    top: 0,
                                    bottom: 0,
                                    position: 'absolute',
                                    zIndex: 2,
                                    left: 0,
                                    right: 0,
                                }}
                            >
                                <Card
                                    sx={{
                                        height: '90%',
                                        width: '40%',
                                        minWidth: '350px',
                                        margin: 'auto',
                                        boxSizing: 'border-box',
                                        padding: '20px',
                                        overflowY: 'auto',
                                        borderRadius: '10px',
                                        '&::-webkit-scrollbar': {
                                            display: 'none',
                                        },
                                        '-ms-overflow-style': 'none',
                                        'scrollbar-width': 'none',
                                    }}
                                >
                                    <Grid container spacing={3}>
                                        <Grid item xs={12}>
                                            <Typography variant="h6" gutterBottom>
                                                Chọn thành viên dự án
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
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
                                        </Grid>

                                        <Grid item xs={12}>
                                            <List>
                                                {totalMembers.map((member) => {
                                                    const labelId = `checkbox-list-label-${member.id}`;
                                                    return (
                                                        <ListItem key={member.id} onClick={() => handleToggle(member)}>
                                                            <ListItemAvatar>
                                                                <Avatar alt={member.name} src={member.avatar} />
                                                            </ListItemAvatar>
                                                            <ListItemText id={labelId} primary={member.name} />
                                                            <Checkbox
                                                                edge="end"
                                                                checked={selectedMembers.indexOf(member) !== -1}
                                                                tabIndex={-1}
                                                                disableRipple
                                                                inputProps={{ 'aria-labelledby': labelId }}
                                                            />
                                                        </ListItem>
                                                    );
                                                })}
                                            </List>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    e.preventDefault();
                                                }}
                                            >
                                                Lưu thay đổi
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Card>
                            </div>
                        ) : (
                            ''
                        )}
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Typography span="h5">Thời gian bắt đầu</Typography>

                        <DatePicker
                            label="Thời gian bắt đầu"
                            value={startDate}
                            onChange={(newValue) => setStartDate(newValue)}
                            fullWidth
                            renderInput={(params) => <TextField {...params} fullWidth />}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Typography span="h5">Phụ trách chính</Typography>

                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            fullWidth
                            options={memberOptions}
                            renderInput={(params) => <TextField {...params} label="Tìm kiếm theo Tên" />}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary">
                            Lưu thay đổi
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </LocalizationProvider>
    );
};

export default EditProjectForm;
