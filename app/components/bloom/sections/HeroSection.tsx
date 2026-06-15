import PhoneMockup from '../phone/PhoneMockup';
import TodayScreen from '../phone/screens/TodayScreen';

/**
 * HeroSection
 * Full-viewport hero with animated headline, hero phone mockup,
 * floating chips, stat counters, and scroll cue.
 * All GSAP animations wired in useBloomMotion.
 */
export default function HeroSection() {
  return (
    <section className="hero wrap" id="hero">
      {/* ── Left copy ── */}
      <div className="hero-copy">
        <span className="eyebrow reveal">
          <span className="dot" /> Now blooming · v2.0
        </span>

        <h1 className="hero-title" aria-label="Tiny habits. Big you.">
          <span className="line">
            <span className="word" data-w="">Tiny</span>{' '}
            <span className="word" data-w="">habits.</span>
          </span>
          <span className="line">
            <span className="word accent" data-w="">Big</span>{' '}
            <span className="word" data-w="">you.</span>
          </span>
        </h1>

        <p className="hero-sub reveal">
          The habit app that actually feels good. Check things off, build streaks,
          and watch tiny daily wins grow into a whole new you.
        </p>

        <div className="hero-cta reveal">
          <a className="btn btn-primary magnetic" href="#build" data-cta="">
            Start growing{' '}
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 12h14m0 0-6-6m6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a className="btn btn-ghost magnetic" href="#how">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M8 5v14l11-7z" fill="currentColor" />
            </svg>{' '}
            See it move
          </a>
        </div>

        {/* Stats */}
        <div className="hero-stats">
          <div className="stat reveal">
            <div className="num" data-count="2300000" data-suffix="+">0</div>
            <div className="lbl">habits completed</div>
          </div>
          <div className="stat reveal">
            <div className="num" data-count="180" data-suffix="k">0</div>
            <div className="lbl">daily streaks</div>
          </div>
          <div className="stat reveal">
            <div className="num" data-count="49" data-suffix="★">0</div>
            <div className="lbl">App Store rating ×10</div>
          </div>
        </div>
      </div>

      {/* ── Right stage: phone + floating chips ── */}
      <div className="stage" id="heroStage">
        <PhoneMockup id="heroPhone" tilt>
          <TodayScreen variant="hero" />
        </PhoneMockup>

        {/* Floating notification chips */}
        <div className="chip c1" data-depth="0.06">
          <span className="cic" style={{ background: 'var(--lime)' }}>
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="m5 13 4 4L19 7" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <div>Nice!<small>+1 done</small></div>
        </div>

        <div className="chip c2" data-depth="0.1">
          <span className="cic" style={{ background: 'var(--coral)' }}>
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2c1 3 4 4 4 8a4 4 0 0 1-8 0c0-1 .5-2 1-2.5C9 9 9 7 12 2Z" />
            </svg>
          </span>
          <div>On fire<small>12 days</small></div>
        </div>

        <div className="chip c3" data-depth="0.08">
          <span className="cic" style={{ background: 'var(--violet)' }}>
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 17.3 6.2 21l1.6-6.8L3 9.6l6.9-.6L12 2.5l2.1 6.5 6.9.6-4.8 4.6L17.8 21z" />
            </svg>
          </span>
          <div>Level up<small>Lv. 7</small></div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="scroll-cue" aria-hidden="true">
        <span className="mouse" />scroll
      </div>
    </section>
  );
}
