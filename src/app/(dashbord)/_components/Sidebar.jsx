import React from 'react'
import Logo from './Logo'
import SidebarRoutes from './SidebarRoutes'

const Sidebar = () => {
    return (
        <div className='h-full border-r flex flex-col overflow-y-auto  bg-white shadow-sm'>
            <div className='p-6'>
                <Logo />
            </div>
            <div className='flex flex-col h-full '>
            
                <SidebarRoutes/>
            </div>
        </div>
    )
}

export default Sidebar