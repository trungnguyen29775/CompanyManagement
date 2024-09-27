import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import { visuallyHidden } from '@mui/utils';
import Avatar from '@mui/material/Avatar';
import EditIcon from '@mui/icons-material/Edit';
import {
    Autocomplete,
    Button,
    Card,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
} from '@mui/material';
import StateContext from '../context/context.context';
import EditMemberForm from './editMemberForm';
import AddNewMember from './addMember';
import instance from '../axios/instance';
import { GET_ADMIN_MEMBER } from '../constant/endPoint';
import { clearUpdateMember, showEditMember } from '../context/action.context';

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
function createData(stt, name, username, role, avtFilePath, valueProposition, dob, totalDebt) {
    return {
        stt,
        name,
        username,
        role,
        avtFilePath,
        valueProposition,
        dob,
        totalDebt,
    };
}

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array?.map((el, index) => [el, index]);
    stabilizedThis?.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis?.map((el) => el[0]);
}

const headCells = [
    {
        id: 'stt',
        numeric: true,
        disablePadding: true,
        label: 'STT',
    },
    {
        id: 'name',
        numeric: false,
        disablePadding: false,
        label: 'Họ và Tên',
    },
    {
        id: 'username',
        numeric: false,
        disablePadding: false,
        label: 'Tài Khoản',
    },
    {
        id: 'role',
        numeric: false,
        disablePadding: false,
        label: 'Vai trò',
    },
    {
        id: 'valueProposition',
        numeric: false,
        disablePadding: false,
        label: 'Gía trị tích lũy',
    },
    {
        id: 'dob',
        numeric: false,
        disablePadding: false,
        label: 'Ngày sinh',
    },
    {
        id: 'action',
        numeric: false,
        disablePadding: false,
        label: 'Action',
    },
];

function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align="left"
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
    const { numSelected, memberSelected } = props;
    const [delteMember, setDeleteMember] = React.useState(false);

    const handleCloseConfirmDelete = () => {
        console.log(memberSelected);
        setDeleteMember(false);
    };

    return (
        <Toolbar
            sx={{
                boxSizing: 'border-box',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
            }}
        >
            <Dialog
                open={delteMember}
                onClose={handleCloseConfirmDelete}
                aria-labelledby="alert-delete-member-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-delete-member-title">Bạn có chắc muốn xóa thành viên này chứ?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Nếu bấm đồng ý sẽ xóa thành viên này vĩnh viễn và không thể phục hồi.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button>Đồng ý</Button>
                    <Button autoFocus onClick={handleCloseConfirmDelete}>
                        Từ chối
                    </Button>
                </DialogActions>
            </Dialog>
            <Toolbar
                sx={{
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                    ...(numSelected > 0 && {
                        bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                    }),
                    width: '100%',
                    boxSizing: 'border-box',
                    display: numSelected > 0 ? 'flex' : 'none',
                    marginTop: '10px',
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', height: '100%' }}>
                    {numSelected > 0 ? (
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                width: '100%',
                                alignItems: 'center',
                            }}
                        >
                            <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
                                {numSelected} selected
                            </Typography>
                            <Tooltip
                                title="Delete"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setDeleteMember(true);
                                }}
                            >
                                <IconButton>
                                    <DeleteIcon />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    ) : (
                        ''
                    )}
                </Box>
            </Toolbar>
            <Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '30px' }}>
                    <Typography variant="h6" id="tableTitle" component="div">
                        Thành Viên
                    </Typography>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={members}
                        sx={{ width: 300, marginLeft: '20px' }}
                        renderInput={(params) => <TextField {...params} label="Tìm kiếm theo Tên" />}
                    />
                </Box>
            </Box>
        </Toolbar>
    );
}

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

