import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { CircleUser, MessageCircleReply } from "lucide-react";
import { DeleteCommentPopUp } from "./DeleteCommentPopUp";

interface postCardProps {
  content: any;
  id: number;
  postId: number;
  userName: string;
  userImageUrl: string;
  ownComment: boolean;
}

export function CommentCard({
  content,
  id,
  postId,
  userName,
  userImageUrl,
  ownComment,
}: postCardProps) {
  return (
    <Card className="flex relative overflow-hidden">
      <div className="flex flex-col items-center gap-y-2 bg-muted p-4">
        <Avatar>
          <AvatarImage src={userImageUrl} />
          <AvatarFallback>
            <CircleUser />
          </AvatarFallback>
        </Avatar>
      </div>

      <div>
        <p className="text-xs text-muted-foreground">
          <span className="hover:text-primary py-6">u/{userName}</span>
        </p>
        <div className="flex items-center gap-x-2 p-2 py-6">
          <p className="text-balance text-sm">{content}</p>
        </div>

        <Separator />
        <div className="m-3">
          <div className="flex space-x-6">
            {ownComment && (
              <div className="flex items-center gap-x-1">
                <DeleteCommentPopUp postId={postId} commentId={id} />
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
