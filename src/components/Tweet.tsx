// import { Tweet as TwitterEmbed } from "react-tweet";
// import { XEmbed } from "react-social-media-embed";
import { TwitterTweetEmbed } from "react-twitter-embed";

export default function Tweet({ tweetId }: { tweetId: string }) {
  return (
    <div className="not-prose w-full">
      <div className="flex justify-center w-full">
        <TwitterTweetEmbed tweetId={tweetId} options={{ id: `${tweetId}` }} />
        {/* <TwitterEmbed id={tweetId} /> */}
        {/* <XEmbed url={tweetId} width={Math.min(window.innerWidth - 40, 600)} /> */}
      </div>
    </div>
  );
}
