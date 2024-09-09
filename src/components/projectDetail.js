import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { Avatar, Slide, Stack } from '@mui/material';
import { color } from '../constant/style';

const ProjectDetail = () => {
    return (
        <div>
            <Card
                sx={{
                    width: '80%',
                    minWidth: 300,
                    display: 'flex',
                    flexDirection: 'column',
                    flexWrap: 'wrap',
                    margin: 'auto',
                    padding: '30px',
                    marginTop: '30%',
                }}
            >
                <CardMedia sx={{ height: 500 }} image="/image/project_poster.jpg" title="Project poster" />

                <Stack spacing={2} sx={{ padding: '15px', boxSizing: 'border-box' }}>
                    <Box
                        sx={{
                            flexDirection: 'row',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            width: '100%',
                            color: color.mainColor,
                        }}
                    >
                        <Typography variant="h3">Tên dự án</Typography>
                        <Typography variant="subtitle1">21/08/2024</Typography>
                    </Box>
                    <Slide direction="up" in={true} mountOnEnter unmountOnExit>
                        <Box
                            sx={{
                                width: '100%',
                                justifyContent: 'space-between',
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <Typography color={color.subLighterColor} variant="subtitle2">
                                Loại hình: GD
                            </Typography>
                            <Typography color={color.subLighterColor} variant="subtitle2">
                                Trạng thái: Đang thực hiện
                            </Typography>
                        </Box>
                    </Slide>

                    <Slide direction="up" in={true} mountOnEnter unmountOnExit>
                        <Typography variant="span">
                            Mô tả dự án: Elit et qui sunt id consequat. Laborum elit ipsum magna pariatur ad. Velit et
                            non dolore reprehenderit est pariatur officia reprehenderit proident dolore ut. Magna do
                            occaecat nostrud enim ex in qui sunt duis id mollit. Sint aliqua minim magna quis irure
                            eiusmod sint fugiat reprehenderit in. Sunt anim incididunt nulla nulla. Minim ex laboris
                            cillum enim exercitation pariatur est ullamco. Non labore sint laborum officia enim eu
                            ipsum. Aute officia deserunt ut pariatur amet minim. Ut eiusmod quis fugiat consequat
                            ullamco ex ad proident est consequat do. Nisi officia ut cillum exercitation ullamco. Aliqua
                            consequat excepteur ad nulla id id occaecat ipsum deserunt.
                        </Typography>
                    </Slide>
                    <Slide direction="up" in={true} mountOnEnter unmountOnExit>
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <Typography
                                variant="span"
                                sx={{ marginRight: '15px', fontSize: '15px', fontWeight: '500' }}
                            >
                                Lãnh đạo:
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <Avatar src="/image/avt_contact.jpg" sx={{ marginRight: '10px' }} />
                            </Box>
                        </Box>
                    </Slide>

                    <Slide direction="up" in={true} mountOnEnter unmountOnExit>
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <Typography
                                variant="span"
                                sx={{ marginRight: '15px', fontSize: '15px', fontWeight: '500' }}
                            >
                                Chuyên Viên:
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <Avatar src="/image/avt_contact.jpg" sx={{ marginRight: '10px' }} />
                                <Avatar src="/image/avt_contact.jpg" sx={{ marginRight: '10px' }} />
                                <Avatar src="/image/avt_contact.jpg" sx={{ marginRight: '10px' }} />
                            </Box>
                        </Box>
                    </Slide>

                    <Slide direction="up" in={true} mountOnEnter unmountOnExit>
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <Typography
                                variant="span"
                                sx={{ marginRight: '15px', fontSize: '15px', fontWeight: '500' }}
                            >
                                Đối tác:
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <Avatar src="/image/avt_contact.jpg" sx={{ marginRight: '10px' }} />
                            </Box>
                        </Box>
                    </Slide>
                </Stack>
            </Card>
        </div>
    );
};
export default ProjectDetail;
