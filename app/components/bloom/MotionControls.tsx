/**
 * MotionControls
 * Floating aside panel that lets visitors tweak animation speed,
 * easing style, and reduced-motion. All event wiring lives in useBloomMotion.
 */
export default function MotionControls() {
  return (
    <aside className="controls" id="controls" aria-label="Motion controls">
      <div className="controls-head">
        <b><span className="led" /> Motion Lab</b>
        <button className="icon-btn" id="ctlCollapse" aria-label="Collapse panel">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true">
            <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="controls-body">
        {/* Speed slider */}
        <div className="ctl">
          <label htmlFor="speed">
            Speed <span className="v" id="speedVal">1.0×</span>
          </label>
          <input
            type="range"
            id="speed"
            min="0.4"
            max="2"
            step="0.1"
            defaultValue="1"
          />
        </div>

        {/* Easing segmented control */}
        <div className="ctl">
          <label>Easing</label>
          <div className="seg" id="easeSeg">
            <button data-ease="bounce" className="on">Bouncy</button>
            <button data-ease="smooth">Smooth</button>
            <button data-ease="snappy">Snappy</button>
          </div>
        </div>

        {/* Reduce-motion toggle */}
        <div className="ctl-toggle">
          Reduce motion
          <button
            className="mini-switch"
            id="reduceSwitch"
            role="switch"
            aria-checked="false"
            aria-label="Reduce motion"
          >
            <span className="ms-knob" />
          </button>
        </div>

        {/* Replay hero animation */}
        <button
          className="btn btn-ghost magnetic"
          id="replayBtn"
          style={{ width: '100%', justifyContent: 'center', padding: '10px', fontSize: '13.5px' }}
        >
          <svg viewBox="0 0 24 24" fill="none" width="16" height="16" aria-hidden="true">
            <path d="M3 12a9 9 0 1 0 3-6.7M3 4v4h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>{' '}
          Replay hero
        </button>
      </div>
    </aside>
  );
}
