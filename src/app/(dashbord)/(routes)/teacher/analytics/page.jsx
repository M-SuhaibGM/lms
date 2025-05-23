import React from 'react'
import { auth, } from '@clerk/nextjs/server'
import { getAnalytics } from '../../../../../../actions/get-analatics'
import { redirect } from 'next/navigation'
import DataCard from './_component/DataCard'
import Chart from './_component/Card'
const page = async () => {
  const {userId} = await auth()
  if (!userId) {
    return redirect("/")
  }
  const { data, totalRevenue, totalSales } = await getAnalytics(userId);

  return (
    <div className='p-6'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
        <DataCard label="Totel Sales" value={totalSales} />
        <DataCard label="Totel Revenue" value={totalRevenue} shouldFormat />
      </div>
      <Chart data={data} />
    </div>
  )
}

export default page