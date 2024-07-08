import prisma from "@/app/lib/db";
import { NextRequest, NextResponse } from "@/node_modules/next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { unstable_noStore as noStore } from "next/cache";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// GET /api/posts/:id: Retrieve a post by ID.
export const GET = async (
  req: NextRequest,
  { params }: { params: { id: number } }
) => {
  noStore();
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
        comments: {
          select: {
            id: true,
            content: true,
            User: {
              select: {
                id: true,
                userName: true,
                imageUrl: true
              }
            },
            Post: true
          },
          orderBy: {
            createdAt: "desc",
          },
        },
        User: {
          select: {
            id: true,
            userName: true,
            imageUrl: true,
          },
        },
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
  // Check that the user is logged in
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  let userData: any;
  try {
    userData = await prisma.user.findUnique({
      where: { id: user.id },
    });
  } catch (error) {
    return NextResponse.redirect(`${apiUrl}/api/auth/create`);
  }

  // Check if postId is entered
  const postId = params.id;
  if (!postId) {
    return NextResponse.json({ error: "Missing PostID parameter" });
  }

  // Check that the post exists
  // Check that the user deleting the post is the same as the creator of the post
  const checkPost = await prisma.post.findUnique({
    where: {
      id: Number(postId),
    },
  });
  if (!checkPost) {
    return NextResponse.json(
      { message: "Post does not exist" },
      { status: 404 }
    );
  }
  if (checkPost.userId !== user.id) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  // Delete the post
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
