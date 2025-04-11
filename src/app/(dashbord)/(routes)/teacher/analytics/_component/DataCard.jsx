import { Card, CardContent, CardHeader, CardTitle } from '../../../../../../components/ui/card'
import React from 'react'
import {formetPrice} from '../../../../../../lib/formet'

const DataCard = ({ value, label, shouldFormat }) => {
    return (
        <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>{label}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className='text-2xl font-bold'>
                    {shouldFormat ? formetPrice(value) : value}
                </div>
            </CardContent>

        </Card>
    )
}

export default DataCard