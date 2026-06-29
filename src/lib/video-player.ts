/**
 * 共享视频播放器逻辑，供 VideoListWrapper.astro 复用。
 */

// ── 工具 ──
export function fmtTime(s: number): string {
  if (!Number.isFinite(s) || s < 0) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

// ── 播放器初始化 ──
export interface PlayerElements {
  wrapper: HTMLElement;
  video: HTMLVideoElement;
  playPauseBtn: Element;
  playIcon: Element;
  pauseIcon: Element;
  progressTrack: HTMLElement;
  progressFill: HTMLElement;
  progressThumb: HTMLElement;
  timeDisplay: Element;
  muteBtn: Element;
  volumeIcon: Element;
  mutedIcon: Element;
  fullscreenBtn: Element;
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

  if (wrapper.dataset.playerInited) return;
  wrapper.dataset.playerInited = "1";

  let scrubbing = false;

  function updateState() {
    const paused = video.paused || video.ended;
    wrapper.classList.toggle("paused", paused);
    wrapper.classList.toggle("ended", video.ended);
    (playIcon as HTMLElement).style.display = paused ? "" : "none";
    (pauseIcon as HTMLElement).style.display = paused ? "none" : "";
    (volumeIcon as HTMLElement).style.display = video.muted ? "none" : "";
    (mutedIcon as HTMLElement).style.display = video.muted ? "" : "none";
  }

  function updateProgress() {
    if (scrubbing) return;
    const dur = video.duration;
    const pct =
      Number.isFinite(dur) && dur > 0 ? (video.currentTime / dur) * 100 : 0;
    if (progressFill) progressFill.style.width = `${pct}%`;
    if (progressThumb) progressThumb.style.left = `${pct}%`;
    timeDisplay.textContent = `${fmtTime(video.currentTime)} / ${fmtTime(dur)}`;
    setProgressBar(progressTrack, pct);
  }

  function seek(e: MouseEvent) {
    const rect = progressTrack.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const dur = video.duration;
    if (Number.isFinite(dur)) video.currentTime = pct * dur;
    if (progressFill) progressFill.style.width = `${pct * 100}%`;
    if (progressThumb) progressThumb.style.left = `${pct * 100}%`;
    setProgressBar(progressTrack, pct * 100);
  }

  video.addEventListener("play", updateState);
  video.addEventListener("pause", updateState);
  video.addEventListener("ended", updateState);
  video.addEventListener("timeupdate", updateProgress);
  video.addEventListener("loadedmetadata", updateProgress);
  video.addEventListener("volumechange", () => {
    (volumeIcon as HTMLElement).style.display = video.muted ? "none" : "";
    (mutedIcon as HTMLElement).style.display = video.muted ? "" : "none";
  });

  wrapper.addEventListener("click", (e) => {
    if ((e.target as HTMLElement).closest(".video-controls")) return;
    if (video.paused) video.play();
    else video.pause();
  });

  playPauseBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (video.paused) video.play();
    else video.pause();
  });

  progressTrack.addEventListener("mousedown", (e) => {
    scrubbing = true;
    wrapper.classList.add("scrubbing");
    seek(e);
    function onScrub(ev: MouseEvent) {
      seek(ev);
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

  muteBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    video.muted = !video.muted;
  });

  fullscreenBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      wrapper.requestFullscreen();
    }
  });

  updateState();
  updateProgress();
}

