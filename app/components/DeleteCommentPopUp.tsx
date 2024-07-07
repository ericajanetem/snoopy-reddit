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


interface deleteCommentProps {
  postId: number;
  commentId: number;
}

export function DeleteCommentPopUp({commentId,postId}:deleteCommentProps) {
  const [isOpen, setIsOpen] = useState(false);
  const handlePostDelete = async (e: any) => {
    e.preventDefault();

    const commentData = {
      'postId': postId,
      'commentId': commentId
    }
  
    try {
      const response = await fetch(`/api/posts/${postId}/comments`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
      },
        body: JSON.stringify(commentData),
      });

      if (response.ok) {
      } else {
        console.error("ok");
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
    }

    // After clicking delete, close the pop up and refresh
    setIsOpen(false);
    window.location.reload();
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="flex items-center gap-x-1">
          <Trash2 className="h-4 w-4 text-muted-foreground gap-x-1" />
          <p className="text-muted-foreground font-medium text-xs">
            Delete Comment
          </p>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            comment.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handlePostDelete}>
            Delete Comment
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
