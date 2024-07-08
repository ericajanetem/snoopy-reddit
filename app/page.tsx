import { PostCard } from "@/app/components/PostCard";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import HelloImage from "../public/snoopy_logo.png";
import Banner from "../public/banner.png";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { unstable_noStore as noStore } from "@/node_modules/next/cache";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

async function getData() {
  noStore();
  const allPostResponse = await fetch(`${apiUrl}/api/posts`);
  if (!allPostResponse.ok) {
    return null;
  }

  const data = await allPostResponse.json();
  return data;
}

export default async function Home() {
  // Check if the user is logged in
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const userLoggedIn = user ? true : false;

  return (
    <div>
      <div className="max-w-[1500px] mx-auto flex gap-x-10 mt-4 mb-10">
        <div className="w-[30%]">
          <Card>
            <Image src={Banner} alt="Banner" />
            <div className="p-2">
              <div className="flex items-center">
                <Image
                  src={HelloImage}
                  alt="Hello Image"
                  className="w-10 h-16 -mt-6"
                />
                <h1 className="font-medium pl-3">Home</h1>
              </div>
              <p className="text-sm text-muted-foreground pt-2">
                Your Snoopy-ddit Homepage.<br></br>
  
                Snoop on the posts that people are sharing!
              </p>
              <Separator className="my-5" />
              {userLoggedIn &&
              <div className="flex flex-col gap-y-3">
                <Button asChild variant="secondary">
                  <Link href="/pages/createPost">Create a New Post</Link>
                </Button>
                <Button asChild>
                  <Link href="/r/create">View Trending</Link>
                </Button>
              </div>
              }
            </div>
          </Card>
        </div>
        <div className="w-[70%] flex flex-col gap-y-8">
          <h1>All Posts</h1>
          <ShowPosts loggedInUser={user ? user.id: ""}/>
        </div>
      </div>
    </div>
  );
}

async function ShowPosts({loggedInUser}) {
  
  const retrievedTasks = await getData();
  return (
    <>
      {retrievedTasks.map((post) => (
        <PostCard
          id={post.id}
          jsonContent={post.content}
          title={post.title}
          key={post.id}
          createdAt={post.createdAt}
          likes={post.likes}
          comments={post.comments.length}
          userId={post.User.id}
          userName={post.User.userName}
          userImageUrl={post.User.imageUrl}
          loggedInUser={loggedInUser}
        />
      ))}
    </>
  );
}
