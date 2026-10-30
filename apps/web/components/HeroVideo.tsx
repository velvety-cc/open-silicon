"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@opensilicon/ui/button";
import { getPlayableHeroSources, homeHeroMedia, type HeroVideoSource } from "@/lib/hero-media";

type Phase = "loading" | "playing" | "ended";
type HeroVideoProps = {
  sources?: readonly HeroVideoSource[];
  poster?: string;
  posterAvif?: string;
  posterPortraitAvif?: string;
  finalImage?: string;
  finalImageAvif?: string;
  finalPortraitAvif?: string;
};
const transparentPixel = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
// The portrait still removes only offscreen side pixels, retaining all 2160 vertical pixels.
const portraitMedia = "(max-width: 760px) and (max-aspect-ratio: 3/5)";

export default function HeroVideo({
  sources = homeHeroMedia.sources,
  poster = homeHeroMedia.poster,
  posterAvif = homeHeroMedia.posterAvif,
  posterPortraitAvif = homeHeroMedia.posterPortraitAvif,
  finalImage = homeHeroMedia.finalImage,
  finalImageAvif = homeHeroMedia.finalImageAvif,
  finalPortraitAvif = homeHeroMedia.finalPortraitAvif,
}: HeroVideoProps = {}) {
  const [phase, setPhase] = useState<Phase>("loading");
  const [finalRequested, setFinalRequested] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const endingImageRef = useRef<HTMLImageElement>(null);
  const finalDecoded = useRef(false);
  const finishRef = useRef<() => void>(() => {});
  const completeRef = useRef<() => void>(() => {});

  const decodeFinal = useCallback(async () => {
    const image = endingImageRef.current;
    if (!image || image.naturalWidth <= 1) return;
    try {
      await image.decode();
      finalDecoded.current = true;
      completeRef.current();
    } catch {
      // Preserve the paused video/poster when the ending still cannot decode.
    }
  }, []);

  useEffect(() => {
    if (finalRequested) void decodeFinal();
  }, [finalRequested, finalImage, finalImageAvif, finalPortraitAvif, decodeFinal]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let disposed = false;
    let finishing = false;
    let completed = false;
    let candidateIndex = -1;
    let candidates: readonly HeroVideoSource[] = [];
    let startupTimer: ReturnType<typeof setTimeout> | undefined;
    let releaseTimer: ReturnType<typeof setTimeout> | undefined;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;

    const release = () => {
      video.pause();
      video.removeAttribute("src");
      video.load();
    };
    const complete = () => {
      if (disposed || !finishing || completed || !finalDecoded.current) return;
      completed = true;
      setPhase("ended");
      // Let the still fade over the held video frame before cancelling further buffering.
      releaseTimer = setTimeout(release, 450);
    };
    completeRef.current = complete;
    const finish = () => {
      if (disposed || finishing) return;
      finishing = true;
      clearTimeout(startupTimer);
      video.pause();
      setFinalRequested(true);
      complete();
    };
    finishRef.current = finish;
    const onPlaying = () => {
      if (disposed || finishing) return;
      clearTimeout(startupTimer);
      setPhase("playing");
    };
    const prepareFinal = () => {
      if (video.duration - video.currentTime <= 3) setFinalRequested(true);
    };
    const attempt = (index: number) => {
      if (disposed || finishing) return;
      candidateIndex = index;
      if (!candidates[index]) { finish(); return; }
      video.muted = true;
      video.preload = "auto";
      video.src = candidates[index].src;
      video.load();
      void video.play().catch((error: unknown) => {
        if (disposed || finishing || candidateIndex !== index) return;
        if (error instanceof DOMException && error.name === "NotAllowedError") finish();
        else attempt(index + 1);
      });
    };
    const onError = () => { if (video.error) attempt(candidateIndex + 1); };
    const onMotionChange = () => { if (reducedMotion.matches) finish(); };
    video.addEventListener("playing", onPlaying);
    video.addEventListener("timeupdate", prepareFinal);
    video.addEventListener("ended", finish);
    video.addEventListener("error", onError);
    reducedMotion.addEventListener("change", onMotionChange);

    if (reducedMotion.matches || connection?.saveData) {
      finish();
    } else {
      // No SSR video URL: motion/data-saving visitors never start a video request.
      startupTimer = setTimeout(finish, 10000);
      const decodingInfo = navigator.mediaCapabilities?.decodingInfo?.bind(navigator.mediaCapabilities);
      void getPlayableHeroSources(sources, type => video.canPlayType(type), decodingInfo).then(selected => {
        candidates = selected;
        attempt(0);
      }).catch(finish);
    }

    return () => {
      disposed = true;
      clearTimeout(startupTimer);
      clearTimeout(releaseTimer);
      video.removeEventListener("playing", onPlaying);
      video.removeEventListener("timeupdate", prepareFinal);
      video.removeEventListener("ended", finish);
      video.removeEventListener("error", onError);
      reducedMotion.removeEventListener("change", onMotionChange);
      finishRef.current = () => {};
      completeRef.current = () => {};
      release();
    };
  }, [sources]);

  return (
    <>
      <div className="hero-video-media" data-phase={phase} aria-hidden="true">
        <picture>
          <source srcSet={transparentPixel} media="(prefers-reduced-motion: reduce)" />
          {posterPortraitAvif && <source srcSet={posterPortraitAvif} type="image/avif" media={portraitMedia} />}
          {posterAvif && <source srcSet={posterAvif} type="image/avif" />}
          <Image className="hero-video-poster" src={poster} alt="" fill unoptimized loading="eager" fetchPriority="high" />
        </picture>
        <video ref={videoRef} className="hero-video" muted playsInline preload="none" disablePictureInPicture tabIndex={-1} />
        <picture>
          {finalPortraitAvif && <source srcSet={finalPortraitAvif} type="image/avif" media={finalRequested ? portraitMedia : `(prefers-reduced-motion: reduce) and ${portraitMedia}`} />}
          {finalImageAvif && <source srcSet={finalImageAvif} type="image/avif" media={finalRequested ? undefined : "(prefers-reduced-motion: reduce)"} />}
          {!finalRequested && <source srcSet={finalImage} media="(prefers-reduced-motion: reduce)" />}
          <Image ref={endingImageRef} className="hero-video-final" src={finalRequested ? finalImage : transparentPixel} alt="" fill unoptimized loading="eager" fetchPriority="low" onLoad={() => { void decodeFinal(); }} />
        </picture>
      </div>
      {phase === "playing" && <Button variant="outline" className="hero-video-skip" type="button" onClick={() => finishRef.current()}>Skip intro</Button>}
    </>
  );
}
