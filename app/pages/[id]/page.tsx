"use client";

import { CommentCard } from "@/app/components/CommentCard";
import { CommentForm } from "@/app/components/CommentForm";
import { PostCard } from "@/app/components/PostCard";
import { Separator } from "@/components/ui/separator";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Comment {
  id: number;
  postId: number;
  content: string;
  likes: number | null;
  createdAt: string;
}

const PostPage = () => {
  const params = useParams<{ id: Number }>();
  const id = params.id;
  const [post, setPost] = useState<any>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        const postResponse = await fetch(`/api/posts/${id}`);
        if (!postResponse.ok) {
          throw new Error(`Post with ID ${id} not found`);
        }
        const postData = await postResponse.json();
        setPost(postData);

        const commentsResponse = await fetch(`/api/posts/${id}/comments`);
        const commentData = await commentsResponse.json();
        setComments(commentData);
      } catch (error) {
        console.error(`Error fetching data for post ${id}: `, error);
        router.push('/404'); 
      }
    };

    fetchPostAndComments();
  }, [id, router]);

  // Update the comment state to show the new comment
  const handleCommentFormSubmit = async (newComment) => {
    try {
      // console.log(comments)
      setComments((prevComments) => [newComment, ...prevComments]);
      // console.log("new")
      // console.log(newComment)
    } catch (error) {
      console.error("Error adding comment: ", error);
    }
  }


  if (post) {
    return (
      <div>
        <div className="max-w-[1500px] mx-auto flex gap-x-10 mt-4 mb-10 gap-y-5">
          <div className="w-[50%]">
            <PostCard
              id={post.id}
              jsonContent={post.content}
              title={post.title}
              key={post.id}
              createdAt={post.createdAt}
              likes={post.likes}
              comments={post.comments.length}
            />
            <Separator />
            <div className="py-10">
            <CommentForm onSubmit={handleCommentFormSubmit} postId={post.id}/>
            </div>
          </div>
          <div className="w-[50%] flex flex-col gap-y-5">
            <h1>All Comments</h1>
            {comments.length === 0 && <div>No comments yet. Start the discussion!</div>}
            {comments.map((item, index) => (
              <CommentCard
                key={index}
                content={item.content}
                id={item.id}
                postId={item.postId}
              />
            ))}
          </div>
        </div>
      </div>
    );
  } else {
    return null
  }
};

export default PostPage;
