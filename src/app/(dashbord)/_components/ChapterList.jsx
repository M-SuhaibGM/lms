"use client"
import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Grip, Pencil } from 'lucide-react';
import { Badge } from '../../../components/ui/badge';
import { cn } from '../../../lib/utils';

const ChapterList = ({ onEdit, onRecord, item }) => {
    // Store the item array in local state
    const [items, setItems] = useState(item);
    useEffect(() => {
        setItems(item)
    }, [item])


    // Handle drag and drop
    const handleOnDragEnd = (result) => {
        if (!result.destination) return; // Dropped outside the list

        const updatedItems = Array.from(items);
        const [reorderedItem] = updatedItems.splice(result.source.index, 1);
        updatedItems.splice(result.destination.index, 0, reorderedItem);

        // Update positions based on new order
        const updatedItemsWithPositions = updatedItems.map((item, index) => ({
            ...item,
            position: index + 1, // Update the position based on the new index
        }));

        // Update local state
        setItems(updatedItemsWithPositions);

        // Call onRecord with updated data (only id and position)
        onRecord(updatedItemsWithPositions.map(({ id, position }) => ({ id, position })));
    };

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="chapters">
                {(provided) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="chapter-list space-y-4"
                    >
                        {items.map((chapter, index) => (
                            <Draggable
                                key={chapter.id}
                                draggableId={chapter.id.toString()}
                                index={index}
                            >
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        className="chapter-card bg-slate-300 mt-2 shadow-md rounded-lg p-2"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <div
                                                    {...provided.dragHandleProps}
                                                    className="mr-2 cursor-move"
                                                >
                                                    <Grip className="h-5 w-5 text-gray-500" />
                                                </div>

                                                <span className="text-xm font-medium">
                                                    {chapter.title}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                {chapter.isFree && (<Badge>Free</Badge>)}
                                                <Badge className={cn("bg-slate-500 cursor-pointer", chapter.isPublished && "bg-sky-700 cursor-pointer")}>{
                                                    chapter.isPublished ? "Published" : "Draft"
                                                }</Badge>
                                                <Pencil onClick={() => onEdit(chapter.id)} className="h-4 w-4 cursor-pointer text-gray-500 hover:opacity-75 transition" />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default ChapterList;