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
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import Avatar from '@mui/material/Avatar';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Autocomplete, Button, Card, Input, TextField } from '@mui/material';
import { InputOutlined } from '@mui/icons-material';
import EditProjectForm from './editForm';
import StateContext from '../context/context.context';
import { clearUpdate, showEditProject } from '../context/action.context';
import AddNewProject from './addProject';
function createData(id, startDate, projectName, contractCode, mentor, statusProject, salaryStatus, members) {
    return {
        id,
        startDate,
        projectName,
        contractCode,
        mentor,
        statusProject,
        salaryStatus,
        members,
    };
}

const projects = [
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
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: 'id',
        numeric: true,
        disablePadding: true,
        label: 'ID',
    },
    {
        id: 'startDate',
        numeric: false,
        disablePadding: false,
        label: 'Ngày',
    },
    {
        id: 'projectName',
        numeric: false,
        disablePadding: false,
        label: 'Tên dự án',
    },
    {
        id: 'contractCode',
        numeric: false,
        disablePadding: false,
        label: 'Mã hợp đồng',
    },
    {
        id: 'mentor',
        numeric: false,
        disablePadding: false,
        label: 'Người phụ trách chính',
    },
    {
        id: 'numMember',
        numeric: false,
        disablePadding: false,
        label: 'Số lượng',
    },

    {
        id: 'statusProject',
        numeric: true,
        disablePadding: false,
        label: 'Tình trạng',
    },
    {
        id: 'salaryStatus',
        numeric: true,
        disablePadding: false,
        label: 'Tình trạng lương',
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
    const { numSelected } = props;

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
                                justifyConnamet: 'space-between',
                                width: '100%',
                                alignItems: 'center',
                            }}
                        >
                            <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
                                {numSelected} selected
                            </Typography>
                            <Tooltip title="Delete">
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
                        Dự án
                    </Typography>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={projects}
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

