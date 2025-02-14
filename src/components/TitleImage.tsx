import Picture from "./Picture";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import TitleTextBorder from "./TitleTextBorder";

export default function TitleImage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      gsap
        .timeline({
          scrollTrigger: {
            trigger: ".title_picture",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        })
        .to(".title_picture", { y: 100 });
    },
    { scope: sectionRef }
  );

  return (
    <div ref={sectionRef} className="h-screen">
      <Picture
        src="https://images.theconversation.com/files/611350/original/file-20240805-21-8bzb4w.jpg"
        loading="eager"
        className='full_screen_media make_visible not-prose before:contents-[""] absolute left-0 top-0 overflow-clip before:absolute before:bottom-[-1px] before:left-0 before:z-10 before:h-full before:w-full before:bg-gradient-to-t before:from-neutral-800'
        imgClassName="title_picture brightness-75"
        caption=""
        source=""
        sourceLink=""
        alt="Drone shot of balconies taken from the courtyard of the Jinshui compound in Otres Village, Sihanoukville."
        focalPoint={{
          mobile: { x: 0.5, y: 0.5 },
          tablet: { x: 0.5, y: 0.5 },
          tabletLandscape: { x: 0.5, y: 0.5 },
          laptop: { x: 0.5, y: 0.5 },
          desktop: { x: 0.5, y: 0.5 },
        }}
      />

      <div className="relative z-10 h-screen place-content-center pt-14">
        <div className="mx-auto max-w-[45ch] text-center">
          <TitleTextBorder
            as={"h1"}
            bgClassName="bg-neutral-50"
            className="text-neutral-800 text-balance text-center font-base text-5xl font-bold md:text-6xl lg:text-7xl"
          >
            Scam Factories
          </TitleTextBorder>
          <br />
        </div>

        <div className="mx-auto max-w-[25ch] md:max-w-[40ch] text-center">
          <TitleTextBorder
            as={"h1"}
            bgClassName="bg-neutral-900"
            className="text-neutral-50 text-center font-body text-xl font-bold md:text-3xl"
          >
            The inside story of Southeast Asia’s fraud compounds
          </TitleTextBorder>
        </div>

        <div className="text-center mt-4">
          <h2>Part three</h2>
          <span className="inline-block font-base text-sm">
            By{" "}
            <a href="https://theconversation.com/profiles/ivan-franceschini-1529038">
              Ivan Franceschini
            </a>
            ,{" "}
            <a href="https://theconversation.com/profiles/ling-li-1529042">
              Ling Li
            </a>{" "}
            and The Conversation Digital Storytelling Team.
          </span>
          <br />
          <span className="font-base text-xs">
            Published: <time className="">{new Date().toDateString()}</time>
          </span>
        </div>
      </div>
    </div>
  );
}