export default function MemberTable() {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('stt');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(20);
    const [editState, setEditState] = React.useState(false);
    const [state, dispatchState] = React.useContext(StateContext);
    const [memberData, setMemberData] = React.useState([]);
    const [visibleRows, setVisibleRows] = React.useState([]);
    const [highlight, setHighLight] = React.useState([]);
    React.useEffect(() => {
        console.log(selected);
    }, [selected]);
    // Use Effect
    React.useEffect(() => {
        instance
            .post(GET_ADMIN_MEMBER, state.userData)
            .then((res) => {
                setMemberData(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    React.useEffect(() => {
        if (memberData.length != 0) {
            setVisibleRows(
                () =>
                    stableSort(memberData, getComparator(order, orderBy))?.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage,
                    ),
                [order, orderBy, page, rowsPerPage],
            );
        }
    }, [memberData]);

    React.useEffect(() => {
        if (state.updateMember?.status === true) {
            const targetIndex = memberData.findIndex((item) => item.username === state.updateMember.data.username);
            if (targetIndex !== -1) {
                let temp = [];
                temp = memberData.slice(0, targetIndex).concat(memberData.slice(targetIndex + 1, memberData.length));
                temp.unshift(state.updateMember.data);
                setMemberData(temp);
            } else if (targetIndex === -1) setMemberData((preState) => [state.updateMember.data, ...preState]);
            setHighLight((preState) => [...preState, state.updateMember.data.stt]);
            dispatchState(clearUpdateMember(''));
        }
    }, [state]);

    React.useEffect(() => {
        if (highlight.length !== 0) {
            setTimeout(() => {
                setHighLight((preState) => {
                    let temp = preState;
                    temp.shift();
                    return temp;
                });
            }, 10000);
        }
    }, [highlight]);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = memberData?.map((n) => n);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, data) => {
        const selectedIndex = selected.indexOf(data);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, data);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const isSelected = (id) => selected?.findIndex((item) => item.id === id);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - memberData?.length) : 0;

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <EnhancedTableToolbar numSelected={selected.length} memberSelected={selected} />
                <TableContainer>
                    <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={memberData?.length}
                        />
                        <TableBody>
                            {visibleRows?.map((row, index) => {
                                const isItemSelected = isSelected(row.stt);
                                const labelId = `enhanced-table-checkbox-${index}`;
                                console.log(isItemSelected);
                                return (
                                    <TableRow
                                        hover
                                        onClick={(event) => handleClick(event, row)}
                                        role="checkbox"
                                        aria-checked={isItemSelected === -1 ? false : true}
                                        tabIndex={-1}
                                        key={row.stt}
                                        selected={isItemSelected === -1 ? false : true}
                                        sx={{
                                            cursor: 'pointer',
                                            transition: 'background-color 3s ease',
                                            backgroundColor: highlight?.indexOf(row.stt) !== -1 ? '#1976d2' : 'white',
                                        }}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                color="primary"
                                                checked={isItemSelected === -1 ? false : true}
                                                inputProps={{
                                                    'aria-labelledby': labelId,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell align="left" component="th" id={labelId} scope="row" padding="none">
                                            {row.stt}
                                        </TableCell>
                                        <TableCell
                                            align="left"
                                            style={{
                                                alignItems: 'center',
                                                display: 'flex',
                                                flexDirection: 'row',
                                            }}
                                        >
                                            <Avatar
                                                style={{ marginRight: '10px' }}
                                                alt="Remy Sharp"
                                                src={row.avtFilePath}
                                            />

                                            {row.name}
                                        </TableCell>
                                        <TableCell align="left">{row.username}</TableCell>
                                        <TableCell align="left">
                                            {row.role === 'member'
                                                ? 'Chuyên viên'
                                                : row.role === 'leader'
                                                ? 'Lãnh đạo'
                                                : 'Lỗi'}
                                        </TableCell>
                                        <TableCell align="left">{row.valueProposition}</TableCell>
                                        <TableCell align="left">{row.dob}</TableCell>
                                        <TableCell align="left">
                                            <Button>
                                                <EditIcon
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        dispatchState(showEditMember(row));
                                                    }}
                                                    color="action"
                                                ></EditIcon>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[20, 40, 100]}
                    component="div"
                    count={memberData?.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            {state.editMember?.show === true ? (
                <div
                    style={{
                        display: 'flex',
                        height: '100vh',
                        width: '100vw',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.2)',
                        top: 0,
                        bottom: 0,
                        position: 'absolute',
                        zIndex: 2,
                        left: 0,
                        right: 0,
                    }}
                >
                    <Card
                        sx={{
                            height: '90%',
                            width: '90%',
                            margin: 'auto',
                            boxSizing: 'border-box',
                            padding: '20px',
                            overflowY: 'auto',
                            borderRadius: '10px',
                            '&::-webkit-scrollbar': {
                                display: 'none',
                            },
                            msOverflowStyle: 'none',
                            scrollbarWidth: 'none',
                        }}
                    >
                        <EditMemberForm />
                    </Card>
                </div>
            ) : state.addMember === true ? (
                <div
                    style={{
                        display: 'flex',
                        height: '100vh',
                        width: '100vw',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.2)',
                        top: 0,
                        bottom: 0,
                        position: 'absolute',
                        zIndex: 2,
                        left: 0,
                        right: 0,
                    }}
                >
                    <Card
                        sx={{
                            height: '90%',
                            width: '90%',
                            margin: 'auto',
                            boxSizing: 'border-box',
                            padding: '20px',
                            overflowY: 'auto',
                            borderRadius: '10px',
                            '&::-webkit-scrollbar': {
                                display: 'none',
                            },
                            msOverflowStyle: 'none',
                            scrollbarWidth: 'none',
                        }}
                    >
                        <AddNewMember currentMembers={memberData} />
                    </Card>
                </div>
            ) : (
                ''
            )}
        </Box>
    );
}
