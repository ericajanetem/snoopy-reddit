"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { createComment } from "../actions";

interface postCommentProps {
  postId: number;
}

export function CommentForm({ postId }: postCommentProps) {
  const { toast } = useToast();
  const ref = useRef<HTMLFormElement>(null);

  return (
    <form
      className="mt-5"
      action={async (formData) => {
        const content = formData.get("comment") as string;
        if (content.length === 0) {
          toast({
            description: "Comment cannot be blank!",
            variant: "destructive",
          });
        } else {
          try {
            await createComment(formData);
            toast({
              description: "Your comment has been created!",
            });
          } catch (error) {
            toast({
              description: "Failed to create comment. Please try again.",
              variant: "destructive",
            });
          }
          ref.current?.reset();
        }
      }}
      ref={ref}
    >
      <input type="hidden" name="postId" value={postId} />
      <Label>Leave a Comment!</Label>
      <div className="py-2">
        <Textarea
          placeholder="What are your thoughts?"
          className="w-full mt-1 mb-2"
          name="comment"
        />
      </div>
      <div className="py-3">
        <Button>Create</Button>
      </div>
    </form>
  );
}
