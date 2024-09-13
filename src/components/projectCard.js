import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import ProjectDetail from './projectDetail';
import { useEffect, useState } from 'react';

const ProjectCard = (data, key) => {
    const [projectDetail, setProjectDetail] = useState(false);
    const [temp, setTemp] = useState();
    const navigation = useNavigate();
    const handleProjectDetailClick = (event) => {
        setProjectDetail(true);
    };

    useEffect(() => {
        setTemp(data.data);
    }, [data]);

    useEffect(() => {
        console.log(temp);
    }, [temp]);

    return (
        <>
            <Card
                sx={{
                    maxWidth: 345,
                    margin: '15px ',
                    marginRight: 0,
                    transform: 'scale 2s ease',
                    ':hover': { cursor: 'pointer', scale: '1.01' },
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}
                key={key}
            >
                <CardMedia sx={{ height: 140 }} image="/image/project_poster.jpg" title="Project poster" />
                <CardContent sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <Typography gutterBottom variant="h5">
                        {temp?.name}
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Typography gutterBottom variant="span" component="div">
                            Thành viên: {temp?.numMember}
                        </Typography>
                        <Typography gutterBottom variant="span" component="div">
                            Lãnh đạo: {temp?.leader}
                        </Typography>
                    </Box>

                    <Typography variant="body2" color="text.secondary">
                        {temp?.description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Tham gia</Button>
                    <Button size="small" onClick={handleProjectDetailClick}>
                        Xem thêm
                    </Button>
                </CardActions>
            </Card>
            {projectDetail === true ? (
                <div className="project-detail-container">
                    <Button
                        sx={{
                            display: 'flex',
                            position: 'fixed',
                            top: '30px',
                            left: '30px',
                            backgroundColor: 'white',
                            fontWeight: 600,
                            fontSize: '15px',
                        }}
                        onClick={() => setProjectDetail(false)}
                    >
                        Quay lại
                    </Button>
                    <ProjectDetail />
                </div>
            ) : (
                ''
            )}
        </>
    );
};
export default ProjectCard;
