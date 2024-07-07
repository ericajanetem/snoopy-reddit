"use client";

import { PostCard } from "@/app/components/PostCard";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import HelloImage from "../public/hero-image.png";
import Banner from "../public/banner.png";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SuspenseCard } from "./components/SuspenseCard";

const Home = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch("/api/posts");
      const data = await response.json();
      setTasks(data.posts);
    };

    fetchTasks();
  }, []);

  const retrievedTasks = tasks || []

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
                Your Home Reddit frontpage. Come here to check in with your
                favorite communites!
              </p>
              <Separator className="my-5" />

              <div className="flex flex-col gap-y-3">
                <Button asChild variant="secondary">
                  <Link href="/pages/createPost">Create a New Post</Link>
                </Button>
                <Button asChild>
                  <Link href="/r/create">View Trending</Link>
                </Button>
              </div>
            </div>
          </Card>
        </div>
        <div className="w-[70%] flex flex-col gap-y-5">
          <h1>All Posts</h1>
          {retrievedTasks.map((task) => (
            <PostCard
              id={task.id}
              jsonContent={task.content}
              title={task.title}
              key={task.id}
              createdAt={task.createdAt}
              likes={task.likes}
              comments={task.comments.length}
            />
          ))}
        </div>
      </div>
    </div>
  );
          
};

export default Home;
