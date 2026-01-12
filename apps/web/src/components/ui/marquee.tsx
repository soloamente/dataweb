"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  duration?: number;
  pauseOnHover?: boolean;
  direction?: "left" | "right" | "up" | "down";
  fade?: boolean;
  fadeAmount?: number;
}

export function Marquee({
  children,
  className,
  duration = 26,
  pauseOnHover = false,
  direction = "left",
  fade = true,
  fadeAmount = 10,
  ...props
}: MarqueeProps) {
  const [isPaused, setIsPaused] = React.useState(false);
  const items = React.Children.toArray(children);
  const isVertical = direction === "up" || direction === "down";

  return (
    <>
      <style jsx>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @keyframes marquee-reverse {
          from {
            transform: translateX(-50%);
          }
          to {
            transform: translateX(0);
          }
        }

        @keyframes marquee-y {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(-50%);
          }
        }

        @keyframes marquee-y-reverse {
          from {
            transform: translateY(-50%);
          }
          to {
            transform: translateY(0);
          }
        }

        .marquee-content {
          display: flex;
          will-change: transform;
          animation: ${
            isVertical
              ? direction === "up"
                ? "marquee-y"
                : "marquee-y-reverse"
              : direction === "left"
              ? "marquee"
              : "marquee-reverse"
          } ${duration}s linear infinite;
        }

        .marquee-content.paused {
          animation-play-state: paused;
        }
      `}</style>
      <div
        className={cn(
          "relative flex w-full overflow-hidden justify-center items-center",
          isVertical && "flex-col",
          className
        )}
        style={{
          ...(fade && {
            maskImage: isVertical
              ? `linear-gradient(to bottom, transparent 0%, black ${fadeAmount}%, black ${
                  100 - fadeAmount
                }%, transparent 100%)`
              : `linear-gradient(to right, transparent 0%, black ${fadeAmount}%, black ${
                  100 - fadeAmount
                }%, transparent 100%)`,
            WebkitMaskImage: isVertical
              ? `linear-gradient(to bottom, transparent 0%, black ${fadeAmount}%, black ${
                  100 - fadeAmount
                }%, transparent 100%)`
              : `linear-gradient(to right, transparent 0%, black ${fadeAmount}%, black ${
                  100 - fadeAmount
                }%, transparent 100%)`,
          }),
        }}
        onMouseEnter={() => pauseOnHover && setIsPaused(true)}
        onMouseLeave={() => pauseOnHover && setIsPaused(false)}
        {...props}
      >
        <div
          className={cn(
            "marquee-content flex shrink-0",
            isVertical && "flex-col",
            isPaused && "paused"
          )}
        >
          {/* First set of items */}
          {items.map((item, index) => (
            <div
              key={`first-${index}`}
              className={cn("flex shrink-0", isVertical && "w-full")}
            >
              {item}
            </div>
          ))}
          {/* Second set - exact duplicate for seamless infinite loop */}
          {items.map((item, index) => (
            <div
              key={`second-${index}`}
              className={cn("flex shrink-0", isVertical && "w-full")}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
