"use client"
import React from 'react'
import { FcEngineering, FcMultipleDevices, FcFilmReel, FcOldTimeCamera, FcMusic, FcSalesPerformance, FcSportsMode } from 'react-icons/fc'
import CatageryItem from './CatageryItem'
const Catagery = ({ item }) => {

    const iconMap = {
        "Engineering": FcEngineering,
        "Computer Science": FcMultipleDevices,
        "Filming": FcFilmReel,
        "Photography": FcOldTimeCamera,
        "Music": FcMusic,
        "Accounting": FcSalesPerformance,
        "Fitness": FcSportsMode
    }

    return (
        <div className='flex items-center gap-x-2 overflow-x-auto pb-2'>
            {item.map((item) => (
                <CatageryItem key={item.id}  iconMap={iconMap} item={item} />

            ))}
        </div>
    )
}

export default Catagery