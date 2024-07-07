import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Prisma, TypeOfVote } from "@prisma/client";

import {
  ArrowDown,
  ArrowUp,
  MessageCircle,
  Trash2,
  Pencil,
} from "lucide-react";
import Link from "next/link";
// import TruncatedText from "./TruncatedText";
import { useEffect, useState } from "react";
import DateTimeFormatter from "./DateTimeFormatter";
import { DeletePopUp } from "./DeletePopUp";
import LinkButton from "./LinkButton";


interface postProps {
  title: string;
  jsonContent: any;
  id: number;
  createdAt: string;
  likes: number;
  comments: any;
}

export function PostCard({ id, title, jsonContent, createdAt, likes: initialLikes, comments }: postProps) {
    const [likes, setLikes] = useState<number>(initialLikes);
    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const postId = formData.get("postId") as FormDataEntryValue | null;
        const voteDirection = formData.get("voteDirection") as TypeOfVote;
        const postData = {
            postId: Number(postId),
            voteDirection: voteDirection
        };

        try {
            const response = await fetch('/api/vote', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData),
            });

            if (!response.ok) {
                console.log("Failed to vote on post")
            }
            const data = await response.json()
            setLikes(data.likes);

        } catch (error) {
            console.log('Error voting', error)
        }
    };
    

  return (
    <Card className="flex relative overflow-hidden">
      <div className="flex flex-col items-center gap-y-2 bg-muted p-2">
        <form onSubmit={handleFormSubmit}>
          <Button variant="outline" size="sm">
            <input type="hidden" name="voteDirection" value="UP" />
            <input type="hidden" name="postId" value={id} />
            <ArrowUp className="h-4 w-4" />
          </Button>
        </form>
        {likes}
        <form onSubmit={handleFormSubmit}>
          <Button variant="outline" size="sm">
            <input type="hidden" name="voteDirection" value="DOWN" />
            <input type="hidden" name="postId" value={id} />
            <ArrowDown className="h-4 w-4" />
          </Button>
        </form>
      </div>

      <div>
        <div className="flex items-center gap-x-2 p-2">
        <Link href={`/pages/${id}`}>
            <h1 className="font-medium mt-1 text-lg">{title}</h1>
          </Link>
        </div>

        <Separator />

        <div className="flex items-center gap-x-2 p-2 py-6">
          <p className="text-balance">
            {jsonContent}
          </p>
        </div>
        <Separator />
        <div className="m-3">
          <div className="flex space-x-6">
            <div className="flex items-center gap-x-1">
              <MessageCircle className="h-4 w-4 text-muted-foreground gap-x-1" />
              <p className="text-muted-foreground font-medium text-xs">
                {comments} {comments === 1 ? 'Comment' : 'Comments'}
              </p>
            </div>
            <div className="flex items-center gap-x-1">
                <DeletePopUp id={id} />
            </div>
          </div>

          <div className="flex items-center gap-x-2  py-2">
            <p className="text-muted-foreground font-medium text-xs">
              Posted at: <DateTimeFormatter timestamp={createdAt} />
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
