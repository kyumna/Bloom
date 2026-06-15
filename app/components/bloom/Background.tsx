/**
 * Background
 * Renders the ambient layer (cursor, gradient blobs, grain texture).
 * All animation is driven by the useBloomMotion hook in BloomApp.
 */
export default function Background() {
  return (
    <>
      {/* Custom cursor — hidden on touch devices via CSS + JS */}
      <div className="cursor" aria-hidden="true" />
      <div className="cursor-ring" aria-hidden="true" />

      {/* Animated gradient blobs */}
      <div className="bg-layer" aria-hidden="true">
        <div className="blob b1" />
        <div className="blob b2" />
        <div className="blob b3" />
        <div className="blob b4" />
      </div>

      {/* Film-grain overlay */}
      <div className="grain" aria-hidden="true" />
    </>
  );
}
