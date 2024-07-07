"use client"

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";


interface postCommentProps {
  postId: number,
  onSubmit: (newComment: { id: number; postId: number; content: string; createdAt: string; likes: number | null; }) => void;
}

export function CommentForm({postId, onSubmit}: postCommentProps)  {
    const [content, setContent] = useState('');
    const router = useRouter();

    const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (content.trim() === '') {
        alert('Please enter a comment.');
        return;
      }
      
      const formData = new FormData(e.currentTarget);
      const postId = formData.get("postId") as FormDataEntryValue | null;
      const comment = formData.get("comment") as string;
      const postData = {
        id: Number(postId),
        content: comment
      }
      try {
        const response = await fetch(`/api/posts/${postId}/comments`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
        },
          body: JSON.stringify(postData),
        });

        if (response.ok) {
          const newComment = await response.json();
          // const returnData = {
          //   postId: newComment.postId,
          //   id: newComment.id,
          //   content: newComment.content
          // }
          console.log(newComment)
          onSubmit(newComment);
          setContent('');
          router.refresh()
        }
      } catch (error) {
        console.log('error')
    }
  }
    return (
      <form
        className="mt-5"
        onSubmit={handleCommentSubmit}
      >
        <input type="hidden" name="postId" value={postId} />
        <Label>Leave a Comment!</Label>
        <div className="py-2">
        <Textarea
          placeholder="What are your thoughts?"
          className="w-full mt-1 mb-2"
          name="comment"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        </div>
        <div className="py-3">
        <Button>Submit</Button>
        </div>
      </form>
    );

};