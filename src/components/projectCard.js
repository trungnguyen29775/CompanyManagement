import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const ProjectCard = (data, key) => {
    return (
        <Card sx={{ maxWidth: 345, margin: '15px ', marginRight: 0 }} key={key}>
            <CardMedia sx={{ height: 140 }} image="/image/project_poster.jpg" title="green iguana" />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Dự án A
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    <Typography gutterBottom variant="span" component="div">
                        Thành viên: 3
                    </Typography>
                    <Typography gutterBottom variant="span" component="div">
                        Lãnh đạo: Trung
                    </Typography>
                </Box>

                <Typography variant="body2" color="text.secondary">
                    Pariatur sunt ea ea incididunt et. Sunt fugiat irure amet labore consectetur. Incididunt fugiat enim
                    dolor commodo adipisicing sunt laborum nisi culpa ea cillum qui mollit id. Cillum duis deserunt
                    aliqua ad magna adipisicing id. Aliquip duis labore quis do est exercitation. Ut ullamco sit
                    cupidatat ex sunt est sit excepteur.
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Tham gia</Button>
                <Button size="small">Xem thêm</Button>
            </CardActions>
        </Card>
    );
};
export default ProjectCard;
