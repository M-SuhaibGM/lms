"use client";
import React, { useState } from 'react';
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Pencil, Loader2 } from 'lucide-react'; // Import Loader2 for the spinner
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { formetPrice } from '../../../lib/formet';

const PriceForm = ({ data }) => {
    const [editing, setEditing] = useState(false);
    const [price, setPrice] = useState(data?.price || "");
    const [isSubmitting, setIsSubmitting] = useState(false); // New state for loading
    const router = useRouter();

    const onSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true); // Set loading state to true

        try {
            const priceAsFloat = parseFloat(price);
            if (isNaN(priceAsFloat)) {
                toast.error("Please enter a valid number for the price");
                return;
            }

            await axios.patch(`/api/courses/${data.id}`, { price: priceAsFloat });
            setEditing(false);
            router.refresh();
            toast.success("Price updated successfully");
        } catch (e) {
            toast.error("Something went wrong");
        } finally {
            setIsSubmitting(false); // Reset loading state
        }
    };

    return (
        <div className='mt-6 border bg-slate-100 rounded-sm p-4'>
            <div className='font-medium flex items-center justify-between'>
                Course Price
                <Button onClick={() => setEditing(!editing)} className="cursor-pointer border-2 shadow-md" variant="ghost">
                    {editing ? "Cancel" : <><Pencil className='h-4 w-4 mr-2' />Edit Price</>}
                </Button>
            </div>

            {!editing ? (
                <p className='text-sm mt-2 text-slate-500  p-2'>
                    {data.price ? formetPrice(data.price) : "No Price"}
                </p>
            ) : (
                <form className="space-y-4 mt-4" onSubmit={onSubmit}>
                    <Input
                        placeholder='Enter course price'
                        type={"number"}
                        required
                        step={0.01}
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <div className="flex items-center gap-x-2">
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
                    </div>
                </form>
            )}
        </div>
    );
}

export default PriceForm;