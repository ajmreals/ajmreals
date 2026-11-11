/**
 * Google Analytics 4.
 *
 * Renders nothing unless NEXT_PUBLIC_GA_ID is set, so local and preview runs
 * stay out of the reporting.
 *
 * Deliberately plain <script> tags rather than next/script, and rendered
 * inside <head> from the root layout. next/script's afterInteractive strategy
 * puts the snippet in <body>, which works fine for analytics but fails Search
 * Console's ownership check — it only accepts the tag in <head>, and says so
 * in as many words ("the tracking code on your site is in the wrong location
 * on the page"). Verifying ownership through Analytics is worth more than the
 * loader's marginal scheduling benefit.
 *
 * `async` keeps it off the critical path, which is the part that actually
 * mattered about afterInteractive. This is Google's own documented snippet.
 */
export default function Analytics() {
  const id = process.env.NEXT_PUBLIC_GA_ID;
  if (!id) return null;

  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
      />
      <script
        // Built from our own env var, not user input.
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${id}');`,
        }}
      />
    </>
  );
}
