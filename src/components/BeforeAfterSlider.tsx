import Imgix from "react-imgix";
import { FIGUREWIDTH } from "../util/constants";
import { useEffect, useRef } from "react";
import { cn } from "../util/helpers";

export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  loading,
  caption,
  source,
  sourceLink,
  className,
  sliderClassName,
}: {
  beforeSrc: string;
  afterSrc: string;
  loading: string;
  caption: string;
  source: string;
  sourceLink: string;
  className?: string;
  sliderClassName?: string;
}) {
  const resizer = useRef<HTMLDivElement | null>(null);
  const slider = useRef<HTMLDivElement | null>(null);
  const before = useRef<HTMLDivElement | null>(null);

  const moveSlider = (x: number) => {
    if (!slider.current || !before.current || !resizer.current) return;

    const sliderRect = slider.current.getBoundingClientRect();
    const offsetX = x - sliderRect.left;

    // Calculate the percentage of the slider's width
    const percentage =
      Math.max(0, Math.min(offsetX / sliderRect.width, 1)) * 100;

    // Apply the percentage to clip-path and resizer position
    before.current.style.clipPath = `inset(0px ${100 - percentage}% 0px 0px)`;
    resizer.current.style.left = `${percentage}%`;
  };

  useEffect(() => {
    let active = false;

    if (!resizer.current || !slider.current) return;

    const resizerEl = resizer.current;
    const sliderEl = slider.current;

    const startSlide = () => {
      active = true;
      resizerEl.classList.add("resize");
      before.current!.classList.add("no-transition");
      resizer.current!.classList.add("no-transition");
    };

    const stopSlide = () => {
      active = false;
      resizerEl.classList.remove("resize");
      before.current!.classList.remove("no-transition");
      resizer.current!.classList.remove("no-transition");
    };

    const handleMove = (e: TouchEvent | MouseEvent) => {
      if (!active) return;

      let x = 0;
      if (e instanceof TouchEvent && e.changedTouches.length > 0) {
        x = e.changedTouches[0].pageX;
      } else if (e instanceof MouseEvent) {
        x = e.pageX;
      }

      moveSlider(x);
    };

    const handleClick = (e: MouseEvent) => {
      moveSlider(e.pageX);
    };

    resizerEl.addEventListener("mousedown", startSlide);
    resizerEl.addEventListener("touchstart", startSlide);
    document.body.addEventListener("mouseup", stopSlide);
    document.body.addEventListener("mouseleave", stopSlide);
    document.body.addEventListener("mousemove", handleMove);
    document.body.addEventListener("touchend", stopSlide);
    document.body.addEventListener("touchcancel", stopSlide);
    document.body.addEventListener("touchmove", handleMove);

    sliderEl.addEventListener("click", handleClick);

    return () => {
      resizerEl.removeEventListener("mousedown", startSlide);
      resizerEl.removeEventListener("touchstart", startSlide);
      sliderEl.removeEventListener("click", handleClick);
      document.body.removeEventListener("mouseup", stopSlide);
      document.body.removeEventListener("mouseleave", stopSlide);
      document.body.removeEventListener("mousemove", handleMove);
      document.body.removeEventListener("touchend", stopSlide);
      document.body.removeEventListener("touchcancel", stopSlide);
      document.body.removeEventListener("touchmove", handleMove);
    };
  }, []);

  const commonProps = {
    imgixParams: {
      fit: "crop",
      auto: "format",
      q: 30,
    },
  };

  const renderSource = () => {
    if (source && sourceLink && caption) {
      return (
        <figcaption>
          {caption}{" "}
          <span className="opacity-70">
            <a href={sourceLink} target="_blank" rel="noopener noreferrer">
              {source}
            </a>
          </span>
        </figcaption>
      );
    } else if (source || caption) {
      return (
        <figcaption>
          {caption} <span className="opacity-70">{source}</span>
        </figcaption>
      );
    }
    return <></>;
  };

  const alignmentSize = `${FIGUREWIDTH.maxWidth}px`;

  const sizes = `(max-width: 599px) 100vw, (min-width: 600px) ${alignmentSize}, (min-width: 1536px) ${alignmentSize}, ${alignmentSize}`;

  return (
    <figure className={cn("", className)}>
      <div
        ref={slider}
        className={cn(
          "cursor-col-resize w-full relative overflow-hidden not-prose",
          sliderClassName
        )}
      >
        <div
          ref={before}
          className="[clip-path:inset(0px_50%_0px_0px)] before-image absolute h-full w-full top-0 left-0  z-[2]"
        >
          <Imgix
            className="select-none object-cover object-left w-full h-full "
            {...commonProps}
            htmlAttributes={{
              loading: loading,
              draggable: false,
            }}
            src={beforeSrc}
            sizes={sizes}
          />
        </div>

        <div className="w-full h-full">
          <Imgix
            className="select-none object-cover object-left w-full h-full"
            {...commonProps}
            htmlAttributes={{
              loading: loading,
              draggable: false,
            }}
            src={afterSrc}
            sizes={sizes}
          />
        </div>

        <div
          ref={resizer}
          className="resizer absolute h-full border-[3px] border-r-white top-0 left-1/2 z-[5] touch-pan-y flex items-center"
        ></div>
      </div>

      {renderSource()}
    </figure>
  );
}
