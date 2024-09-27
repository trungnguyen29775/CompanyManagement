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
import { hideAddMember, hideEditMember, showNotify, updateMember } from '../context/action.context';
import instance from '../axios/instance';
import { CREATE_NEW_MEMBER, UPDATE_MEMBER } from '../constant/endPoint';

const EditMemberForm = () => {
    const [state, dispatchState] = useContext(StateContext);
    const [username, setUsername] = useState(state.editMember.data.username);
    const [password, setPassword] = useState('');
    const [name, setName] = useState(state.editMember.data.name);
    const [day, setDay] = useState(state.editMember.data.dob?.split('-')[2]);
    const [month, setMonth] = useState(state.editMember.data.dob?.split('-')[1]);
    const [year, setYear] = useState(state.editMember.data.dob?.split('-')[0]);
    const [role, setRole] = useState(state.editMember.data.role);
    const [addStatus, setAddStatus] = useState(true);
    // Context
    // Funtion

    const handleSubmit = (e) => {
        e.preventDefault();
        const memberData = {
            name,
            password:
                password?.length > 0
                    ? password !== state.editMember.data.password
                        ? password
                        : state.editMember.data.password
                    : state.editMember.data.password,
            role,
            dob: `${year}-${month}-${day}`,
            avtFilePath: null,
            username,
        };
        console.log(memberData);
        if (
            memberData.name != state.editMember.data.name ||
            memberData.password != state.editMember.data.password ||
            memberData.role != state.editMember.data.role ||
            memberData.dob != state.editMember.data.dob
        ) {
            instance
                .post(UPDATE_MEMBER, memberData)
                .then((res) => {
                    console.log(res.data);
                    dispatchState(updateMember({ ...memberData, stt: state.editMember.data.stt }));
                    dispatchState(hideEditMember(''));
                    dispatchState(
                        showNotify({
                            message: 'Thêm thành viên thành công',
                            action: 'undo',
                        }),
                    );
                })
                .catch((err) => console.log(err));
        }
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
                        disabled
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography span="h5" marginBottom={'10px'}>
                        Mật khẩu mới{' (không thay đổi thì để trống)'}
                    </Typography>

                    <TextField
                        id="password"
                        label="Mật khẩu mới"
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
                        Lưu thay đổi
                    </Button>
                    <Button
                        onClick={() => dispatchState(hideEditMember(''))}
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
