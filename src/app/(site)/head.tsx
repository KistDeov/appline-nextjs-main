export default function Head() {
  return (
    <>
  {/* Primary favicon (versioned to force browsers to fetch updated file) */}
  <link rel="icon" href="/favicon-v2.ico" type="image/x-icon" />
  <link rel="shortcut icon" href="/favicon-v2.ico" />

      {/* Fallbacks (keep the image in case you want a separate path) */}
  <link rel="icon" href="/images/icon.ico" />
      <link rel="apple-touch-icon" href="/images/icon.ico" />

      {/* Theme and tile color hints */}
      <meta name="theme-color" content="#000000" />
      <meta name="msapplication-TileColor" content="#000000" />
    </>
  );
}