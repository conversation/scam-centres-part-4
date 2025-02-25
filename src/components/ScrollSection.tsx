import { ReactNode, useRef } from "react";
import { addClassToChildren, cn } from "../util/helpers";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ARTICLEWIDTH } from "../util/constants";

gsap.registerPlugin(ScrollTrigger);

export function ScrollSection({
  className,
  children,
  pinType,
  id,
}: {
  children: ReactNode;
  pinType: string;
  className?: string;
  id?: string;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const video: HTMLVideoElement | null = section.querySelector("video");

      if (video) {
        video.playbackRate = 0.25;
        ScrollTrigger.create({
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          onEnter: () => video.play(),
          onEnterBack: () => video.play(),
          onLeave: () => video.pause(),
          onLeaveBack: () => video.pause(),
        });
      }

      const steps = section.querySelectorAll(".pinned_foreground .step");
      const backgroundElements = section.querySelectorAll(
        ".pinned_background_wrapper > *"
      );
      const backgroundImageElements = section.querySelectorAll(
        ".pinned_background_wrapper img"
      );
      const foregroundElement = section.querySelectorAll(".foregroundElement");

      steps.forEach((step, index) => {
        const element = backgroundElements[index + 1];

        if (element) {
          ScrollTrigger.create({
            trigger: step,
            start: "top 90%",
            onEnter: () => {
              element.classList.add("make_visible");
            },
            onLeaveBack: () => {
              element.classList.remove("make_visible");
            },
          });
        }
      });

      if (backgroundImageElements.length) {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: foregroundElement,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          })
          .to(backgroundImageElements, { scale: 1.5, ease: "power1.inOut" });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      id={id}
      ref={sectionRef}
      className={cn(
        "not-prose relative grid min-h-screen w-full text-lg md:text-xl",
        pinType,
        className
      )}
    >
      {children}
    </section>
  );
}

export function ScrollBackground({
  className,
  bgClassName,
  children,
}: {
  className?: string;
  bgClassName?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("pinned_background", className)}>
      <div className={cn("pinned_background_wrapper", bgClassName)}>
        {children}
      </div>
    </div>
  );
}

export function ScrollForeground({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn("pinned_foreground mx-auto", className)}
      style={{
        width: `min(100% - 40px, ${ARTICLEWIDTH.maxWidth}px)`,
      }}
    >
      {children}
    </div>
  );
}

export function ScrollTextChapter({
  children,
  className,
  position,
  step,
  id,
}: {
  children: ReactNode;
  className: string;
  id?: string;
  position?: string;
  step?: boolean;
}) {
  return (
    <div className={cn("chapter_wrapper", className, position)} id={id}>
      {addClassToChildren(children, step ? "step" : "")}
    </div>
  );
}
