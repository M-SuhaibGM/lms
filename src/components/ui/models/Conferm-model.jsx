"use client"
import React from 'react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../alert-dialog'

const ConfermModel = ({ children, onConfirm }) => {
    return (

        <AlertDialog  >
            <AlertDialogTrigger asChild >
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent  >
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you Sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>This action cannot be undone</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onConfirm}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default ConfermModel