import React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Container from '@mui/material/Container';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PeopleIcon from '@mui/icons-material/People';
import UserPermision from './UserPermision';

function AdminComponent() {
    return <div>Admin Component</div>;
}

function RoleManage() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Container className="flex flex-col items-center mt-10">
            <h1 className="text-4xl font-bold text-center tracking-tight text-gray-900 sm:text-3xl mb-10">
                Welcome to Permission Management
            </h1>
            <div className="w-full flex  justify-center">
                <Box className="rounded-xl" sx={{ width: '50%', bgcolor: 'white', backdropFilter: 'blur(10px)' }}>
                    <Tabs value={value} onChange={handleChange} centered>
                        <Tab icon={<PeopleIcon />} iconPosition="start" label="User" sx={{ marginRight: "40px" }} />
                        <Tab icon={<AdminPanelSettingsIcon />} iconPosition="start" label="Admin" sx={{ marginLeft: '40px' }} />
                    </Tabs>
                </Box>
            </div>
            <div className="w-full mt-10">
                {value === 0 && <UserPermision tabValue={value} />}
                {value === 1 && <AdminComponent />}
            </div>
            <button className=' justify-center rounded-md bg-indigo-600 px-3 py-1.5 mt-6 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' type="submit">Update Permissions</button>

        </Container>
    );
}

export default RoleManage;
