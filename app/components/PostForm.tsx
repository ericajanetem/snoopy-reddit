import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { createPost } from "../actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export function PostForm() {
  const { toast } = useToast();
  const ref = useRef<HTMLFormElement>(null);
  const router = useRouter();
  return (
    <div>
      <form
        className="mt-5"
        action={async (formData) => {
          const content = formData.get("content") as string;
          const title = formData.get("title") as string;
          if (content.length === 0) {
            toast({
              description: "Comment cannot be blank!",
              variant: "destructive",
            });
          } else if (title.length === 0) {
            toast({
              description: "Title cannot be blank!",
              variant: "destructive",
            });
          }else {
            try {
              await createPost(formData);
              toast({
                description: "Your post has been created!",
              });
              router.push("/")
            } catch (error) {
              toast({
                description: "Failed to create post. Please try again.",
                variant: "destructive",
              });
            }
            ref.current?.reset();
          }
        }}
        ref={ref}
      >
        <CardHeader>
          <CardTitle>Create a New Post</CardTitle>
          <CardDescription>
            Share your thoughts with the world 🌎️
          </CardDescription>
        </CardHeader>
        {/* <input type="hidden" name="title" /> */}
        <CardContent>
          <div className="py-2">
            <div className="w-full mt-3 mb-2">
              <Label htmlFor="Title">Title: </Label>
              <Input name="title" placeholder="Enter your title here..." />
            </div>
            <div className="w-full mt-10 mb-2">
            <Label htmlFor="Content">Content: </Label>
            <Textarea
              placeholder="What are your thoughts?"
              className="w-full mb-2"
              name="content"
            />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="py-3">
            <Button>Post</Button>
          </div>
        </CardFooter>
      </form>
    </div>
  );
}
