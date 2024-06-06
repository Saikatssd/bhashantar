import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';

const columns = [
  { id: 'id', label: 'Id No.', minWidth: 100 },
  { id: 'fileName', label: 'File\u00a0Name', minWidth: 100 },
  { id: 'page', label: 'Page\u00a0Count', minWidth: 100 },
  { id: 'date', label: 'Date\u00a0Created', minWidth: 100 },
  { id: 'edit', label: '', minWidth: 100, align: 'right' },
];

function createData(id, fileName,page, date) {
  return { id, fileName,page, date };
}

const rows = [
  createData('1', 'abcdefgjijklmnopaifoekewqiqefn','00', '02.06.2024'),
  createData('2', 'abcdefgjijklmnopaifoekewqiqefn','00', '02.06.2024'),
  createData('3', 'abcdefgjijklmnopaifoekewqiqefn','00', '02.06.2024'),
  createData('4', 'abcdefgjijklmnopaifoekewqiqefn','00', '02.06.2024'),
  createData('5', 'abcdefgjijklmnopaifoekewqiqefn','00', '02.06.2024'),
  createData('6', 'abcdefgjijklmnopaifoekewqiqefn','00', '02.06.2024'),
  createData('7', 'abcdefgjijklmnopaifoekewqiqefn','00', '02.06.2024'),
  createData('8', 'abcdefgjijklmnopaifoekewqiqefn','00', '02.06.2024'),
  createData('9', 'abcdefgjijklmnopaifoekewqiqefn','00', '02.06.2024'),
  createData('10', 'abcdefgjijklmnopaifoekewqiqefn','00', '02.06.2024'),
  createData('11', 'abcdefgjijklmnopaifoekewqiqefn','00', '02.06.2024'),
  createData('12', 'abcdefgjijklmnopaifoekewqiqefn','00', '02.06.2024'),
  createData('13', 'abcdefgjijklmnopaifoekewqiqefn','00', '02.06.2024'),
  createData('14', 'abcdefgjijklmnopaifoekewqiqefn','00', '02.06.2024'),
  createData('15', 'abcdefgjijklmnopaifoekewqiqefn','00', '02.06.2024'),
  createData('16', 'abcdefgjijklmnopaifoekewqiqefn','00', '02.06.2024'),
  createData('17', 'abcdefgjijklmnopaifoekewqiqefn','00', '02.06.2024'),
  createData('18', 'abcdefgjijklmnopaifoekewqiqefn','00', '02.06.2024'),
  createData('19', 'abcdefgjijklmnopaifoekewqiqefn','00', '02.06.2024'),
  createData('20', 'abcdefgjijklmnopaifoekewqiqefn','00', '02.06.2024'),
  createData('21', 'abcdefgjijklmnopaifoekewqiqefn','00', '02.06.2024'),
  createData('22', 'abcdefgjijklmnopaifoekewqiqefn','00', '02.06.2024'),
  createData('23', 'abcdefgjijklmnopaifoekewqiqefn','00', '02.06.2024'),
  createData('24', 'abcdefgjijklmnopaifoekewqiqefn','00', '02.06.2024'),
  createData('25', 'abcdefgjijklmnopaifoekewqiqefn','00', '02.06.2024'),
  createData('26', 'abcdefgjijklmnopaifoekewqiqefn','00', '02.06.2024'),
  createData('27', 'abcdefgjijklmnopaifoekewqiqefn','00', '02.06.2024'),
  createData('28', 'abcdefgjijklmnopaifoekewqiqefn','00', '02.06.2024'),
];

function Workspace() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleEditClick = (id) => {
    // Handle the edit action here
    console.log(`Edit document with id: ${id}`);
  };

  
  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <Box
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </Box>
    );
  }
  
  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} sx={{ fontWeight: 700 }} aria-label="basic tabs example" centered>
        <Tab label="Ready for work" {...a11yProps(0)} />
            <Tab label="In progress" {...a11yProps(1)} />
            <Tab label="Completed" {...a11yProps(2)} />
        
        </Tabs>
      </Box>

      <CustomTabPanel value={value} index={0}>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 700 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.id === 'edit' ? (
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={() => handleEditClick(row.id)}
                              >
                                Assign
                              </Button>
                            ) : (
                              value
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Item Two
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel>
      
    </Box>
  );
}

export default Workspace;
