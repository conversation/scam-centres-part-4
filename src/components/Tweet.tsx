// import { Tweet as TwitterEmbed } from "react-tweet";
import { XEmbed } from "react-social-media-embed";

export default function Tweet({ tweetId }: { tweetId: string }) {
  return (
    <div className="not-prose">
      <div className="grid place-content-center">
        {/* <TwitterEmbed id={tweetId} /> */}
        <XEmbed url={tweetId} width={Math.min(window.innerWidth - 40, 600)} />
      </div>
    </div>
  );
}
