import Link from '@/node_modules/next/link';
import { useState } from 'react';

interface Props {
  text: string;
  maxLength: number;
}

const TruncatedText = ({ text, maxLength }: Props) => {
    const [truncatedText, setTruncatedText] = useState<string>(text);

  // Function to truncate text if it exceeds maxLength
  const truncateText = (text: string, maxLength: number): string => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  const isTruncated = text.length > maxLength;
  
  // Update truncatedText state on component mount
  useState(() => {
    setTruncatedText(truncateText(text, maxLength));
  }, [text, maxLength]);
  // TODO: Change the view more in post to the link to the page
  return (
    <>
    <div className="text-pretty">
      {truncatedText}
      <div className="py-10">
      {isTruncated && <Link href="/">View More in post</Link>}
      </div>
    </div>
    </>
  );
  
};

export default TruncatedText;