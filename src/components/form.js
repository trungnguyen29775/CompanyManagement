import React, { useState } from 'react';
import { TextField, Button, Grid, MenuItem, Card, Typography } from '@mui/material';

const roles = [
    { value: 'admin', label: 'Admin' },
    { value: 'user', label: 'User' },
    { value: 'guest', label: 'Guest' },
];

export default function Form() {
    const [formValues, setFormValues] = useState({
        fullName: '',
        username: '',
        password: '',
        remainingSalary: '',
        role: '',
        totalDebt: '',
        dateOfBirth: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitted values:', formValues);
        // Handle form submission logic
    };

    return (
        <div
            style={{
                display: 'flex',
                height: '100vh',
                width: '100vw',
                alignItems: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
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
                    height: '70%',
                    width: '50%',
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
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h5">Chỉnh sửa thông tin thành viên</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Họ tên"
                                name="fullName"
                                value={formValues.fullName}
                                onChange={handleInputChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Username"
                                name="username"
                                value={formValues.username}
                                onChange={handleInputChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Password"
                                name="password"
                                type="password"
                                value={formValues.password}
                                onChange={handleInputChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Lương còn nợ"
                                name="remainingSalary"
                                type="number"
                                value={formValues.remainingSalary}
                                onChange={handleInputChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Vai trò"
                                name="role"
                                select
                                value={formValues.role}
                                onChange={handleInputChange}
                                required
                            >
                                {roles.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Tổng tiền nợ"
                                name="totalDebt"
                                type="number"
                                value={formValues.totalDebt}
                                onChange={handleInputChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Ngày sinh"
                                name="dateOfBirth"
                                type="date"
                                value={formValues.dateOfBirth}
                                onChange={handleInputChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary">
                                Lưu thay đổi
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Card>
        </div>
    );
}
