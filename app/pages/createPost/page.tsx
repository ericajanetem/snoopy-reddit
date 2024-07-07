"use client";

import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setIsLoading(true);

    const response = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content,
      }),
    });

    if (response.ok) {
        setIsLoading(false);
        router.push("/");
    } else {
        alert("Failed!")
    }

    // TODO: make toast to say, your post has been created! View post?
  };

  return (
    <form
      className="w-[500px] mx-auto pt-20 flex flex-col gap-2"
      onSubmit={handleSubmit}
    >
      <CardHeader>
        <CardTitle>Create a New Post</CardTitle>
        <CardDescription>
          Share your thoughts with the world 🌎️
        </CardDescription>
        <Input
          required
          name="title"
          placeholder="Insert Title here..."
          value={title ?? undefined}
          onChange={(e) => setTitle(e.target.value)}
        />
      </CardHeader>
      <CardContent>
        <textarea
          rows={10}
          placeholder="Input your content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border p-2 rounded-md"
        />
      </CardContent>
      <CardFooter>
        <button disabled={isLoading}>
          {isLoading ? "Loading ..." : "Submit"}
        </button>
      </CardFooter>
    </form>
  );
};

export default CreatePost;

