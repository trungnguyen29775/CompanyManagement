import { Box, Button, Typography } from '@mui/material';
import ProjectTable from '../components/projectTable';
import { color } from '../constant/style';
import MemberTable from '../components/memberTable';
import { useContext } from 'react';
import StateContext from '../context/context.context';
import { showAddMember } from '../context/action.context';

const AdminMember = () => {
    const [state, dispatchState] = useContext(StateContext);
    const handleShowAddMember = () => {
        dispatchState(showAddMember(''));
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
                <Typography variant="h5">Quản lý thành viên</Typography>
                <Button variant="contained" color="primary" onClick={handleShowAddMember}>
                    Thêm thành viên mới
                </Button>
            </Box>
            {
                
            }
            <MemberTable />
        </Box>
    );
};

export default AdminMember;
