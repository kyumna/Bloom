/**
 * StreakScreen
 * Displays the circular streak ring and week-day dots.
 * The ring fill and counter are animated by useBloomMotion via
 * #ringFill (strokeDashoffset) and #ringNum (textContent).
 */
export default function StreakScreen() {
  return (
    <div
      className="app-screen s-streak"
      data-screen="2"
      style={{ opacity: 0 }}
    >
      <div className="app-h">
        <div className="app-greet">Streak</div>
        <span className="streak-pill" style={{ background: 'var(--violet)' }}>
          <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13" aria-hidden="true">
            <path d="M12 17.3 6.2 21l1.6-6.8L3 9.6l6.9-.6L12 2.5l2.1 6.5 6.9.6-4.8 4.6L17.8 21z" />
          </svg>{' '}
          Personal best
        </span>
      </div>

      <div className="ring-wrap">
        <div className="ring">
          <svg width="168" height="168" viewBox="0 0 168 168" aria-hidden="true">
            {/* Track */}
            <circle
              cx="84" cy="84" r="74"
              fill="none"
              stroke="var(--line)"
              strokeWidth="14"
            />
            {/* Animated fill — strokeDashoffset driven by GSAP */}
            <circle
              id="ringFill"
              cx="84" cy="84" r="74"
              fill="none"
              stroke="var(--coral)"
              strokeWidth="14"
              strokeLinecap="round"
              strokeDasharray="465"
              strokeDashoffset="465"
            />
          </svg>
          <div className="ring-num">
            <div>
              {/* Counter value injected by GSAP */}
              <b id="ringNum">0</b>
              <span>day streak</span>
            </div>
          </div>
        </div>

        {/* Day-of-week progress dots */}
        <div className="week-dots">
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
            <span key={i} className={`wd${i < 5 ? ' on' : ''}`}>
              {day}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
