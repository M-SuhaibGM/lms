"use client"
import React from 'react'
import SidebarItem from './SidebarItem'
import { BarChart, Compass, Layout, List } from 'lucide-react'
import { usePathname } from 'next/navigation'


const SidebarRoutes = () => {
    const guestRoutes = [
        {
            icon: Layout,
            layout: 'Dashboard',
            path: '/',
        },
        {
            icon: Compass,
            layout: 'Browse',
            path: '/search',
        },
    ]
     const teacherRoutes=[
        {
            icon: List,
            layout: 'Courses',
            path: '/teacher/courses',
        },
        {
            icon: BarChart,
            layout: 'Analytics',
            path: '/teacher/analytics',
        },
     ]


     const pathname=usePathname();
     const teacherpage=pathname?.includes("/teacher")

     const route=teacherpage?teacherRoutes:guestRoutes
    return (
        <div>{route.map((route, index) => {
            return (
                <SidebarItem key={index} icon={route.icon} layout={route.layout} path={route.path} />
            )
        })
        }</div>
    )
}

export default SidebarRoutes