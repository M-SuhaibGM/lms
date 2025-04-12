"use client";
import { Search } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { Input } from './input';
import { useRouter, usePathname } from 'next/navigation';
import qs from "query-string";
import { useDebounce } from '../../../hooks/Debounce';

const SearchInput = () => {
    const [value, setValue] = useState("");
    const router = useRouter();
    const pathname = usePathname();
    const debouncedValue = useDebounce(value, 500);
    const initialRender = useRef(true);
    const [currentCategoryId, setCurrentCategoryId] = useState<string | null>(null);

    // Custom hook to track URL parameters
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const updateParams = () => {
            const params = new URLSearchParams(window.location.search);
            setCurrentCategoryId(params.get('categoryId'));
        };

        // Initial update
        updateParams();

        // Listen to route changes
        const observer = new MutationObserver(updateParams);
        observer.observe(document.body, { 
            childList: true,
            subtree: true 
        });

        return () => observer.disconnect();
    }, [pathname]);

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
            return;
        }

        const url = qs.stringifyUrl({
            url: pathname,
            query: {
                categoryId: currentCategoryId || undefined,
                title: debouncedValue || undefined
            }
        }, { skipNull: true, skipEmptyString: true });

        router.push(url, { scroll: false });
    }, [debouncedValue, currentCategoryId, router, pathname]);

    return (
        <div className='relative'>
            <Search className='h-4 w-4 absolute top-2.5 left-3 text-slate-900' />
            <Input 
            type="text"
            value={value} 
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)} 
            className="w-full md:w-[300px] pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200" 
            placeholder="Search for a course" 
            />
        </div>
    );
};

export default SearchInput;