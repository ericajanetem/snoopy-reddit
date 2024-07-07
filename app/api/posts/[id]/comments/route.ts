import prisma from "@/app/lib/db";
import { NextRequest, NextResponse } from "@/node_modules/next/server";

// GET /api/posts/:id/comments: Retrieve the comments for a post using the post ID
export const GET = async (
  req: NextRequest,
  { params }: { params: { id: number } }
) => {
  const postId = params.id;

  try {
    const fetchedComments = await prisma.comment.findMany({
      where: { postId: Number(postId) },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(fetchedComments);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to retrieve comments" },
      { status: 500 }
    );
  }
};

export const POST = async (
  req: NextRequest,
  { params }: { params: { id: number } }
) => {
  const { content } = await req.json();
  const postId = params.id;
  if (!postId) {
    return NextResponse.json({ error: "Post Id is a required input" });
  }

  // Create the comment first
  try {
    // Ensure that the post it's creating for exists
    const post = await prisma.post.findUnique({
        where: { id: Number(postId) },
      });
  
      if (!post) {
        return NextResponse.json(
          { error: "Post does not exist" },
          { status: 404 }
        ); 
      }
    const newComment = await prisma.comment.create({
      data: {
        postId: Number(postId),
        content,
      },
    });
    return NextResponse.json({newComment})
  } catch (error) {
    return NextResponse.json(
      { error: "Comment failed to create:"},
      { status: 500 }
    );
  }

};


// DELETE /api/posts/:id/comment: Delete a comment by ID.
export const DELETE = async (
  req: NextRequest
) => {
  const { postId, commentId } = await req.json()
  console.log(`postId: ${postId}, commentId: ${commentId}`);

  try {
    const deleteComment = await prisma.comment.delete({
      where: {
        id: Number(commentId),
        postId: Number(postId)
      },
    });

    if (!deleteComment) {
      return NextResponse.json({ message: "Comment has already been deleted" });
    }
    return NextResponse.json(deleteComment);
  } catch (error) {
    console.error("Deletion error:", error);
    return NextResponse.json({ error: "Deletion error" }, { status: 500 });
  }
};


