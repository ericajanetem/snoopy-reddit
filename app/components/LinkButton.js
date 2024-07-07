import Link from 'next/link';
import { Button } from "@/components/ui/button";

const LinkButton = ({ variant, href, children }) => (
  <Link href={href} passHref>
    <Button variant = {variant} as="a">{children}</Button>
  </Link>
);

export default LinkButton;