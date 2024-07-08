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
import { useToast } from "@/components/ui/use-toast";

interface deleteProps {
  id: number;
}

export function DeletePopUp({id}:deleteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  // Handlde Delete call
  const handlePostDelete = async (e: any) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      });
  
      if (response.status === 403) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "You cannot delete a post that does not belong to you.",
        })
        setIsOpen(false);
        router.push('/')
      }
      if (!response.ok) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
        })
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
      })
    }

    // After clicking delete, close the pop up and refresh
    toast({
      title: "Post successfully deleted",
    })
    setIsOpen(false);
    window.location.reload();
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
