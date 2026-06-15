/**
 * Nav
 * Top navigation bar: logo, anchor links, theme toggle, CTA button.
 * The theme toggle logic is wired up in useBloomMotion.
 */
export default function Nav() {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <a className="logo magnetic" href="#top" aria-label="Bloom home">
          <span className="logo-mark">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M12 21c0-5 0-8 3-11M12 21c0-5 0-8-3-11M12 21V10M12 6c0-2 1.5-3 3-3 0 2.5-1 4-3 4Zm0 0c0-2-1.5-3-3-3 0 2.5 1 4 3 4Z"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          Bloom
        </a>

        <div className="nav-links">
          <a className="nav-link" href="#how">How it works</a>
          <a className="nav-link" href="#build">Build a day</a>

          <button
            className="theme-toggle nav-link theme-host"
            id="themeToggle"
            aria-label="Toggle dark mode"
            aria-pressed="false"
          >
            <span className="knob">
              <svg className="ic-sun" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="4.5" fill="currentColor" />
                <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M5 5l1.7 1.7M17.3 17.3 19 19M19 5l-1.7 1.7M6.7 17.3 5 19" />
                </g>
              </svg>
            </span>
          </button>

          <a className="btn btn-primary magnetic" href="#build" data-cta="">
            Get Bloom{' '}
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 12h14m0 0-6-6m6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </nav>
  );
}
