import prisma from "@/app/lib/db";
import { NextRequest, NextResponse } from "@/node_modules/next/server";

// GET /api/posts/:id: Retrieve a post by ID.
export const GET = async (
  req: NextRequest,
  { params }: { params: { id: number } }
) => {
  const postId = params.id;
  if (!postId) {
    return NextResponse.json({ error: "Missing PostID parameter" });
  }

  try {
    const post = await prisma.post.findUnique({
      where: { id: Number(postId) },
      select: {
        id: true,
        title: true,
        content: true,
        likes: true,
        createdAt: true,
        comments: {select: {
          id: true
        }}
      },
    });

    if (!post) {
      return NextResponse.json(
        { error: "Post does not exist" },
        { status: 404 }
      ); 
    }
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to retrieve post" },
      { status: 500 }
    );
  }
};

// DELETE /api/posts/:id: Delete a post by ID.
export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: number } }
) => {
  const postId = params.id
  if (!postId) {
    return NextResponse.json({ error: "Missing PostID parameter" });
  }
  try {
    const deletePost = await prisma.post.delete({
      where: {
        id: Number(postId),
      },
    });

    if (!deletePost) {
      return NextResponse.json({ message: "Post has already been deleted" });
    }
    return NextResponse.json(deletePost);
  } catch (error) {
    console.error("Deletion error:", error);
    return NextResponse.json({ error: "Deletion error" }, { status: 500 });
  }
};

// UPDATE /api/posts/:id: Update a post by ID.
export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: number } }
) => {  // Create a URL object based on the dynamic request URL
  const postId = params.id
  if (!postId) {
    return NextResponse.json({ error: "Missing PostID parameter" });
  }

  try {
    const postBody = await req.json();
    const { title, content } = postBody;
    const updatedPost = await prisma.post.update({
      where: { id: Number(postId) },
      data: {
        title,
        content,
      },
    });
    return NextResponse.json({ updatedPost });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update post" },
      { status: 500 }
    );
  }
};
