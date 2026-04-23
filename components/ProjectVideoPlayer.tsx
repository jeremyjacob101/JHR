"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type ProjectVideoPlayerProps = {
  src: string;
  poster?: string;
  title: string;
  videoFit?: "cover" | "contain";
};

const formatTime = (seconds: number) => {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${String(secs).padStart(2, "0")}`;
};

export default function ProjectVideoPlayer({
  src,
  poster,
  title,
  videoFit = "cover",
}: ProjectVideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hideControlsTimerRef = useRef<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [areControlsVisible, setAreControlsVisible] = useState(true);

  const queueControlsHide = useCallback((playing: boolean) => {
    if (hideControlsTimerRef.current !== null) {
      window.clearTimeout(hideControlsTimerRef.current);
    }

    if (!playing) return;

    hideControlsTimerRef.current = window.setTimeout(() => {
      setAreControlsVisible(false);
    }, 1200);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const syncState = () => {
      const playing = !video.paused && !video.ended;
      setIsPlaying(playing);
      setIsMuted(video.muted);
      setDuration(video.duration || 0);
      setCurrentTime(video.currentTime || 0);
      if (!playing) {
        setAreControlsVisible(true);
      }
    };

    const onFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    syncState();
    video.addEventListener("play", syncState);
    video.addEventListener("pause", syncState);
    video.addEventListener("volumechange", syncState);
    video.addEventListener("loadedmetadata", syncState);
    video.addEventListener("timeupdate", syncState);
    video.addEventListener("ended", syncState);
    document.addEventListener("fullscreenchange", onFullscreenChange);

    return () => {
      video.removeEventListener("play", syncState);
      video.removeEventListener("pause", syncState);
      video.removeEventListener("volumechange", syncState);
      video.removeEventListener("loadedmetadata", syncState);
      video.removeEventListener("timeupdate", syncState);
      video.removeEventListener("ended", syncState);
      document.removeEventListener("fullscreenchange", onFullscreenChange);
    };
  }, [queueControlsHide]);

  useEffect(() => {
    return () => {
      if (hideControlsTimerRef.current !== null) {
        window.clearTimeout(hideControlsTimerRef.current);
      }
    };
  }, []);

  const showControls = () => {
    setAreControlsVisible(true);
    queueControlsHide(isPlaying);
  };

  const progress = useMemo(() => {
    if (!duration) return 0;
    return Math.min(100, (currentTime / duration) * 100);
  }, [currentTime, duration]);
  const videoFitClass =
    videoFit === "contain" ? "object-contain" : "object-cover";
  const showSeekControls = isFullscreen;

  const togglePlay = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused || video.ended) {
      setAreControlsVisible(true);
      await video.play();
      queueControlsHide(true);
      return;
    }
    video.pause();
    setAreControlsVisible(true);
  }, [queueControlsHide]);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  }, []);

  const toggleFullscreen = useCallback(async () => {
    const container = containerRef.current;
    if (!container) return;

    if (document.fullscreenElement) {
      await document.exitFullscreen();
      return;
    }

    await container.requestFullscreen();
  }, []);

  const onSeek = (value: string) => {
    const video = videoRef.current;
    if (!video || !duration) return;
    const nextTime = (Number(value) / 100) * duration;
    video.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const tagName = target?.tagName?.toLowerCase();
      if (
        tagName === "input" ||
        tagName === "textarea" ||
        target?.isContentEditable
      ) {
        return;
      }

      const key = event.key.toLowerCase();

      if (key === " " || event.code === "Space") {
        event.preventDefault();
        void togglePlay();
        return;
      }

      if (key === "f") {
        event.preventDefault();
        void toggleFullscreen();
        return;
      }

      if (key === "m") {
        event.preventDefault();
        toggleMute();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [toggleFullscreen, toggleMute, togglePlay]);

  return (
    <div
      ref={containerRef}
      className="group relative h-full w-full bg-black"
      onMouseMove={showControls}
      onMouseEnter={showControls}
      onMouseLeave={() => {
        if (isPlaying) setAreControlsVisible(false);
      }}
      onTouchStart={() => {
        setAreControlsVisible(true);
        queueControlsHide(isPlaying);
      }}
    >
      <video
        ref={videoRef}
        className={`absolute inset-0 h-full w-full ${videoFitClass}`}
        playsInline
        preload="metadata"
        poster={poster}
        onClick={() => {
          void togglePlay();
        }}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {!isPlaying ? (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <button
            type="button"
            aria-label="Play video"
            onClick={() => {
              void togglePlay();
            }}
            className="pointer-events-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm transition hover:bg-black/45"
          >
            <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7 fill-current">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        </div>
      ) : null}

      <div
        className={`absolute inset-x-0 bottom-0 p-3 sm:p-4 transition-opacity duration-200 ${
          areControlsVisible ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="rounded-2xl bg-white/14 px-3 py-2 shadow-lg backdrop-blur-md">
          <div className="flex items-center gap-3 text-white">
            <button
              type="button"
              aria-label={isPlaying ? "Pause video" : "Play video"}
              onClick={() => {
                void togglePlay();
              }}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/16 transition hover:bg-white/24"
            >
              {isPlaying ? (
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                  <path d="M7 5h4v14H7zm6 0h4v14h-4z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="ml-0.5 h-5 w-5 fill-current">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            {showSeekControls ? (
              <>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="0.1"
                  value={progress}
                  aria-label="Video progress"
                  onChange={(e) => onSeek(e.target.value)}
                  className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/35 accent-white"
                />

                <div className="shrink-0 text-xs font-medium tabular-nums text-white/90">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>
              </>
            ) : (
              <div className="flex-1" />
            )}

            <button
              type="button"
              aria-label={isMuted ? "Unmute video" : "Mute video"}
              onClick={toggleMute}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/16 transition hover:bg-white/24"
            >
              {isMuted ? (
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                  <path d="M3 9h4l5-4v14l-5-4H3z" />
                  <path d="M14.5 9.5 17 12l-2.5 2.5 1.4 1.4 2.5-2.5 2.5 2.5 1.4-1.4-2.5-2.5 2.5-2.5-1.4-1.4-2.5 2.5-2.5-2.5z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                  <path d="M3 9h4l5-4v14l-5-4H3z" />
                  <path d="M14 9.23v5.54c1.6-.55 2.75-2.07 2.75-3.77S15.6 9.78 14 9.23z" />
                  <path d="M14 5.3v2.06A6.01 6.01 0 0 1 18.5 13 6.01 6.01 0 0 1 14 18.64v2.06A8 8 0 0 0 20.5 13 8 8 0 0 0 14 5.3z" />
                </svg>
              )}
            </button>

            <button
              type="button"
              aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              onClick={() => {
                void toggleFullscreen();
              }}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/16 transition hover:bg-white/24"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                {isFullscreen ? (
                  <path d="M8 16h2v-2H6v4h4v-2H8zm6 0v2h4v-4h-2v2h-2zM8 8h2V6H6v4h2V8zm8 0v2h2V6h-4v2h2z" />
                ) : (
                  <path d="M4 9V4h5v2H6v3zm10-5h5v5h-2V6h-3zM6 14v3h3v2H4v-5zm11 0h2v5h-5v-2h3z" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute left-4 top-4 rounded-full bg-black/25 px-3 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-sm">
        {title}
      </div>
    </div>
  );
}
