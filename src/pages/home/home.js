import './home.css';
import { useContext, useEffect, useState } from 'react';
import StateContext from '../../context/context.context';
import EnhancedTable from '../../components/tableData/tableData';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import { color } from '../../constant/style';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ProjectCard from '../../components/projectCard';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
function Home() {
    const [state, dispatchState] = useContext(StateContext);
    const [projects, setProjects] = useState([]);
    const visibleNum = 8;
    const [projecType, setProjectType] = useState('Dự Án Giáo Dục');
    const [visibleData, setVisibleData] = useState(projects);
    const [page, setPage] = useState(1);
    useEffect(() => {
        setProjects(projecType === 'Dự Án Giáo Dục' ? [1, 1, 2, 3, 4, 5, 6, 1, 1, 1, 1] : [1, 2]);
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
        setVisibleData(projects.slice((newPage - 1) * visibleNum, newPage * visibleNum + 1));
    };
    return (
        <div className="content-container">
            {state.userData.type === 'member' ? (
                <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                    <Box sx={{ width: '100%' }}>
                        <FormControl style={{ marginBottom: '20px' }}>
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
            ) : (
                <EnhancedTable />
            )}
        </div>
    );
}

export default Home;
