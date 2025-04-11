"use client";
import React, { useState } from "react";
import { Button } from "../../../components/ui/button";
import { Pencil, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ComboboxDemo } from "../../../components/ui/combobox";

const CategoryForm = ({ data, options }) => {
    const [editing, setEditing] = useState(false);
    const [CategoryId, setCategoryId] = useState(data.categoryId || ""); // Set initial value
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const handleSelectCategory = (value) => {
        setCategoryId(value);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await axios.patch(`/api/courses/${data.id}`, { categoryId: CategoryId });
            setEditing(false);
            router.refresh();
            toast.success("Category updated successfully");
        } catch (e) {
            toast.error("Something went wrong");
        }
        finally {
            setIsSubmitting(false);
        }
    };

    const selectedOption = options.find((option) => option.value === CategoryId);

    return (
        <div className="mt-6 border bg-slate-100 rounded-sm px-4 h-40 ">
            <div className="font-medium flex items-center justify-between p-4">
                Course Category
                <Button onClick={() => setEditing(!editing)} className="cursor-pointer border-2 shadow-md " variant="ghost">
                    {editing ? "Cancel" : <><Pencil className="h-4 w-4 mr-2" />Edit Category</>}
                </Button>
            </div>

            {!editing ? (
                <p className="text-sm mt-2 text-slate-500  p-2">{selectedOption?.label || "No Category"}</p>
            ) : (
                <form className="flex flex-col  gap-1.5" onSubmit={onSubmit}>
                    <ComboboxDemo options={options} onSelect={handleSelectCategory} />
                    <Button type="submit" className="cursor-pointer" disabled={isSubmitting}>
                        {isSubmitting ? (
                            <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" /> {/* Spinner icon */}
                                Saving...
                            </>
                        ) : (
                            "Save"
                        )}
                    </Button>
                </form>
            )}
        </div>
    );
};

export default CategoryForm;
