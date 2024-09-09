import './home.css';
import { useContext, useEffect, useState } from 'react';
import StateContext from '../../context/context.context';
import EnhancedTable from '../../components/projectTable';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import { color } from '../../constant/style';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ProjectCard from '../../components/projectCard';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import ProjectDetail from '../../components/projectDetail';
import { Autocomplete, TextField } from '@mui/material';

const members = [
    {
        label: 'Dự án A',
    },
    {
        label: 'Dự án B',
    },
    {
        label: 'Dự án C',
    },
    {
        label: 'Dự án D',
    },
    {
        label: 'Dự án E',
    },
    {
        label: 'Dự án F',
    },
    {
        label: 'Dự án G',
    },
    {
        label: 'Dự án H',
    },
    {
        label: 'Dự án A',
    },
];

function createData(name, numMember, leader, description, date, type, status, progress, contractCode) {
    return {
        name,
        numMember,
        leader,
        description,
        date,
        type,
        status,
        contractCode,
    };
}

const eduProject = [
    createData(
        'Dự án A',
        3,
        'Trung',
        'ng sunt laborum nisi culpa ea cillum qui mollit id. Cillum duis deserunt aliqua ad magna adipisicing id. Aliquip duis labore quis do est exercitation. Ut ullamco sit cupidatat ex sunt est sit excepteur.',
        '23/07/2023',
        'Dự án giáo dục',
        'pending',
        '010/HDDT-DHCNSG',
    ),
    createData(
        'Dự án A',
        3,
        'Trung',
        'Pariatur sunt ea ea incididunt et. Sunt fugiat irure amet labore consectetur. Incididunt fugiat enim dolor commodo adipisicing sunt laborum nisi culpa ea cillum qui mollit id. Cillum duis deserunt aliqua ad magna adipisicing id. Aliquip duis labore quis do est exercitation. Ut ullamco sit cupidatat ex sunt est sit excepteur.',
        '23/07/2023',
        'Dự án giáo dục',
        'pending',
        '010/HDDT-DHCNSG',
    ),
    createData(
        'Dự án A',
        3,
        'Trung',
        'Pariatur sunt ea ea incididunt et. Sunt fugiat irure amet labore consectetur. Incididunt fugiat enim dolor commodo adipisicing sunt laborum nisi culpa ea cillum qui mollit id. Cillum duis deserunt aliqua ad magna adipisicing id. Aliquip duis labore quis do est exercitation. Ut ullamco sit cupidatat ex sunt est sit excepteur.',
        '23/07/2023',
        'Dự án giáo dục',
        'pending',
        '010/HDDT-DHCNSG',
    ),
    createData(
        'Dự án A',
        3,
        'Trung',
        'Pariatur sunt ea ea incididunt et. Sunt fugiat irure amet labore consectetur. Incididunt fugiat enim dolor commodo adipisicing sunt laborum nisi culpa ea cillum qui mollit id. Cillum duis deserunt aliqua ad magna adipisicing id. Aliquip duis labore quis do est exercitation. Ut ullamco sit cupidatat ex sunt est sit excepteur.',
        '23/07/2023',
        'Dự án giáo dục',
        'pending',
        '010/HDDT-DHCNSG',
    ),
    createData(
        'Dự án A',
        3,
        'Trung',
        'Pariatur sunt ea ea incididunt et. Sunt fugiat irure amet labore consectetur. Incididunt fugiat enim dolor commodo adipisicing sunt laborum nisi culpa ea cillum qui mollit id. Cillum duis deserunt aliqua ad magna adipisicing id. Aliquip duis labore quis do est exercitation. Ut ullamco sit cupidatat ex sunt est sit excepteur.',
        '23/07/2023',
        'Dự án giáo dục',
        'pending',
        '010/HDDT-DHCNSG',
    ),
    createData(
        'Dự án A',
        3,
        'Trung',
        'Pariatur sunt ea ea incididunt et. Sunt fugiat irure amet labore consectetur. Incididunt fugiat enim dolor commodo adipisicing sunt laborum nisi culpa ea cillum qui mollit id. Cillum duis deserunt aliqua ad magna adipisicing id. Aliquip duis labore quis do est exercitation. Ut ullamco sit cupidatat ex sunt est sit excepteur.',
        '23/07/2023',
        'Dự án giáo dục',
        'pending',
        '010/HDDT-DHCNSG',
    ),
    createData(
        'Dự án A',
        3,
        'Trung',
        'Pariatur sunt ea ea incididunt et. Sunt fugiat irure amet labore consectetur. Incididunt fugiat enim dolor commodo adipisicing sunt laborum nisi culpa ea cillum qui mollit id. Cillum duis deserunt aliqua ad magna adipisicing id. Aliquip duis labore quis do est exercitation. Ut ullamco sit cupidatat ex sunt est sit excepteur.',
        '23/07/2023',
        'Dự án giáo dục',
        'pending',
        '010/HDDT-DHCNSG',
    ),
    createData(
        'Dự án A',
        3,
        'Trung',
        'Pariatur sunt ea ea incididunt et. Sunt fugiat irure amet labore consectetur. Incididunt fugiat enim dolor commodo adipisicing sunt laborum nisi culpa ea cillum qui mollit id. Cillum duis deserunt aliqua ad magna adipisicing id. Aliquip duis labore quis do est exercitation. Ut ullamco sit cupidatat ex sunt est sit excepteur.',
        '23/07/2023',
        'Dự án giáo dục',
        'pending',
        '010/HDDT-DHCNSG',
    ),
    createData(
        'Dự án A',
        3,
        'Trung',
        'Pariatur sunt ea ea incididunt et. Sunt fugiat irure amet labore consectetur. Incididunt fugiat enim dolor commodo adipisicing sunt laborum nisi culpa ea cillum qui mollit id. Cillum duis deserunt aliqua ad magna adipisicing id. Aliquip duis labore quis do est exercitation. Ut ullamco sit cupidatat ex sunt est sit excepteur.',
        '23/07/2023',
        'Dự án giáo dục',
        'pending',
        '010/HDDT-DHCNSG',
    ),
    createData(
        'Dự án A',
        3,
        'Trung',
        'Pariatur sunt ea ea incididunt et. Sunt fugiat irure amet labore consectetur. Incididunt fugiat enim dolor commodo adipisicing sunt laborum nisi culpa ea cillum qui mollit id. Cillum duis deserunt aliqua ad magna adipisicing id. Aliquip duis labore quis do est exercitation. Ut ullamco sit cupidatat ex sunt est sit excepteur.',
        '23/07/2023',
        'Dự án giáo dục',
        'pending',
        '010/HDDT-DHCNSG',
    ),
    createData(
        'Dự án A',
        3,
        'Trung',
        'Pariatur sunt ea ea incididunt et. Sunt fugiat irure amet labore consectetur. Incididunt fugiat enim dolor commodo adipisicing sunt laborum nisi culpa ea cillum qui mollit id. Cillum duis deserunt aliqua ad magna adipisicing id. Aliquip duis labore quis do est exercitation. Ut ullamco sit cupidatat ex sunt est sit excepteur.',
        '23/07/2023',
        'Dự án giáo dục',
        'pending',
        '010/HDDT-DHCNSG',
    ),
    createData(
        'Dự án A',
        3,
        'Trung',
        'Pariatur sunt ea ea incididunt et. Sunt fugiat irure amet labore consectetur. Incididunt fugiat enim dolor commodo adipisicing sunt laborum nisi culpa ea cillum qui mollit id. Cillum duis deserunt aliqua ad magna adipisicing id. Aliquip duis labore quis do est exercitation. Ut ullamco sit cupidatat ex sunt est sit excepteur.',
        '23/07/2023',
        'Dự án giáo dục',
        'pending',
        '010/HDDT-DHCNSG',
    ),
];

