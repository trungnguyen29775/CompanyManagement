import { Box, Typography } from '@mui/material';
import ProjectTable from '../components/projectTable';
import { color } from '../constant/style';

const AdminProject = () => {
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
                Quản lý dự án
            </Typography>
            <ProjectTable />
        </Box>
    );
};

export default AdminProject;
