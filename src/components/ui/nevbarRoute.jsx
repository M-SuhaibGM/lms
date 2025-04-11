"use client"

import { UserButton } from '@clerk/nextjs'
import React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'
import { Button } from './button'
import Link from 'next/link'
import SearchInput from './SearchInput'
import { isTeacher } from '../../../actions/Teacher'
import { useAuth } from '@clerk/nextjs'


const NevbarRoute = () => {
    const pathname = usePathname()
    const router = useRouter()
    const {userId} = useAuth() 
    const isteacherpage = pathname?.startsWith("/teacher")
    const playerpage = pathname.includes("/courses")
    const searchpage = pathname === ("/search")
    return (
        <>
            <div className='flex  items-center gap-[500px] px-5 justify-between '>
                {searchpage && (<div className=' hidden md:block'>  <SearchInput /> </div>)}
                <div className='flex items-center gap-4 px-5'>
                    {isteacherpage || playerpage ? (
                        <Button variant={'ghost'} size={'sm'} className='cursor-pointer border' onClick={() => router.push('/')} >
                            <LogOut className='  mr-2 h-4 w-4' />
                            Exit
                        </Button>
                    ) : isTeacher(userId) ? (
                        <Link href="/teacher/courses">
                            <Button className="cursor-pointer border" size={'sm'} variant={'ghost'}>
                                Teacher Mode
                            </Button>
                        </Link>
                    ):null}
                    <UserButton afterSignOutUrl='/sign-in' />
                </div>
            </div>
        </>
    )
}

export default NevbarRoute