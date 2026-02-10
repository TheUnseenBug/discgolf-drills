type YouTubeEmbedProps = {
  url: string;
  title?: string;
  className?: string;
};

function parseYouTubeUrl(url: string): {
  videoId: string | null;
  start?: number;
} {
  try {
    const parsed = new URL(url);

    let videoId: string | null = null;

    // youtu.be/<id>
    if (parsed.hostname.includes("youtu.be")) {
      videoId = parsed.pathname.slice(1).split("?")[0];
    }

    // youtube.com/watch?v=<id>
    if (!videoId) {
      videoId = parsed.searchParams.get("v");
    }

    // Parse timestamp
    const t = parsed.searchParams.get("t");
    const startParam = parsed.searchParams.get("start");

    let start: number | undefined;

    if (t) {
      // Handle formats like "7m5s", "26s", "2m", "125" (plain seconds)
      const timeStr = t.toLowerCase();

      // Check if it contains 'm' or 'h' (complex format)
      if (timeStr.includes("m") || timeStr.includes("h")) {
        let totalSeconds = 0;

        // Extract hours
        const hoursMatch = timeStr.match(/(\d+)h/);
        if (hoursMatch) {
          totalSeconds += parseInt(hoursMatch[1], 10) * 3600;
        }

        // Extract minutes
        const minutesMatch = timeStr.match(/(\d+)m/);
        if (minutesMatch) {
          totalSeconds += parseInt(minutesMatch[1], 10) * 60;
        }

        // Extract seconds
        const secondsMatch = timeStr.match(/(\d+)s/);
        if (secondsMatch) {
          totalSeconds += parseInt(secondsMatch[1], 10);
        }

        start = totalSeconds;
      } else {
        // Simple format: just "26s" or "26"
        start = parseInt(timeStr.replace("s", ""), 10);
      }
    } else if (startParam) {
      start = parseInt(startParam, 10);
    }

    return { videoId, start };
  } catch {
    return { videoId: null };
  }
}

export function YouTubeEmbed({
  url,
  title = "YouTube video",
  className = "",
}: YouTubeEmbedProps) {
  const { videoId, start } = parseYouTubeUrl(url);

  if (!videoId) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
        Invalid YouTube URL
      </div>
    );
  }

  const embedParams = start ? `?start=${start}` : "";
  const src = `https://www.youtube.com/embed/${videoId}${embedParams}`;

  return (
    <div
      className={`relative w-full overflow-hidden rounded-lg aspect-video ${className}`}
    >
      <iframe
        src={src}
        title={title}
        loading="lazy"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 h-full w-full"
      />
    </div>
  );
}
