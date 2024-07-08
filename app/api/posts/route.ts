import prisma from "@/app/lib/db";
import { NextRequest, NextResponse } from "@/node_modules/next/server";
import { unstable_noStore as noStore } from "next/cache";


// GET /api/posts: Get all posts
export const GET = async (req: NextRequest) => {
  noStore();
  
  try {
    const posts = await prisma.post.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        likes: true,
        createdAt: true,
        comments: {select: {
          id: true
        }},
        User: {
          select: {
            id: true,
            userName: true,
            imageUrl: true
          }
        }
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(
      posts
    );
  } catch (error) {
    return NextResponse.json(
      { error: {error} },
      { status: 500 }
    );
  }
};

// POST /api/posts: Create a new post.
export const POST = async (req: NextRequest) => {
  try {
    const { title, content, userId } = await req.json();
    const likes = 0;
    const post = await prisma.post.create({
      data: {
        title,
        content,
        likes,
        userId: userId
      },
    });
    return NextResponse.json({ post });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
};
