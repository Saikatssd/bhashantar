import React from 'react';
import Box from '@mui/material/Box';
import Table from '../Components/PermissionTable';

const readyColumns = [
    { id: 'id', label: 'Id No.', minWidth: 100 },
    { id: 'fileName', label: 'File\u00a0Name', minWidth: 100 },
    { id: 'view', label: 'View', minWidth: 100 },
    { id: 'add', label: 'Add', minWidth: 100 },
    { id: 'edit', label: 'Edit', minWidth: 100 },
    { id: 'delete', label: 'Delete', minWidth: 100 },
    { id: 'upload', label: 'Upload', minWidth: 100 },
    { id: 'download', label: 'Download', minWidth: 100 },
];

const readyRows = [
    { id: '1', fileName: 'Document1', view: false, add: false, edit: false, delete: false, upload: false, download: false },
    { id: '2', fileName: 'Document2', view: false, add: false, edit: false, delete: false, upload: false, download: false },
    { id: '3', fileName: 'Document2', view: false, add: false, edit: false, delete: false, upload: false, download: false },
    { id: '4', fileName: 'Document2', view: false, add: false, edit: false, delete: false, upload: false, download: false },
];

function UserPermision({ tabValue }) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [rows, setRows] = React.useState(readyRows);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleEditClick = (id, columnId) => {
        setRows((prevRows) =>
            prevRows.map((row) =>
                row.id === id ? { ...row, [columnId]: !row[columnId] } : row
            )
        );
    };

    let columns;
    if (tabValue === 0) {
        columns = readyColumns;
    } // Add other conditions if needed

    return (
        <Box>
            <Table
                columns={columns}
                rows={rows}
                page={page}
                rowsPerPage={rowsPerPage}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                handleEditClick={handleEditClick}
            />
        </Box>
    );
}

export default UserPermision;
