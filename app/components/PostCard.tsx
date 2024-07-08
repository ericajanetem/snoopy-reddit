"use client"

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CircleUser } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  ArrowDown,
  ArrowUp,
  MessageCircle
} from "lucide-react";
import Link from "next/link";
import { DeletePopUp } from "./DeletePopUp";
import { handleVote } from "../actions";

interface postProps {
  title: string;
  jsonContent: any;
  id: number;
  createdAt: string;
  likes: number;
  comments: any;
  userId: number;
  userName: string;
  userImageUrl: string;
  loggedInUser: number;
}

export function PostCard({
  id,
  title,
  jsonContent,
  createdAt,
  likes,
  comments,
  userId,
  userName,
  userImageUrl,
  loggedInUser,
}: postProps) {

  return (
    <Card className="flex relative overflow-hidden">
      <div className="flex flex-col items-center gap-y-2 bg-muted p-2">
        <form action={handleVote}>
          <Button variant="outline" size="sm">
            <input type="hidden" name="typeVote" value="UP" />
            <input type="hidden" name="postId" value={id} />
            <ArrowUp className="h-4 w-4" />
          </Button>
        </form>
        {likes}
        <form action={handleVote}>
          <Button variant="outline" size="sm">
            <input type="hidden" name="typeVote" value="DOWN" />
            <input type="hidden" name="postId" value={id} />
            <ArrowDown className="h-4 w-4" />
          </Button>
        </form>
      </div>

      <div>
        <div className="flex items-center gap-x-2 p-2">
          <Avatar>
            <AvatarImage src={userImageUrl} />
            <AvatarFallback>
              <CircleUser />
            </AvatarFallback>
          </Avatar>
          <p className="text-xs text-muted-foreground">
            <span className="hover:text-primary">u/{userName}</span>
          </p>
        </div>

        <div className="px-2">
          <Link href={`/pages/${id}`}>
            <h1 className="font-medium mt-1 text-lg">{title}</h1>
          </Link>
        </div>

        <Separator />

        <div className="flex items-center gap-x-2 p-2 py-6">
          <p className="text-balance">{jsonContent}</p>
        </div>
        <Separator />
        <div className="m-3">
          <div className="flex space-x-6">
            <div className="flex items-center gap-x-1">
              <MessageCircle className="h-4 w-4 text-muted-foreground gap-x-1" />
              <p className="text-muted-foreground font-medium text-xs">
                {comments} {comments === 1 ? "Comment" : "Comments"}
              </p>
            </div>
            { loggedInUser === userId &&
            <div className="flex items-center gap-x-1">
              <DeletePopUp id={id} />
            </div>
}
          </div>
              

          <div className="flex items-center gap-x-2  py-2">
            <p className="text-muted-foreground font-medium text-xs">
              Posted at: {new Date(createdAt as Date).toLocaleDateString("en-us", {
                  weekday: "long",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