// ── roughjs 图标绘制 ──
export async function drawIcons() {
  const { default: rough } = await import("roughjs");

  function draw(sel: string, opts: Record<string, any>) {
    document.querySelectorAll<SVGSVGElement>(sel).forEach((svg) => {
      if (svg.dataset.drawn) return;
      svg.dataset.drawn = "1";
      svg.innerHTML = "";
      const rc = rough.svg(svg);
      opts.draw(rc, svg);
    });
  }

  // 大播放三角
  draw(".big-play-svg", {
    draw(rc: any, svg: SVGSVGElement) {
      const cx = 32,
        cy = 32,
        r = 28;
      svg.appendChild(
        rc.circle(cx, cy, r * 2, {
          roughness: 1.2,
          strokeWidth: 1.5,
          stroke: "rgba(255,255,255,0.9)",
          fill: "rgba(0,0,0,0.35)",
          bowing: 1,
        }),
      );
      const s = 12;
      svg.appendChild(
        rc.linearPath(
          [
            [cx - s * 0.45, cy - s * 0.75],
            [cx + s * 0.7, cy],
            [cx - s * 0.45, cy + s * 0.75],
          ],
          {
            roughness: 0.8,
            strokeWidth: 1.5,
            stroke: "rgba(255,255,255,0.95)",
            fill: "rgba(255,255,255,0.2)",
            bowing: 0.5,
          },
        ),
      );
    },
  });

  // 播放
  draw(".play-icon", {
    draw(rc: any, svg: SVGSVGElement) {
      svg.appendChild(
        rc.linearPath(
          [
            [7, 4],
            [7, 20],
            [19, 12],
          ],
          {
            roughness: 0.6,
            strokeWidth: 1.8,
            stroke: "#fff",
            fill: "rgba(255,255,255,0.25)",
            bowing: 0.5,
          },
        ),
      );
    },
  });

  // 暂停
  draw(".pause-icon", {
    draw(rc: any, svg: SVGSVGElement) {
      svg.appendChild(
        rc.rectangle(6, 4, 4, 16, {
          roughness: 0.5,
          strokeWidth: 1.8,
          stroke: "#fff",
          fill: "#fff",
          bowing: 0.3,
        }),
      );
      svg.appendChild(
        rc.rectangle(14, 4, 4, 16, {
          roughness: 0.5,
          strokeWidth: 1.8,
          stroke: "#fff",
          fill: "#fff",
          bowing: 0.3,
        }),
      );
    },
  });

  // 有音量
  draw(".volume-icon", {
    draw(rc: any, svg: SVGSVGElement) {
      svg.appendChild(
        rc.linearPath(
          [
            [3, 8],
            [7, 8],
            [11, 4],
            [11, 20],
            [7, 16],
            [3, 16],
          ],
          {
            roughness: 0.5,
            strokeWidth: 1.6,
            stroke: "#fff",
            fill: "rgba(255,255,255,0.2)",
            bowing: 0.3,
            closePath: false,
          },
        ),
      );
      svg.appendChild(
        rc.curve(
          [
            [15, 9],
            [18, 12],
            [15, 15],
          ],
          {
            roughness: 0.5,
            strokeWidth: 1.2,
            stroke: "#fff",
            fill: "none",
          },
        ),
      );
      svg.appendChild(
        rc.curve(
          [
            [19, 7],
            [21, 12],
            [19, 17],
          ],
          {
            roughness: 0.5,
            strokeWidth: 1.2,
            stroke: "#fff",
            fill: "none",
          },
        ),
      );
    },
  });

  // 静音
  draw(".muted-icon", {
    draw(rc: any, svg: SVGSVGElement) {
      svg.appendChild(
        rc.linearPath(
          [
            [3, 8],
            [7, 8],
            [11, 4],
            [11, 20],
            [7, 16],
            [3, 16],
          ],
          {
            roughness: 0.5,
            strokeWidth: 1.6,
            stroke: "#fff",
            fill: "rgba(255,255,255,0.2)",
            bowing: 0.3,
            closePath: false,
          },
        ),
      );
      svg.appendChild(
        rc.linearPath(
          [
            [17, 9],
            [21, 15],
          ],
          {
            roughness: 0.6,
            strokeWidth: 1.5,
            stroke: "rgba(255,100,100,0.8)",
          },
        ),
      );
      svg.appendChild(
        rc.linearPath(
          [
            [21, 9],
            [17, 15],
          ],
          {
            roughness: 0.6,
            strokeWidth: 1.5,
            stroke: "rgba(255,100,100,0.8)",
          },
        ),
      );
    },
  });

  // 全屏
  draw(".fs-icon", {
    draw(rc: any, svg: SVGSVGElement) {
      svg.appendChild(
        rc.linearPath(
          [
            [5, 5],
            [14, 5],
            [14, 8],
            [8, 8],
            [8, 14],
            [5, 14],
          ],
          {
            roughness: 0.5,
            strokeWidth: 1.6,
            stroke: "#fff",
            fill: "none",
            bowing: 0.3,
          },
        ),
      );
      svg.appendChild(
        rc.linearPath(
          [
            [19, 19],
            [10, 19],
            [10, 16],
            [16, 16],
            [16, 10],
            [19, 10],
          ],
          {
            roughness: 0.5,
            strokeWidth: 1.6,
            stroke: "#fff",
            fill: "none",
            bowing: 0.3,
          },
        ),
      );
    },
  });
}