const businessProject = [
    createData(
        'Dự án A',
        3,
        'Trung',
        'Pariatur sunt ea ea incididunt et. Sunt fugiat irure amet labore consectetur. Incididunt fugiat enim dolor commodo adipisicing sunt laborum nisi culpa ea cillum qui mollit id. Cillum duis deserunt aliqua ad magna adipisicing id. Aliquip duis labore quis do est exercitation. Ut ullamco sit cupidatat ex sunt est sit excepteur.',
        '23/07/2023',
        'Dự án doanh nghiệp',
        'pending',
        '010/HDDT-DHCNSG',
    ),
    createData(
        'Dự án A',
        3,
        'Trung',
        'Pariatur sunt ea ea incididunt et. Sunt fugiat irure amet labore consectetur. Incididunt fugiat enim dolor commodo adipisicing sunt laborum nisi culpa ea cillum qui mollit id. Cillum duis deserunt aliqua ad magna adipisicing id. Aliquip duis labore quis do est exercitation. Ut ullamco sit cupidatat ex sunt est sit excepteur.',
        '23/07/2023',
        'Dự án doanh nghiệp',
        'pending',
        '010/HDDT-DHCNSG',
    ),
    createData(
        'Dự án A',
        3,
        'Trung',
        'Pariatur sunt ea ea incididunt et. Sunt fugiat irure amet labore consectetur. Incididunt fugiat enim dolor commodo adipisicing sunt laborum nisi culpa ea cillum qui mollit id. Cillum duis deserunt aliqua ad magna adipisicing id. Aliquip duis labore quis do est exercitation. Ut ullamco sit cupidatat ex sunt est sit excepteur.',
        '23/07/2023',
        'Dự án doanh nghiệp',
        'pending',
        '010/HDDT-DHCNSG',
    ),
    createData(
        'Dự án A',
        3,
        'Trung',
        'Pariatur sunt ea ea incididunt et. Sunt fugiat irure amet labore consectetur. Incididunt fugiat enim dolor commodo adipisicing sunt laborum nisi culpa ea cillum qui mollit id. Cillum duis deserunt aliqua ad magna adipisicing id. Aliquip duis labore quis do est exercitation. Ut ullamco sit cupidatat ex sunt est sit excepteur.',
        '23/07/2023',
        'Dự án doanh nghiệp',
        'pending',
        '010/HDDT-DHCNSG',
    ),
    createData(
        'Dự án A',
        3,
        'Trung',
        'Pariatur sunt ea ea incididunt et. Sunt fugiat irure amet labore consectetur. Incididunt fugiat enim dolor commodo adipisicing sunt laborum nisi culpa ea cillum qui mollit id. Cillum duis deserunt aliqua ad magna adipisicing id. Aliquip duis labore quis do est exercitation. Ut ullamco sit cupidatat ex sunt est sit excepteur.',
        '23/07/2023',
        'Dự án doanh nghiệp',
        'pending',
        '010/HDDT-DHCNSG',
    ),
    createData(
        'Dự án A',
        3,
        'Trung',
        'Pariatur sunt ea ea incididunt et. Sunt fugiat irure amet labore consectetur. Incididunt fugiat enim dolor commodo adipisicing sunt laborum nisi culpa ea cillum qui mollit id. Cillum duis deserunt aliqua ad magna adipisicing id. Aliquip duis labore quis do est exercitation. Ut ullamco sit cupidatat ex sunt est sit excepteur.',
        '23/07/2023',
        'Dự án doanh nghiệp',
        'pending',
        '010/HDDT-DHCNSG',
    ),
];

