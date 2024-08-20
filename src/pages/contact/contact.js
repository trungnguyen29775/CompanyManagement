import ContactCard from '../../components/contactCard';
import './contact.css';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { useEffect, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const Contact = () => {
    const [contactType, setContactType] = useState('Chuyên viên');
    const handleChangeContactType = (event) => {
        setContactType(event.target.value);
    };
    const members = [
        {
            label: 'Nguyễn Trần Minh Trung',
        },
        {
            label: 'Nguyễn Văn A',
        },
        {
            label: 'Nguyễn Văn B',
        },
        {
            label: 'Trần Văn C',
        },
        {
            label: 'Dương Văn D',
        },
    ];
    return (
        <div className="contact-container">
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
                <FormControl style={{ marginBottom: '20px', width: '200px', marginRight: '30px' }}>
                    <InputLabel id="contact-type-label">Thông tin</InputLabel>
                    <Select
                        labelId="contact-type-label"
                        id="contact-type-label-select"
                        value={contactType}
                        label="Thông tin"
                        onChange={handleChangeContactType}
                    >
                        <MenuItem value={'Chuyên viên'}>Chuyên viên</MenuItem>
                        <MenuItem value={'Lãnh đạo'}>Lãnh đạo</MenuItem>
                    </Select>
                </FormControl>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={members}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Tìm kiếm theo Tên" />}
                />
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    width: 'auto',
                }}
            >
                {[1, 2, 3, 1, 1, 1].map((item, index) => (
                    <ContactCard key={index} />
                ))}
            </Box>
        </div>
    );
};

export default Contact;
