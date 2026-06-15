/**
 * CtaSection
 * Closing call-to-action with animated counter, headline, and site footer.
 */
export default function CtaSection() {
  return (
    <section className="cta wrap">
      {/* Animated big number — driven by ScrollTrigger counter in useBloomMotion */}
      <div className="big-num" data-count="2300000" data-suffix="+">0</div>
      <div className="big-num-lbl">tiny habits completed and counting</div>

      <h2 style={{ marginTop: '36px' }}>
        Ready to <span className="g">bloom</span>?
      </h2>

      <div className="hero-cta" style={{ justifyContent: 'center', marginTop: '30px' }}>
        <a className="btn btn-primary magnetic" href="#top" data-cta="">
          Get Bloom free{' '}
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M5 12h14m0 0-6-6m6 6-6 6"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>

      <footer className="footer">
        <div className="logo">
          <span
            className="logo-mark"
            style={{ width: '24px', height: '24px', borderRadius: '8px' }}
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M12 21c0-5 0-8 3-11M12 21c0-5 0-8-3-11M12 21V10M12 6c0-2 1.5-3 3-3 0 2.5-1 4-3 4Zm0 0c0-2-1.5-3-3-3 0 2.5 1 4 3 4Z"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>{' '}
          Bloom
        </div>
        <span>Animated with GSAP + Lenis</span>
      </footer>
    </section>
  );
}
