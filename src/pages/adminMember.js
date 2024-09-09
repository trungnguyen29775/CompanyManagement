import { Box, Typography } from '@mui/material';
import ProjectTable from '../components/projectTable';
import { color } from '../constant/style';
import MemberTable from '../components/memberTable';

const AdminMember = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                width: '100%',
                padding: '16px',
                boxSizing: 'border-box',
                color: color.mainColor,
            }}
        >
            <Typography variant="h5" sx={{ marginBottom: '20px' }}>
                Quản lý Thành viên
            </Typography>
            <MemberTable />
        </Box>
    );
};

export default AdminMember;
