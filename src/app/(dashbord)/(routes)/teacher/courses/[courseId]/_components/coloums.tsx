"use client"

import { Course } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Pencil } from "lucide-react"
import { Button } from "../../../../../../../components/ui/button"
import { Badge } from "../../../../../../../components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../../../../../components/ui/dropdown-menu"
import Link from "next/link"
import { cn } from "../../../../../../../lib/utils"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Course>[] = [
  {
    accessorKey: "titte",
    header: ({ column }) => {
      return (
        <Button variant={"ghost"} size="sm" className="text-sm" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button variant={"ghost"} size="sm" className="text-sm" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    }, cell: ({ row }) => {
      const price = parseFloat(row.getValue("price") );
      const Formited = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"

      }).format(price)
      return (
        <div>{Formited}</div>
      )
    }

  },
  {
    accessorKey: "isPublished",
    header: ({ column }) => {
      return (
        <Button variant={"ghost"} size="sm" className="text-sm" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Published
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    }, cell: ({ row }) => {
      const isPublished = row.getValue("isPublished") || false;
      return (
        <Badge variant="default" className={cn("bg-slate-500", isPublished && "bg-sky-700")}>{isPublished ? "Published" : "Draft"}</Badge>
      )
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { id } = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger><MoreHorizontal /></DropdownMenuTrigger>
          <DropdownMenuContent className="">
            <DropdownMenuSeparator className="my-2" />
            <Link href={`/teacher/courses/${id}`}>
              <DropdownMenuItem className="flex items-center" inset><><Pencil className="mr-2" />Edit</></DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }
]