function Home() {
    const [state, dispatchState] = useContext(StateContext);
    const [projects, setProjects] = useState([]);
    const visibleNum = 8;
    const [projecType, setProjectType] = useState('Dự Án Giáo Dục');
    const [visibleData, setVisibleData] = useState(projects);
    const [page, setPage] = useState(1);
    useEffect(() => {
        setProjects(projecType === 'Dự Án Giáo Dục' ? eduProject : businessProject);
    }, [projecType]);
    useEffect(() => {
        setVisibleData(projects.slice(0, visibleNum));
    }, [projects]);

    // Function

    const handleChangeProjectNav = (event) => {
        setProjectType(event.target.value);
    };

    const handlePaginitionProject = (event, newPage) => {
        setPage(newPage);
        setVisibleData(projects.slice((newPage - 1) * visibleNum, newPage * visibleNum));
    };
    return (
        <div className="content-container">
            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <FormControl sx={{ marginRight: '40px' }}>
                        <InputLabel id="project-type-label">Loại Dự Án</InputLabel>
                        <Select
                            labelId="project-type-label"
                            id="project-type-label-select"
                            value={projecType}
                            label="Loại Dự Án"
                            onChange={handleChangeProjectNav}
                        >
                            <MenuItem value={'Dự Án Giáo Dục'}>Dự Án Giáo Dục</MenuItem>
                            <MenuItem value={'Dự Án Doanh Nghiệp'}>Dự Án Doanh Nghiệp</MenuItem>
                        </Select>
                    </FormControl>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={members}
                        sx={{ width: 300, height: '100%' }}
                        renderInput={(params) => <TextField {...params} label="Tìm kiếm theo tên dự án" />}
                    />
                </Box>
                <div className="content-main">
                    {visibleData?.map((item, index) => {
                        return <ProjectCard data={item} key={index} />;
                    })}
                </div>
                <Stack spacing={2} style={{ marginBottom: '30px' }}>
                    <Pagination
                        defaultPage={1}
                        count={
                            projects?.length % visibleNum === 0
                                ? Math.floor(projects.length / visibleNum)
                                : projects.length < visibleNum
                                ? 1
                                : Math.floor(projects.length / visibleNum) + 1
                        }
                        onChange={handlePaginitionProject}
                        page={page}
                    />
                </Stack>
            </div>
        </div>
    );
}

export default Home;
