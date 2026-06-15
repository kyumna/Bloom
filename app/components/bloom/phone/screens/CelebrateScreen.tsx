/**
 * CelebrateScreen
 * Shown when all habits are checked off.
 * Confetti <span> elements are injected at runtime by useBloomMotion.
 */
export default function CelebrateScreen() {
  return (
    <div
      className="app-screen s-celebrate"
      data-screen="1"
      style={{ opacity: 0 }}
    >
      <div className="celebrate-core">
        <div className="celebrate-emoji" id="celebrateBadge">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="m5 13 4 4L19 7"
              stroke="#fff"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h3>All done!</h3>
        <p>
          4 of 4 habits complete.
          <br />
          That&apos;s a 12-day streak 🔥
        </p>
      </div>
      {/* Confetti <span> elements are appended here by useBloomMotion */}
    </div>
  );
}
