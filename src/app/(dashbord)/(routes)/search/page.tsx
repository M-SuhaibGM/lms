import React from 'react';
import { db } from '../../../../lib/db';
import Catagery from './_component/Catagery';
import { auth } from '@clerk/nextjs/server';
import { GetCourses } from '../../../../../actions/get-course';
import { CourseList } from './_component/CourseList';

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
    <div className='p-6 space-y-4'>
      <Catagery items={categories} />
      <CourseList items={courses} />
    </div>
  );
}

export default Page;