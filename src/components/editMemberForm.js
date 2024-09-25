import React, { Fragment, useContext, useEffect, useState } from 'react';
import {
    TextField,
    Button,
    Grid,
    Typography,
    Box,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Snackbar,
} from '@mui/material';
import StateContext from '../context/context.context';
import { hideAddMember, showNotify } from '../context/action.context';
import instance from '../axios/instance';
import { CREATE_NEW_MEMBER } from '../constant/endPoint';

const EditMemberForm = () => {
    const [state, dispatchState] = useContext(StateContext);
    const [username, setUsername] = useState(state.editMember.data.username);
    const [password, setPassword] = useState('');
    const [name, setName] = useState(state.editMember.data.name);
    const [day, setDay] = useState();
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [role, setRole] = useState(state.editMember.data.role);
    const [addStatus, setAddStatus] = useState(true);
    // Context
    // Funtion

    const handleSubmit = (e) => {
        e.preventDefault();
        const memberData = {
            name,
            password,
            role,
            dob: `${year}-${month}-${day}`,
            accumulatedValue: 0,
            avtFilePath: null,
            username,
        };
        console.log(memberData);

        instance
            .post(CREATE_NEW_MEMBER, memberData)
            .then((res) => {
                dispatchState(hideAddMember(''));

                dispatchState(
                    showNotify({
                        message: 'Thêm thành viên thành công',
                        action: 'undo',
                    }),
                );
            })
            .catch((err) => console.log(err));
    };

    return (
        <form onSubmit={handleSubmit}>
            <Typography variant="h6" gutterBottom>
                Thêm thành viên mới
            </Typography>

            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography span="h5" marginBottom={'10px'}>
                        Tên tài khoản
                    </Typography>

                    <TextField
                        required
                        id="username"
                        label="Tên tài khoản"
                        fullWidth
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography span="h5" marginBottom={'10px'}>
                        Mật khẩu
                    </Typography>

                    <TextField
                        required
                        id="password"
                        label="Mật khẩu"
                        type="password"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Typography span="h5" marginBottom={'10px'}>
                        Tên thành viên
                    </Typography>

                    <TextField
                        required
                        id="name"
                        label="Tên dự án"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography span="h5" marginBottom={'10px'}>
                        Ngày sinh
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap' }}>
                        <TextField
                            onChange={(e) => setDay(e.target.value)}
                            value={day}
                            sx={{ marginRight: '10px', flex: 1 }}
                            required
                            label="Ngày"
                        />
                        <TextField
                            onChange={(e) => setMonth(e.target.value)}
                            value={month}
                            sx={{ marginRight: '10px', flex: 1 }}
                            required
                            label="Tháng"
                        />
                        <TextField
                            onChange={(e) => setYear(e.target.value)}
                            value={year}
                            sx={{ marginRight: '10px', flex: 1 }}
                            required
                            label="Năm"
                        />
                    </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <InputLabel id="role-label">Vai trò</InputLabel>
                        <Select
                            labelId="role-label"
                            id="role-select"
                            value={role}
                            label="Vai trò"
                            onChange={(e) => setRole(e.target.value)}
                            fullWidth
                        >
                            <MenuItem value={'member'}>Chuyên Viên</MenuItem>
                            <MenuItem value={'leader'}>Lãnh Đạo</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}></Grid>

                <Grid item xs={12} sm={6} sx={{ marginTop: '30px' }}>
                    <Button type="submit" variant="contained" color="primary" sx={{}}>
                        Thêm thành viên
                    </Button>
                    <Button
                        onClick={() => dispatchState(hideAddMember(''))}
                        sx={{ marginLeft: '20px' }}
                        type="button"
                        variant="contained"
                        color="primary"
                    >
                        Thoát
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default EditMemberForm;
