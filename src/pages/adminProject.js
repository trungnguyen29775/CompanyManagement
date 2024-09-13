import { Box, Button, Typography } from '@mui/material';
import ProjectTable from '../components/projectTable';
import { color } from '../constant/style';
import { useContext } from 'react';
import StateContext from '../context/context.context';
import { showAddProject } from '../context/action.context';

const AdminProject = () => {
    const [state, dispatchState] = useContext(StateContext);

    const handleShowAddProject = () => {
        dispatchState(showAddProject(''));
    };
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
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '100%',
                    justifyContent: 'space-between',
                    marginBottom: '20px',
                }}
            >
                <Typography variant="h5">Quản lý dự án</Typography>
                <Button variant="contained" color="primary" onClick={handleShowAddProject}>
                    Thêm dự án mới
                </Button>
            </Box>

            <ProjectTable />
        </Box>
    );
};

export default AdminProject;
