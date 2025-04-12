"use client";

import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import qs from 'query-string';
import { cn } from "@/lib/utils";

interface CategoryItemProps {
  item: { id: string; name: string };
  iconMap: Record<string, React.ComponentType<{ className?: string }>>;
}

export const CategoryItem = ({ 
  item, 
  iconMap
}: CategoryItemProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [currentCategoryId, setCurrentCategoryId] = useState<string | null>(null);
  const [currentTitle, setCurrentTitle] = useState<string | null>(null);

  // Track URL changes in real-time
  useEffect(() => {
    const handleRouteChange = () => {
      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        setCurrentCategoryId(params.get('categoryId'));
        setCurrentTitle(params.get('title'));
      }
    };

    // Initial load
    handleRouteChange();

    // Listen to browser navigation events
    window.addEventListener('popstate', handleRouteChange);
    window.addEventListener('hashchange', handleRouteChange);

    // For App Router, we need to check URL periodically
    const interval = setInterval(handleRouteChange, 300);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      window.removeEventListener('hashchange', handleRouteChange);
      clearInterval(interval);
    };
  }, []);

  // Also update when pathname changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      setCurrentCategoryId(params.get('categoryId'));
      setCurrentTitle(params.get('title'));
    }
  }, [pathname]);

  const isSelected = currentCategoryId === item.id;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    const newCategoryId = isSelected ? undefined : item.id;
    
    const url = qs.stringifyUrl({
      url: pathname,
      query: {
        categoryId: newCategoryId,
        title: currentTitle || undefined,
      },
    }, { skipNull: true, skipEmptyString: true });

    router.push(url, { scroll: false });
  };

  const IconComponent = iconMap[item.name];

  return (
    <button
      onClick={handleClick}
      className={cn(
        'flex items-center text-sm gap-x-1 px-3 py-2 border border-slate-200',
        'hover:border-sky-700 cursor-pointer rounded-full transition-colors',
        isSelected && "border-sky-700 text-sky-800 bg-sky-200/20"
      )}
    >
      {IconComponent && <IconComponent className="w-4 h-4 mr-1" />}
      {item.name}
    </button>
  );
};