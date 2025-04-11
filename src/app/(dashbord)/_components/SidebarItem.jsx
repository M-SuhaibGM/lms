import React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '../../../lib/utils';

const SidebarItem = ({ icon: Icon, layout, path }) => {
    const pathname = usePathname();
    const router = useRouter();
    const active = (pathname === "/" && path === "/") || pathname == path || pathname?.startsWith(`${path}/`);

    const onClick = () => {
        router.push(path)
    }

    return (
        <button
            onClick={onClick}
            type='button'
            className={cn(
                "flex items-center pl-4 gap-x-4 w-full text-slate-500  cursor-pointer font-[500] text-sm transition-all hover:text-slate-600  hover:bg-slate-300/20 ", active && "text-sky-700  bg-sky-200/20 hover:bg-sky-200/20 hover:text-sky-700"
            )}
        >
            <div className='flex items-center  py-4 gap-x-2 '>
                <Icon
                size={22}
                className={cn("text-slate-500",active&&"text-sky-700"

                )}
                 />
                 {layout}
            </div>
            <div className={cn("ml-auto opacity-0 border-2 min-h-[55px] border-sky-700  transition-all ",active && "opacity-100 h-full")}></div>
        </button>
    )
}

export default SidebarItem