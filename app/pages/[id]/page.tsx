import { CommentCard } from "@/app/components/CommentCard";
import { CommentForm } from "@/app/components/CommentForm";
import { PostCard } from "@/app/components/PostCard";
import { Separator } from "@/components/ui/separator";
import { unstable_noStore as noStore } from "next/cache";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;


async function getData(id: string) {
  noStore();
  const postResponse = await fetch(`${apiUrl}/api/posts/${id}`);
  if (!postResponse.ok) {
    throw new Error(`Post with ID ${id} not found`);
  }

  if (!postResponse) {
    return null;
  }
  return postResponse;
}

export default async function PostPage({ params }: { params: { id: string } }) {
  const allData = await getData(params.id);

  // Check if the user is logged in
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const userLoggedIn = user ? true : false;

  if (allData) {
    const data = await allData.json();
    const post = data;
    return (
      <div>
        <div className="flex px-10 py-5">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink>Post</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
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
              userId={post.User.id}
              userName={post.User.userName ? post.User.userName : "unknown"}
              userImageUrl={post.User.imageUrl ? post.User.imageUrl : ""}
              loggedInUser={user.id}
            />
            <Separator />
            {userLoggedIn && (
              <div className="py-10">
                <CommentForm postId={post.id} />
              </div>
            )}
          </div>
          <div className="w-[50%] flex flex-col gap-y-5">
            <h1>All Comments</h1>
            {post.comments.length === 0 && (
              <div>No comments yet. Start the discussion!</div>
            )}
            {post.comments.map((item, index) => (
              <CommentCard
                key={index}
                content={item.content}
                id={item.id}
                postId={item.postId}
                userName={item.User.userName ? item.User.userName : "unknown"}
                userImageUrl={item.User.imageUrl ? item.User.imageUrl : ""}
                ownComment={item.User.id === user.id ? true : false}
              />
            ))}
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
