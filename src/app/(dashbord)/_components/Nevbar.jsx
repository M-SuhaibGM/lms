import React from 'react'
import Mobilesidebar from './Mobilesidebar'
import NevbarRoute from '../../../components/ui/nevbarRoute'

const Nevbar = () => {
  return (
    <div className='border-b h-full p-4 flex z-20 justify-between  items-center bg-white shadow-sm  ' >
      <Mobilesidebar />
      <div >
        <NevbarRoute />
      </div>
    </div>
  )
}

export default Nevbar