export default function Head() {
  return (
    <>
      {/* Primary favicon (browsers and Google often request /favicon.ico) */}
      <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      <link rel="shortcut icon" href="/favicon.ico" />

      {/* Fallbacks (keep the image in case you want a separate path) */}
      <link rel="icon" href="/images/icon.ico" />
      <link rel="apple-touch-icon" href="/images/icon.ico" />

      {/* Theme and tile color hints */}
      <meta name="theme-color" content="#000000" />
      <meta name="msapplication-TileColor" content="#000000" />
    </>
  );
}