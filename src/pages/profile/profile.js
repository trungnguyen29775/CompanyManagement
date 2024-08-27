import { Avatar, Box, Typography } from '@mui/material';
import './profile.css';
import ArrowCircleLeftTwoToneIcon from '@mui/icons-material/ArrowCircleLeftTwoTone';
import BadgeIcon from '@mui/icons-material/Badge';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import WorkIcon from '@mui/icons-material/Work';
import { color } from '../../constant/style';
const Profile = () => {
    return (
        <div className="profile-container">
            <div className="profile-background">
                <div className="background-container"></div>
                <div className="profile-avt-container">
                    <img src="/image/avt.jpg" />
                </div>
                <span className="profile-name-user">Dương Nguyễn Duyên Linh (Chuyên viên)</span>
            </div>
            <div className="profile-content-container">
                <div className="profile-bio-container">
                    <div className="bio-item-container">
                        <Typography sx={{ marginBottom: '10px', fontWeight: 600 }} variant="h5">
                            Giới thiệu
                        </Typography>
                        <span>Tôi hiện là sinh viên năm 5 của trường Đại học Quốc Tế</span>
                    </div>
                    <div className="bio-item-container">
                        <Typography sx={{ marginBottom: '10px', fontWeight: 600 }} variant="h5">
                            Thành tựu đã đạt được
                        </Typography>
                        <div className="bio-item">
                            <EmojiEventsIcon />
                            <span>Top 3 cuộc thi khởi nghiệp IU Startup Demo Day 2022</span>
                        </div>
                        <div className="bio-item">
                            <EmojiEventsIcon />
                            <span>Tham gia giải thưởng sinh viên nghiên cứu khoa học </span>
                        </div>
                    </div>
                    <div className="bio-item-container">
                        <Typography sx={{ marginBottom: '10px', fontWeight: 600 }} variant="h5">
                            Dự án tham gia
                        </Typography>
                        <div className="bio-item">
                            <WorkIcon />
                            <span>Dự án nghiên cứu phát triển Robot tự động </span>
                        </div>
                        <div className="bio-item">
                            <WorkIcon />
                            <span>Bài toán qui hoạch thông minh</span>
                        </div>
                    </div>
                </div>
                <div className="profile-content">
                    <Typography color={color.mainColor} variant="h5">
                        Hoạt động của Duyên Linh
                    </Typography>
                    {[1, 1, 1, 1, 1].map((item, index) => (
                        <div className="profile-content-item" key={index}>
                            <div className="post-header-container">
                                <Avatar src="/image/avt.jpg" />
                                <div className="post-info-container">
                                    <span> Dương Nguyễn Duyên Linh</span>
                                    <span> 23/06/2024</span>
                                </div>
                            </div>
                            <Typography variant="subtitle">Đã tham gia vào dự án thành phố xanh</Typography>
                            <div className="profile-project-info-container">
                                <img src="/image/project.jpg" />
                            </div>
                            <Typography variant="subtitle">
                                Quis magna adipisicing excepteur do elit. Cupidatat sit quis qui duis do cupidatat sunt
                                in. Aliquip velit veniam cillum est pariatur deserunt esse laborum.
                            </Typography>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Profile;
