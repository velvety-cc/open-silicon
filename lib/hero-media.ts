export type HeroVideoSource = {
  src: string;
  type: string;
  width: number;
  height: number;
  bitrate: number;
  framerate: number;
};

// The existing Home encode is already compact. Keep its video bytes unchanged.
export const homeHeroMedia = {
  sources: [{ src: "/hero-datacenter-v2.mp4", type: 'video/mp4; codecs="avc1.640033"', width: 3840, height: 2160, bitrate: 10063708, framerate: 30 }],
  poster: "/hero-video-first-v2.webp",
  posterAvif: "/media/hero/home-poster-v1.avif",
  posterPortraitAvif: "/media/hero/home-poster-portrait-v1.avif",
  finalImage: "/hero-datacenter-final.webp",
  finalImageAvif: "/media/hero/home-final-v1.avif",
  finalPortraitAvif: "/media/hero/home-final-portrait-v1.avif",
};

export const aboutHeroMedia = {
  sources: [
    { src: "/media/hero/about-av1-v1.mp4", type: 'video/mp4; codecs="av01.0.13M.08"', width: 2160, height: 2160, bitrate: 19922605, framerate: 60 },
    { src: "/media/hero/about-hevc-v1.mp4", type: 'video/mp4; codecs="hvc1.1.6.L153.B0"', width: 2160, height: 2160, bitrate: 20801606, framerate: 60 },
    { src: "/approach-intelligence-square-v2.mp4", type: 'video/mp4; codecs="avc1.640034"', width: 2160, height: 2160, bitrate: 30085841, framerate: 60 },
  ],
  poster: "/approach-square-first-v2.webp",
  posterAvif: "/media/hero/about-poster-v1.avif",
  posterPortraitAvif: "/media/hero/about-poster-portrait-v1.avif",
  finalImage: "/approach-square-final-v2.webp",
  finalImageAvif: "/media/hero/about-final-v1.avif",
  finalPortraitAvif: "/media/hero/about-final-portrait-v1.avif",
};

type Decoder = (config: MediaDecodingConfiguration) => Promise<Pick<MediaCapabilitiesDecodingInfo, "supported" | "smooth" | "powerEfficient">>;

export async function getPlayableHeroSources(
  sources: readonly HeroVideoSource[],
  canPlayType: (type: string) => string,
  decodingInfo?: Decoder,
): Promise<HeroVideoSource[]> {
  const playable = sources.filter(source => canPlayType(source.type));
  if (!decodingInfo) return playable;
  const checked = await Promise.all(playable.map(async source => {
    try {
      const { src: _src, type, ...video } = source;
      const capability = await decodingInfo({ type: "file", video: { ...video, contentType: type } });
      return { source, rank: capability.supported ? capability.smooth ? 0 : 1 : 2 };
    } catch {
      // Capability probing is optional; native playback and error recovery remain authoritative.
      return { source, rank: 0 };
    }
  }));
  return checked.filter(item => item.rank < 2).sort((a, b) => a.rank - b.rank || a.source.bitrate - b.source.bitrate).map(item => item.source);
}
