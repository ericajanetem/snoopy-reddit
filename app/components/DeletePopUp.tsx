"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Link from "@/node_modules/next/link";
import { Trash2 } from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";


interface deleteProps {
  id: number;
}

export function DeletePopUp({id}:deleteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  // Handlde Delete call
  const handlePostDelete = async (e: any) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        throw new Error("Failed to delete post");
      }
      console.log("Post deleted successfully");
    } catch (error) {
      console.log(error);
    }

    // After clicking delete, close the pop up and refresh
    setIsOpen(false);
    router.push('/')
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="flex items-center gap-x-1">
          <Trash2 className="h-4 w-4 text-muted-foreground gap-x-1" />
          <p className="text-muted-foreground font-medium text-xs">
            Delete Post
          </p>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            post.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handlePostDelete}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
