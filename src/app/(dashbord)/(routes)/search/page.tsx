import React from 'react';
import { db } from '../../../../lib/db';
import Catagery from './_component/Catagery';
import { auth } from '@clerk/nextjs/server';
import { GetCourses } from '../../../../../actions/get-course';
import { CourseList } from './_component/CourseList';
import SearchInput from '@/components/ui/SearchInput';
import { Suspense } from 'react';

interface PageProps {
  searchParams: Promise<{
    categoryId?: string;
    title?: string;
    [key: string]: string | string[] | undefined;
  }>;
}

const Page = async (props: PageProps) => {
  const searchParams = await props.searchParams;
  const { userId } = await auth();

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc"
    },
  });

  if (!userId) {
    return <div className="p-6">Please sign in to view courses</div>;
  }

  const courses = await GetCourses({
    userId,
    categoryId: searchParams.categoryId,
    title: searchParams.title
  });

  return (
    <>

      <Suspense fallback={<div className="p-6">Loading...</div>}>
        <div className="px-6 pt-6 md:hidden md:mb-0 block">
          <SearchInput />
        </div>
      </Suspense>
      <div className="p-6 space-y-4">
        <Catagery
          items={categories}
        />
        <CourseList items={courses} />
      </div>
    </>
  );
}

export default Page;