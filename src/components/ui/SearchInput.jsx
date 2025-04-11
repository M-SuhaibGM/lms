"use client"
import { Search } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Input } from './input'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import qs from "query-string"
import { useDebounce } from '../../../hooks/Debounce'
const SearchInput = () => {
    const [Value, setValue] = useState("")
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()
    const debouncedValue = useDebounce(Value)
    const currentCatagarieId = searchParams.get("catageryId");

    useEffect(() => {
        const url = qs.stringifyUrl({
            url: pathname,
            query: {
                catageryId: currentCatagarieId,
                title: debouncedValue
            }
        }, { skipNull: true, skipEmptyString: true });

        router.push(url);
    }, [currentCatagarieId, router, pathname, debouncedValue])

    return (
        <div className='relative'>
            <Search className='h-4 w-4 absolute top-2.5 left-3 text-slate-900' />
            <Input value={Value} onChange={(e) => setValue(e.target.value)} className="w-full md:w-[300px] pl-9 rounded-full bg-slate-100  focus-visible:ring-slate-200 " placeholder="Search for a course" />
        </div>
    )
}

export default SearchInput