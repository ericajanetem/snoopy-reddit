import Link from "@/node_modules/next/link";

const Custom404 = () => {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <p>
        <Link href="/">
          <a>Go back to Home</a>
        </Link>
      </p>
    </div>
  );
};

export default Custom404;