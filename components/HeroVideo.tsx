"use client";

import { Button } from "@/components/ui/button";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Phase = "loading" | "playing" | "ended";

type HeroVideoProps = {
  src?: string;
  poster?: string;
  finalImage?: string;
};

export default function HeroVideo({
  src = "/hero-datacenter-v2.mp4",
  poster = "/hero-video-first-v2.webp",
  finalImage = "/hero-datacenter-final.webp",
}: HeroVideoProps = {}) {
  const [phase, setPhase] = useState<Phase>("loading");
  const videoRef = useRef<HTMLVideoElement>(null);
  const endingImageRef = useRef<HTMLImageElement>(null);
  const finishRef = useRef<() => void>(() => {});

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let disposed = false;
    let finishing = false;
    let startupTimer: ReturnType<typeof setTimeout> | undefined;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;

    const finish = async () => {
      if (disposed || finishing) return;
      finishing = true;
      clearTimeout(startupTimer);
      video.pause();
      // Keep the current video frame visible until the high-resolution ending image is decoded.
      try {
        const image = endingImageRef.current;
        if (!image) return;
        await image.decode();
        if (!disposed) setPhase("ended");
      } catch {
        // If the still cannot load, preserve the paused video or its initial poster.
      }
    };
    finishRef.current = () => { void finish(); };

    const onPlaying = () => {
      if (disposed || finishing) return;
      clearTimeout(startupTimer);
      setPhase("playing");
    };
    const onMotionChange = () => { if (reducedMotion.matches) void finish(); };
    video.addEventListener("playing", onPlaying);
    video.addEventListener("ended", finish);
    video.addEventListener("error", finish);
    reducedMotion.addEventListener("change", onMotionChange);

    if (reducedMotion.matches || connection?.saveData) {
      void finish();
    } else {
      // No server-rendered source: reduced-motion/data-saving visitors skip the download.
      video.muted = true;
      video.preload = "auto";
      video.src = src;
      video.load();
      startupTimer = setTimeout(() => { void finish(); }, 10000);
      void video.play().catch(() => { void finish(); });
    }

    return () => {
      disposed = true;
      clearTimeout(startupTimer);
      video.removeEventListener("playing", onPlaying);
      video.removeEventListener("ended", finish);
      video.removeEventListener("error", finish);
      reducedMotion.removeEventListener("change", onMotionChange);
      finishRef.current = () => {};
      video.pause();
      video.removeAttribute("src");
      video.load();
    };
  }, [src, poster, finalImage]);

  return (
    <>
      <div className="hero-video-media" data-phase={phase} aria-hidden="true">
        <Image className="hero-video-poster" src={poster} alt="" fill unoptimized loading="eager" fetchPriority="high" />
        <video ref={videoRef} className="hero-video" muted playsInline preload="none" poster={poster} disablePictureInPicture tabIndex={-1} />
        <Image ref={endingImageRef} className="hero-video-final" src={finalImage} alt="" fill unoptimized loading="eager" fetchPriority="low" />
      </div>
      {phase === "playing" && (
        <Button variant="outline" className="hero-video-skip" type="button" onClick={() => finishRef.current()}>Skip intro</Button>
      )}
    </>
  );
}
