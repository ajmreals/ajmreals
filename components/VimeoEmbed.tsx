/**
 * Responsive Vimeo player.
 *
 * `loading="lazy"` keeps off-screen players from loading until the visitor
 * scrolls near them — several Vimeo iframes on one page is otherwise a heavy
 * page load. `dnt=1` asks Vimeo not to track the viewer.
 */
export default function VimeoEmbed({
  vimeoId,
  title,
  className = "",
}: {
  vimeoId: string;
  title: string;
  className?: string;
}) {
  const src =
    `https://player.vimeo.com/video/${vimeoId}` +
    "?dnt=1&title=0&byline=0&portrait=0";

  return (
    <div
      className={`relative w-full overflow-hidden rounded-xl bg-[#141414] border border-[#222] ${className}`}
      style={{ aspectRatio: "16 / 9" }}
    >
      <iframe
        src={src}
        title={title}
        loading="lazy"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        // Dark background so a player that fails to load — a mis-set Vimeo
        // privacy setting, say — degrades to a dark box rather than flashing
        // white against the theme.
        style={{ background: "#141414" }}
        className="absolute inset-0 h-full w-full"
      />
    </div>
  );
}
