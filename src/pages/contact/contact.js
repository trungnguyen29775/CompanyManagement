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
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';

const Contact = () => {
    const [contactType, setContactType] = useState('Chuyên viên');
    const [page, setPage] = useState(1);
    const visibleNum = 8;
    const [visibleData, setVisibleData] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(
            contactType === 'Chuyên Viên' ? [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] : [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        );
    }, [contactType]);
    useEffect(() => {
        setVisibleData(data.slice(0, visibleNum));
        setPage(1);
    }, [data]);
    useEffect(() => {
        console.log(visibleData);
    }, [visibleData]);
    const handleChangeContactType = (event) => {
        setContactType(event.target.value);
    };
    const handlePaginitionContact = (event, newPage) => {
        setPage(newPage);
        setVisibleData(data.slice((newPage - 1) * visibleNum, newPage * visibleNum));
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
            <div className="contact-card-container">
                {visibleData?.map((item, index) => (
                    <ContactCard key={index} />
                ))}
            </div>
            <Stack spacing={2} style={{ paddingBottom: '30px', margin: 'auto' }}>
                <Pagination
                    defaultPage={1}
                    count={
                        data?.length % visibleNum === 0
                            ? Math.floor(data.length / visibleNum)
                            : data.length < visibleNum
                            ? 1
                            : Math.floor(data.length / visibleNum) + 1
                    }
                    onChange={handlePaginitionContact}
                    page={page}
                />
            </Stack>
        </div>
    );
};

export default Contact;