// ── 手绘进度条 ──
export async function drawProgressBars() {
  await new Promise((r) => requestAnimationFrame(r));
  const { default: rough } = await import("roughjs");

  document.querySelectorAll<HTMLElement>(".progress-track").forEach((track) => {
    if (track.dataset.barDrawn) return;
    track.dataset.barDrawn = "1";

    const svg = track.querySelector(
      ".progress-svg",
    ) as unknown as SVGSVGElement | null;
    if (!svg) return;

    const rc = rough.svg(svg);
    const VH = 40;
    const vb = svg.getAttribute("viewBox")?.split(/\s+/).map(Number) || [
      0, 0, 100, 40,
    ];
    const VW = vb[2] || 100;
    const my = VH / 2;

    // ── 轨道：铅笔般柔和波浪线 ──
    const segs = 20;
    const pts: [number, number][] = [];
    for (let i = 0; i <= segs; i++) {
      const x = (i / segs) * VW;
      // 正弦波 + 微小随机抖动，模拟手绘不完美
      const wave = Math.sin(i * 0.6) * 3 + (Math.random() - 0.5) * 2;
      pts.push([x, my + wave]);
    }
    svg.appendChild(
      rc.linearPath(pts, {
        roughness: 1.2,
        strokeWidth: 2,
        stroke: "rgba(255,255,255,0.3)",
        bowing: 1.5,
      }),
    );

    // ── 填充：有机波浪边缘色块 ──
    const barGroup = svg.querySelector("g[clip-path]");
    if (barGroup) {
      barGroup.innerHTML = "";

      const barH = 16;
      const top = my - barH / 2;
      const seed = (n: number) => {
        const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
        return x - Math.floor(x);
      };

      // 80 条细碎铅笔短线
      for (let i = 0; i < 80; i++) {
        const sx = seed(i * 3) * VW;
        const sy = top + seed(i * 3 + 1) * barH;
        const len = 4 + seed(i * 3 + 2) * 10;
        const angle = (seed(i * 5) - 0.5) * 1.2;
        const ex = sx + Math.cos(angle) * len;
        const ey = sy + Math.sin(angle) * len;
        barGroup.appendChild(
          rc.linearPath(
            [
              [sx, sy],
              [ex, ey],
            ],
            {
              roughness: 0.8,
              strokeWidth: 0.4 + seed(i * 9) * 1.1,
              stroke: `rgba(255,255,255,${(0.15 + seed(i * 7) * 0.35).toFixed(2)})`,
              bowing: 1,
            },
          ),
        );
      }
      // 12 条粗笔触强调
      for (let i = 0; i < 12; i++) {
        const sx = seed(i * 11 + 100) * VW;
        const sy = top + seed(i * 11 + 101) * barH;
        const len = 6 + seed(i * 11 + 102) * 14;
        const ex = sx + (seed(i * 13) - 0.5) * len * 1.5;
        const ey = sy + (seed(i * 13 + 1) - 0.5) * 8;
        barGroup.appendChild(
          rc.linearPath(
            [
              [sx, sy],
              [ex, ey],
            ],
            {
              roughness: 1.2,
              strokeWidth: 0.8 + seed(i * 17) * 1.4,
              stroke: `rgba(255,255,255,${(0.35 + seed(i * 19) * 0.3).toFixed(2)})`,
              bowing: 1.5,
            },
          ),
        );
      }
    }

    // ── 滑块：手绘菱形 ──
    const oldThumb = svg.querySelector(".progress-thumb-rough");
    if (oldThumb) oldThumb.remove();

    const r = 7;
    const thumb = rc.polygon(
      [
        [0, my - r],
        [r, my],
        [0, my + r],
        [-r, my],
      ],
      {
        roughness: 1,
        strokeWidth: 1.2,
        stroke: "#fff",
        fill: "rgba(255,255,255,0.8)",
        bowing: 0.8,
      },
    );
    thumb.setAttribute("class", "progress-thumb-rough");
    svg.appendChild(thumb);

    const clipRect = svg.querySelector(
      "clipPath rect",
    ) as SVGRectElement | null;
    (track as any).__clipRect = clipRect;
    (track as any).__thumb = thumb;
    (track as any).__svgW = VW;
  });
}

export function setProgressBar(track: HTMLElement, pct: number) {
  const clipRect = (track as any).__clipRect as SVGRectElement | undefined;
  const thumb = (track as any).__thumb as SVGGElement | undefined;
  const svgW = (track as any).__svgW as number | undefined;
  if (!clipRect || !thumb || !svgW) return;
  const cx = (pct / 100) * svgW;
  clipRect.setAttribute("width", String(cx));
  thumb.setAttribute("transform", `translate(${cx},0)`);
}
