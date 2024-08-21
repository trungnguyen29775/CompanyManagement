import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { red } from '@mui/material/colors';
import { blue } from '@mui/material/colors';

const ContactCard = (data, key) => {
    return (
        <Card sx={{ maxWidth: 320, margin: '15px ', marginRight: 0 }} key={key}>
            <CardMedia sx={{ height: 200 }} image="/image/avt_contact.jpg" title="green iguana" />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Nguyễn Trần Minh Trung
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    <Typography gutterBottom variant="span" component="div" color={red[900]}>
                        Chuyên viên
                    </Typography>
                </Box>
                <Box>
                    <Typography fontSize={'13px'} gutterBottom variant="span" component="div" color={blue[900]}>
                        Email: trungnguyen29775@gmail.com
                    </Typography>
                    <Typography fontSize={'13px'} gutterBottom variant="span" component="div" color={blue[900]}>
                        Phone: 0972419560
                    </Typography>
                </Box>
            </CardContent>
            <CardActions>
                <Button size="small">Nhắn tin</Button>
            </CardActions>
        </Card>
    );
};
export default ContactCard;
