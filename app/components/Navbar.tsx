import RedditText from "../../public/logo-name.svg";
import redditMobile from "../../public/reddit-full.svg";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import LinkButton from "./LinkButton";

export function Navbar() {
    return (
        <nav className="h-[10vh] w-full flex items-center border-b px-5 lg:px-14 justify-between">
        <Link href="/" className="flex items-center gap-x-3">
          <Image
            src={redditMobile}
            alt="Reddit mobile icon"
            className="h-10 w-fit"
          />
          <Image
            src={RedditText}
            alt="Reddit Desktop"
            className="h-9 w-fit hidden lg:block"
          />
        </Link>
        <div className="flex items-center gap-x-5">
            <LinkButton variant="secondary" href="/">Home</LinkButton>
            <LinkButton variant="outline" href="/pages/createPost">Make Post</LinkButton>
            <ThemeToggle />
        </div>
        </nav>
    )
}