export default function ProjectTable() {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('id');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const [rows, setRows] = React.useState([
        createData(
            1,
            '2023-07-23',
            'Software Project',
            '010/HDDT-DHCNSG',
            { id: 21, name: 'Minh Trung', avatar: '/image/avt.jpg' },
            'pending',
            'Đã thanh toán',
            [
                { id: 1, name: 'Alice', avatar: '/image/avt.jpg' },
                { id: 2, name: 'Bob', avatar: '/image/avt.jpg' },
                { id: 3, name: 'Charlie', avatar: '/image/avt.jpg' },
                { id: 4, name: 'David', avatar: '/image/avt.jpg' },
                { id: 5, name: 'Eva', avatar: '/image/avt.jpg' },
                { id: 6, name: 'Frank', avatar: '/image/avt.jpg' },
                { id: 7, name: 'Grace', avatar: '/image/avt.jpg' },
                { id: 8, name: 'Hannah', avatar: '/image/avt.jpg' },
            ],
        ),
        createData(
            2,
            '2023-07-23',
            'Software Project',
            '010/HDDT-DHCNSG',
            { id: 21, name: 'Minh Trung', avatar: '/image/avt.jpg' },
            'pending',
            'Đã thanh toán',
            [
                { id: 9, name: 'Isaac', avatar: '/image/avt.jpg' },
                { id: 10, name: 'Jack', avatar: '/image/avt.jpg' },
                { id: 11, name: 'Katie', avatar: '/image/avt.jpg' },
                { id: 12, name: 'Leo', avatar: '/image/avt.jpg' },
                { id: 13, name: 'Mia', avatar: '/image/avt.jpg' },
            ],
        ),
        createData(
            3,
            '2023-07-23',
            'Software Project',
            '010/HDDT-DHCNSG',
            { id: 21, name: 'Minh Trung', avatar: '/image/avt.jpg' },
            'pending',
            'Đã thanh toán',
            [
                { id: 14, name: 'Nina', avatar: '/image/avt.jpg' },
                { id: 15, name: 'Oscar', avatar: '/image/avt.jpg' },
                { id: 16, name: 'Paul', avatar: '/image/avt.jpg' },
            ],
        ),
        createData(
            4,
            '2023-07-23',
            'Software Project',
            '010/HDDT-DHCNSG',
            { id: 21, name: 'Minh Trung', avatar: '/image/avt.jpg' },
            'pending',
            'Đã thanh toán',
            [
                { id: 17, name: 'Quinn', avatar: '/image/avt.jpg' },
                { id: 18, name: 'Rachel', avatar: '/image/avt.jpg' },
            ],
        ),
        createData(
            5,
            '2023-07-23',
            'Software Project',
            '010/HDDT-DHCNSG',
            { id: 21, name: 'Minh Trung', avatar: '/image/avt.jpg' },
            'pending',
            'Đã thanh toán',
            [
                { id: 19, name: 'Sam', avatar: '/image/avt.jpg' },
                { id: 20, name: 'Tina', avatar: '/image/avt.jpg' },
                { id: 1, name: 'Alice', avatar: '/image/avt.jpg' },
                { id: 2, name: 'Bob', avatar: '/image/avt.jpg' },
            ],
        ),
        createData(
            6,
            '2023-07-23',
            'Software Project',
            '010/HDDT-DHCNSG',
            { id: 21, name: 'Minh Trung', avatar: '/image/avt.jpg' },
            'done',
            'Đã thanh toán',
            [
                { id: 3, name: 'Charlie', avatar: '/image/avt.jpg' },
                { id: 4, name: 'David', avatar: '/image/avt.jpg' },
                { id: 5, name: 'Eva', avatar: '/image/avt.jpg' },
                { id: 6, name: 'Frank', avatar: '/image/avt.jpg' },
            ],
        ),
        createData(
            7,
            '2023-07-23',
            'Software Project',
            '010/HDDT-DHCNSG',
            { id: 21, name: 'Minh Trung', avatar: '/image/avt.jpg' },
            'pending',
            'Đã thanh toán',
            [
                { id: 7, name: 'Grace', avatar: '/image/avt.jpg' },
                { id: 8, name: 'Hannah', avatar: '/image/avt.jpg' },
                { id: 9, name: 'Isaac', avatar: '/image/avt.jpg' },
                { id: 10, name: 'Jack', avatar: '/image/avt.jpg' },
                { id: 11, name: 'Katie', avatar: '/image/avt.jpg' },
                { id: 12, name: 'Leo', avatar: '/image/avt.jpg' },
                { id: 13, name: 'Mia', avatar: '/image/avt.jpg' },
                { id: 14, name: 'Nina', avatar: '/image/avt.jpg' },
                { id: 15, name: 'Oscar', avatar: '/image/avt.jpg' },
                { id: 16, name: 'Paul', avatar: '/image/avt.jpg' },
                { id: 17, name: 'Quinn', avatar: '/image/avt.jpg' },
            ],
        ),
        createData(
            8,
            '2023-07-23',
            'Software Project',
            '010/HDDT-DHCNSG',
            { id: 21, name: 'Minh Trung', avatar: '/image/avt.jpg' },
            'pending',
            'Đã thanh toán',
            [
                { id: 18, name: 'Rachel', avatar: '/image/avt.jpg' },
                { id: 19, name: 'Sam', avatar: '/image/avt.jpg' },
                { id: 20, name: 'Tina', avatar: '/image/avt.jpg' },
                { id: 1, name: 'Alice', avatar: '/image/avt.jpg' },
                { id: 2, name: 'Bob', avatar: '/image/avt.jpg' },
                { id: 3, name: 'Charlie', avatar: '/image/avt.jpg' },
            ],
        ),
    ]);
    // Context
    const [state, dispatchState] = React.useContext(StateContext);
    const [hightlight, setHightight] = React.useState('');
    React.useEffect(() => {
        if (state.projectUpdated?.status === true) {
            const index = rows.findIndex((item) => item.id === state.projectUpdated.data.id);
            if (index !== -1) {
                const temp = rows.slice(0, index).concat(rows.slice(index + 1, rows?.length));
                temp.unshift(state.projectUpdated.data);
                console.log(temp);
                setRows(rows.slice(0, index).concat(rows.slice(index + 1, rows?.length)));
                setHightight(state.projectUpdated.data.id);
            }
        }
    }, [state]);

    React.useEffect(() => {
        if (hightlight != '') {
            setInterval(() => {
                setHightight('');
            }, 3000);
        }
    }, [hightlight]);

    React.useEffect(() => {
        if (state.projectUpdated?.status === true) {
            setRows([state.projectUpdated?.data, ...rows]);
            handleRequestSort('', orderBy);
            dispatchState(clearUpdate(''));
        }
    }, [rows]);

    const showEditMode = (e, row) => {
        e.preventDefault();
        e.stopPropagation();
        dispatchState(showEditProject(row));
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
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

    const isSelected = (id) => selected.indexOf(id) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const visibleRows = React.useMemo(
        () =>
            stableSort(rows, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
        [order, orderBy, page, rowsPerPage],
    );

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <EnhancedTableToolbar numSelected={selected.length} />
                <TableContainer>
                    <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {visibleRows.map((row, index) => {
                                const isItemSelected = isSelected(row.id);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        onClick={(event) => handleClick(event, row.id)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.id}
                                        selected={isItemSelected}
                                        sx={{
                                            cursor: 'pointer',
                                            transition: 'background-color 3s ease',
                                            backgroundColor: row.id === hightlight ? '#1976d2' : 'white',
                                        }}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                color="primary"
                                                checked={isItemSelected}
                                                inputProps={{
                                                    'aria-labelledby': labelId,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell align="left" component="th" id={labelId} scope="row" padding="none">
                                            {row.id}
                                        </TableCell>
                                        <TableCell align="left">{row.startDate}</TableCell>
                                        <TableCell align="left">{row.projectName}</TableCell>
                                        <TableCell align="left">{row.contractCode}</TableCell>
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
                                                src={row.mentor.avatar}
                                            />

                                            {row.mentor.name}
                                        </TableCell>
                                        <TableCell align="left">{row.members?.length}</TableCell>

                                        <TableCell align="left">{row.statusProject}</TableCell>

                                        <TableCell align="left">{row.salaryStatus}</TableCell>
                                        <TableCell align="left">
                                            <Button onClick={(e) => showEditMode(e, row)}>
                                                <EditIcon color="action"></EditIcon>
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
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            {state.editProject?.status === true ? (
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
                        <EditProjectForm />
                    </Card>
                </div>
            ) : state.addProject?.status === true ? (
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
                        <AddNewProject />
                    </Card>
                </div>
            ) : (
                ''
            )}
        </Box>
    );
}
