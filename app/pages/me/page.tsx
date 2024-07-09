import { PostCard } from "@/app/components/PostCard";
import Link from "next/link";
import Image from "next/image";
import prisma from "@/app/lib/db";
import HelloImage from "../../../public/snoopy_logo.png";
import Banner from "../../../public/banner.png";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { unstable_noStore as noStore } from "@/node_modules/next/cache";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

async function getData() {
  noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (user) {
    const posts = await prisma.post.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        likes: true,
        createdAt: true,
        comments: {
          select: {
            id: true,
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
      where: {
        User: {
          id: user.id,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return posts;
  }
}

export default async function userPage() {
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
                <h1 className="font-large">Hello!</h1>
              </div>
              <p className="text-sm text-muted-foreground pt-2">
                All the posts you created!<br></br>
              </p>
              <Separator className="my-5" />
              {userLoggedIn && (
                <div className="flex flex-col gap-y-3">
                  <Button asChild variant="secondary">
                    <Link href="/pages/createPost">Create a New Post</Link>
                  </Button>
                </div>
              )}
            </div>
          </Card>
        </div>
        <div className="w-[70%] flex flex-col gap-y-8">
          <h1>My Posts</h1>
          <ShowPosts loggedInUser={user ? user.id : ""} />
        </div>
      </div>
    </div>
  );
}

type ShowPostsProps = {
  loggedInUser: string;
};

async function ShowPosts({ loggedInUser }: ShowPostsProps) {
  const retrievedTasks = await getData();
  if (retrievedTasks) {
    return (
      <>
        {retrievedTasks.map((post: any) => (
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
}
