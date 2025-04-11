import { Menu } from 'lucide-react'
import React from 'react'
import {
    Sheet,
    SheetTitle,
    SheetContent,
    SheetTrigger,
} from "../../../components/ui/sheet"
import Sidebar from './Sidebar'
const Mobilesidebar = () => {
    return (
        <Sheet>
            <SheetTrigger>
                <Menu className='md:hidden  cursor-pointer' />
            </SheetTrigger>
            <SheetContent side='left' className="bg-white p-0 ">
                <Sidebar />
            </SheetContent>
        </Sheet>
    )
}

export default Mobilesidebar