import prisma from "@/app/lib/db";
import { NextRequest, NextResponse } from "@/node_modules/next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Comment } from "@prisma/client";
import { unstable_noStore as noStore } from "next/cache";

// GET /api/posts/:id/comments: Retrieve the comments for a post using the post ID
export const GET = async (
  req: NextRequest,
  { params }: { params: { id: number } }
) => {
  noStore();
  const postId = params.id;

  try {
    const fetchedComments = await prisma.comment.findMany({
      where: { postId: Number(postId) },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        content: true,
        likes: true,
        createdAt: true,
        User: {
          select: {
            id: true,
            userName: true,
            imageUrl: true,
          },
        },
        postId: true,
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

export const POST = async (req: NextRequest) => {
  const { id, content, userId } = await req.json();

  // Create the comment first
  try {
    // Ensure that the post it's creating for exists
    const post = await prisma.post.findUnique({
      where: { id: Number(id) },
    });

    if (!post) {
      return NextResponse.json(
        { error: "Post does not exist" },
        { status: 404 }
      );
    }
    const newComment: Comment = await prisma.comment.create({
      data: {
        postId: Number(id),
        content,
        userId,
      },
      include: {
        User: true, // Include the related User information
      },
    });
    return NextResponse.json(newComment);
  } catch (error) {
    return NextResponse.json(
      { error: "Comment failed to create:" },
      { status: 500 }
    );
  }
};

// DELETE /api/posts/:id/comment: Delete a comment by ID.
export const DELETE = async (req: NextRequest) => {
  const { commentId } = await req.json();

  try {
    const deleteComment = await prisma.comment.delete({
      where: {
        id: Number(commentId),
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
