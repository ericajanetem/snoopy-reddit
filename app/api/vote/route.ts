import { revalidatePath } from "@/node_modules/next/cache";
import { NextRequest, NextResponse } from "@/node_modules/next/server";
import prisma from "@/app/lib/db";

// POST /api/posts: Vote on post.
export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json()
    const { postId, voteDirection } = body;

    if (!postId || !voteDirection) {
      return NextResponse.json(
        { error: "Missing postId or voteDirection" },
        { status: 400 }
      );
    }

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      }
    })

    if (!post) {
      return NextResponse.json({error: "Post Not found"}, {status:404})
    }


    let updatedPost;

    if (voteDirection === "UP") {
      updatedPost = await prisma.post.update({
        where: { id: postId },
        data: { likes: { increment: 1 } },
      });
    } else if (voteDirection === "DOWN") {
      updatedPost = await prisma.post.update({
        where: { id: postId },
        data: { likes: { decrement: 1 } },
      });
    } else {
      return NextResponse.json(
        { error: "Invalid vote direction" },
        { status: 400 }
      );
    }


    // Revalidate the cache for the path "/"
    await revalidatePath("/");
    return NextResponse.json(
      { message: "Vote processed successfully", likes: updatedPost.likes },
      { status: 200 }
    );
  } catch (error) {
    
    return NextResponse.json({ error: { error } }, { status: 500 });
  }
};
