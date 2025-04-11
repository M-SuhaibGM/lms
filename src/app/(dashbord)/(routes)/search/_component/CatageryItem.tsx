"use client";
import React from 'react';
import qs from "query-string";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { cn } from "../../../../../lib/utils";

interface CategoryItemProps {
  item: {
    id: string;
    name: string;
  };
  iconMap: Record<string, React.ComponentType<{ className?: string }>>;
}

const CatageryItem = ({ item, iconMap }: CategoryItemProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const currentCatagarieId = searchParams.get("categoryId");
  const currentTitle = searchParams.get("title");
  const isSelected = currentCatagarieId === item.id;

  const onClick = () => {
    const url = qs.stringifyUrl({
      url: pathname,
      query: {
        categoryId: isSelected ? null : item.id,
        title: isSelected ? null : currentTitle // Also reset title if deselecting
      }
    }, { 
      skipNull: true, 
      skipEmptyString: true 
    });

    router.push(url);
  };

  const IconComponent = iconMap[item.name];

  return (
    <button
      type="button"
      className={cn(
        'flex items-center text-sm gap-x-1 px-3 py-2 border border-slate-200',
        'hover:border-sky-700 cursor-pointer rounded-full transition-colors',
        isSelected && "border-sky-700 text-sky-800 bg-sky-200/20"
      )}
      onClick={onClick}
      aria-selected={isSelected}
    >
      {IconComponent && <IconComponent className="w-4 h-4 mr-1" />}
      {item.name}
    </button>
  );
};

export default CatageryItem;