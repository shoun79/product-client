import React from 'react';
import { Outlet } from 'react-router-dom';
import SideHeader from '../components/SideHeader';

const DashboardLayout = () => {
    return (
        <div className='flex  items-start justify-start w-full'>
            <SideHeader></SideHeader>
            <Outlet></Outlet>
        </div>
    );
};

export default DashboardLayout;