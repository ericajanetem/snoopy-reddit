"use server";

import prisma from "./lib/db";
import { Prisma, TypeOfVote } from "@prisma/client";
import { revalidatePath } from "@/node_modules/next/cache";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { unstable_noStore as noStore } from "@/node_modules/next/cache";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function createPost(formData: FormData) {
  noStore();
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  // Check that the user is login
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  let userData: any;

  if (user) {
    try {
      userData = await prisma.user.findUnique({
        where: { id: user.id },
      });
    } catch (error) {
      console.log(error);
      throw new Error("User is not logged in");
    }

    const postData = {
      title,
      content,
      userId: user.id,
    };

    try {
      const response = await fetch(`${apiUrl}/api/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error("Failed to create post");
      }
    } catch (error) {
      console.log(error);
      throw new Error("Failed to create post");
    }
  }
  revalidatePath(`/`);
  // return NextResponse.json({status: 200})
}

export async function createComment(formData: FormData) {
  noStore();
  const comment = formData.get("comment") as string;
  const postId = formData.get("postId");

  // Check that the user is login
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user === null || !user.id)
    throw new Error("something went wrong please try again");

  if (user) {
    const postData = {
      id: Number(postId),
      content: comment,
      userId: user.id,
    };

    // Create the Comment
    try {
      const response = await fetch(`${apiUrl}/api/posts/${postId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error("Failed to create comment");
      }
    } catch (error) {
      throw new Error("Failed to create comment");
    }
  }
  revalidatePath(`/posts/${postId}`);
}

export async function handleVote(formData: FormData) {
  noStore();
  const typeVote = formData.get("typeVote") as TypeOfVote;
  const postId = formData.get("postId");

  // Check that the user is login
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  let userData: any;

  if (user) {
    try {
      userData = await prisma.user.findUnique({
        where: { id: user.id },
      });
    } catch (error) {
      throw new Error("User is not logged in");
    }

    let voteChangeNum: number;
    let upvoteStatus: boolean = false;
    let downvoteStatus: boolean = false;

    // Check if the user has already voted & the type of vote
    const vote = await prisma.vote.findFirst({
      where: { postId: Number(postId), userId: String(user.id) },
    });
    if (vote) {
      if (vote.voteType === typeVote) {
        await prisma.vote.delete({
          where: {
            id: vote.id,
          },
        });
        voteChangeNum = typeVote === "UP" ? -1 : 1;

        upvoteStatus = false;
        downvoteStatus = false;
      } else {
        // Update the vote with the new direction & update
        await prisma.vote.update({
          where: {
            id: vote.id,
          },
          data: {
            voteType: typeVote,
          },
        });
        voteChangeNum = typeVote === "UP" ? 2 : -2;

        if (typeVote === "UP") {
          downvoteStatus = false;
          upvoteStatus = true;
        } else if (typeVote === "DOWN") {
          downvoteStatus = true;
          upvoteStatus = false;
        }
      }
    } else {
      await prisma.vote.create({
        data: {
          postId: Number(postId),
          userId: String(user.id),
          voteType: typeVote,
        },
      });
      voteChangeNum = typeVote === "UP" ? 1 : -1;
      if (typeVote === "UP") {
        upvoteStatus = true;
        downvoteStatus = false;
      } else if (typeVote === "DOWN") {
        downvoteStatus = true;
        upvoteStatus = false;
      }
    }
    await prisma.post.update({
      where: {
        id: Number(postId),
      },
      data: {
        likes: {
          increment: voteChangeNum,
        },
      },
    });
  }
  return revalidatePath("/");
}
