"use client";
import React from "react";
import { z } from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../../../../components/ui/form";
import { Button } from "../../../../../components/ui/button";
import { Input } from "../../../../../components/ui/input";
import Link from "next/link";
import toast from "react-hot-toast";

const Page = () => {
  const router = useRouter();

  const formSchema = z.object({
    tittle: z.string().min(1, {
      message: "Title is required",
    }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tittle: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values) => {
    try {
      const response = await axios.post("/api/courses", values);
      form.reset();
      router.push(`/teacher/courses/${response.data.id}`);
      toast.success("Course Created");
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="max-w-5xl mx-auto flex flex-col md:items-center md:justify-center h-full p-6">
      <h1 className="text-2xl font-bold">Name Your Course</h1>
      <p className="text-sm text-slate-600">
        What would you like to name your course? You can always change this later.
      </p>
      <Form {...form}>
        <form className="space-y-8 mt-8" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="tittle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course Title</FormLabel>
                <FormControl>
                  <Input disabled={isSubmitting} placeholder='e.g. "Advanced Web Development"' {...field} />
                </FormControl>
                <FormDescription>What will you teach in this course?</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center gap-x-2">
            <Link href={"/"}>
              <Button variant="ghost" type="button">
                Cancel
              </Button>
            </Link>
            <Button type="submit" disabled={!isValid || isSubmitting}>
              Continue
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Page;
