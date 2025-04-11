"use client"
import React from 'react'
import qs from "query-string"
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { cn } from "../../../../../lib/utils"

const CatageryItem = ({ item, iconMap }) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentCatagarieId = searchParams.get("catageryId");
    const currentTitle = searchParams.get("title");
    const isSelected = currentCatagarieId === item.id;

    const onClick = () => {
        const url = qs.stringifyUrl({
            url: pathname,
            query: {

                catageryId: isSelected ? null : item.id,
                title: currentTitle
            }
        }, { skipNull: true, skipEmptyString: true });

        router.push(url);
    }
    return (
        <div key={item.id} className={cn('flex items-center text-sm  gap-x-1 px-3 py-2 border border-slate-200 hover:border-sky-700 cursor-pointer rounded-full', isSelected && "border-sky-700 text-sky-800  bg-sky-200/20 ")} onClick={onClick}>
            {iconMap[item.name] && React.createElement(iconMap[item.name])}
            {item.name}
        </div>
    )
}

export default CatageryItem