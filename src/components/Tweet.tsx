import { TwitterTweetEmbed } from "react-twitter-embed";

export default function Tweet({ tweetId }: { tweetId: string }) {
  return (
    <div className="flex justify-center ">
      <div className="max-w-[600px] w-full">
        <TwitterTweetEmbed onLoad={() => {}} tweetId={tweetId} />
      </div>
    </div>
  );
}
