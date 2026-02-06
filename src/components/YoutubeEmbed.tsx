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
      videoId = parsed.pathname.slice(1);
    }

    // youtube.com/watch?v=<id>
    if (!videoId) {
      videoId = parsed.searchParams.get("v");
    }

    // timestamp (?t=26s or ?t=26)
    const t = parsed.searchParams.get("t");
    const start = t ? parseInt(t.replace("s", ""), 10) : undefined;

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

  const src = `https://www.youtube.com/embed/${videoId}${
    start ? `?start=${start}` : ""
  }`;

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
