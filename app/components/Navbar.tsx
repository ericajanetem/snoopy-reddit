import RedditText from "../../public/logo-name.svg";
import redditMobile from "../../public/snoopy_logo_2.png";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { UserDropdown } from "./UserDropdown";

export async function Navbar() {
  
  // Check if the user is logged in
  const { getUser } = getKindeServerSession();
  const user = await getUser();


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
            <Button variant="ghost"><Link href="/">Home</Link></Button>
        {!user ? (
          <div className="flex items-center gap-x-5">
            <Button asChild>
              <LoginLink>Login</LoginLink>
            </Button>
            <Button variant="secondary" asChild>
              <RegisterLink>Sign Up</RegisterLink>
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-x-5">
            <UserDropdown userImage={user.picture} />
          </div>
        )}
        <ThemeToggle />
      </div>
    </nav>
  );
}
