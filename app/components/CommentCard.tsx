import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  ArrowDown,
  ArrowUp,
  MessageCircle,
  Trash2,
  Pencil,
  MessageCircleReply,
} from "lucide-react";
import { DeleteCommentPopUp } from "./DeleteCommentPopUp";


interface postCardProps {
  content: any;
  id: number;
  postId: number;
}

export function CommentCard({ content, id, postId }: postCardProps) {
  return (
    <Card className="flex relative overflow-hidden">
      <div className="flex flex-col items-center gap-y-2 bg-muted p-2">
        <Avatar>
          <AvatarImage />
          <AvatarFallback>😛</AvatarFallback>
        </Avatar>
      </div>

      <div>
        <div className="flex items-center gap-x-2 p-2 py-6">
        <MessageCircleReply />
          <p className="text-balance text-sm">
              
            {content}
          </p>
        </div>

        <Separator />
        <div className="m-3">
          <div className="flex space-x-6">
            <div className="flex items-center gap-x-1">
                  <DeleteCommentPopUp postId={postId} commentId={id} />
              </div>
            </div>
            
        </div>
      </div>
    </Card>
  );
}
