interface PlayerElements {
  fullscreenBtn: HTMLButtonElement;
  muteBtn: HTMLButtonElement;
  mutedIcon: SVGSVGElement;
  pauseIcon: SVGSVGElement;
  playIcon: SVGSVGElement;
  playPauseBtn: HTMLButtonElement;
  progressFill: SVGPathElement;
  progressThumb: SVGPolygonElement;
  progressTrack: HTMLElement;
  timeDisplay: HTMLElement;
  video: HTMLVideoElement;
  volumeIcon: SVGSVGElement;
  wrapper: HTMLElement;
}

export function initPlayer(el: PlayerElements) {
  const {
    wrapper,
    video,
    playPauseBtn,
    playIcon,
    pauseIcon,
    progressTrack,
    progressFill,
    progressThumb,
    timeDisplay,
    muteBtn,
    volumeIcon,
    mutedIcon,
    fullscreenBtn,
  } = el;

  if (wrapper.dataset.playerInited) {
    return;
  }
  wrapper.dataset.playerInited = "1";

  let scrubbing = false;

  function togglePlayback() {
    if (video.paused) {
      void video.play().catch(() => undefined);
    } else {
      video.pause();
    }
  }

  function toggleFullscreen() {
    if (document.fullscreenElement) {
      void document.exitFullscreen();
    } else {
      void wrapper.requestFullscreen();
    }
  }

  function updateState() {
    const paused = video.paused || video.ended;
    wrapper.classList.toggle("paused", paused);
    wrapper.classList.toggle("ended", video.ended);
    playIcon.style.display = paused ? "" : "none";
    pauseIcon.style.display = paused ? "none" : "";
    volumeIcon.style.display = video.muted ? "none" : "";
    mutedIcon.style.display = video.muted ? "" : "none";
    playPauseBtn.setAttribute("aria-label", paused ? "播放" : "暂停");
    muteBtn.setAttribute("aria-label", video.muted ? "取消静音" : "静音");
  }

  function updateProgress() {
    if (scrubbing) {
      return;
    }
    const { duration } = video;
    const percent =
      Number.isFinite(duration) && duration > 0
        ? (video.currentTime / duration) * 100
        : 0;
    setProgressBar(progressFill, progressThumb, percent);
    timeDisplay.textContent = `${formatTime(video.currentTime)} / ${formatTime(duration)}`;
  }

  function seek(event: MouseEvent) {
    const rect = progressTrack.getBoundingClientRect();
    if (rect.width <= 0) {
      return;
    }

    const ratio = Math.max(
      0,
      Math.min(1, (event.clientX - rect.left) / rect.width)
    );
    const { duration } = video;
    if (Number.isFinite(duration)) {
      video.currentTime = ratio * duration;
    }
    setProgressBar(progressFill, progressThumb, ratio * 100);
  }

  video.addEventListener("play", updateState);
  video.addEventListener("pause", updateState);
  video.addEventListener("ended", updateState);
  video.addEventListener("timeupdate", updateProgress);
  video.addEventListener("loadedmetadata", updateProgress);
  video.addEventListener("volumechange", () => {
    volumeIcon.style.display = video.muted ? "none" : "";
    mutedIcon.style.display = video.muted ? "" : "none";
  });

  wrapper.addEventListener("click", (event) => {
    if ((event.target as HTMLElement).closest(".video-controls")) {
      return;
    }
    togglePlayback();
  });

  wrapper.addEventListener("keydown", (event) => {
    if (
      event.target !== wrapper ||
      (event.key !== " " && event.key !== "Enter")
    ) {
      return;
    }
    event.preventDefault();
    togglePlayback();
  });

  playPauseBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    togglePlayback();
  });

  progressTrack.addEventListener("mousedown", (event) => {
    scrubbing = true;
    wrapper.classList.add("scrubbing");
    seek(event);

    function onScrub(scrubEvent: MouseEvent) {
      seek(scrubEvent);
    }

    function onScrubEnd() {
      scrubbing = false;
      wrapper.classList.remove("scrubbing");
      document.removeEventListener("mousemove", onScrub);
      document.removeEventListener("mouseup", onScrubEnd);
    }

    document.addEventListener("mousemove", onScrub);
    document.addEventListener("mouseup", onScrubEnd);
  });

  muteBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    video.muted = !video.muted;
  });

  fullscreenBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleFullscreen();
  });

  updateState();
  updateProgress();
}

function setProgressBar(
  fill: SVGPathElement,
  thumb: SVGPolygonElement,
  percent: number
) {
  const value = Math.max(
    0,
    Math.min(100, Number.isFinite(percent) ? percent : 0)
  );
  fill.style.strokeDasharray = `${value} 100`;
  thumb.setAttribute("transform", `translate(${value},0)`);
}

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return "0:00";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
}
