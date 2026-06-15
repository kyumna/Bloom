import PhoneMockup from '../phone/PhoneMockup';
import TodayScreen from '../phone/screens/TodayScreen';
import CelebrateScreen from '../phone/screens/CelebrateScreen';
import StreakScreen from '../phone/screens/StreakScreen';
import InsightsScreen from '../phone/screens/InsightsScreen';

/**
 * ShowcaseSection
 * Scroll-pinned section with four steps that walk through the Bloom app.
 * The GSAP ScrollTrigger pin + scrub is set up entirely in useBloomMotion.
 */
export default function ShowcaseSection() {
  return (
    <section className="showcase" id="how">
      <div className="section-head wrap">
        <span className="eyebrow">
          <span className="dot" style={{ background: 'var(--violet)' }} /> How it works
        </span>
        <h2>Four taps to a better day</h2>
        <p>Keep scrolling — the app moves with you.</p>
      </div>

      <div className="pin-outer" id="pinOuter">
        <div className="pin-stage wrap">

          {/* ── Left: step copy ── */}
          <div className="pin-copy">
            <Step index={0} tag="Today" headline="Your day, beautifully simple">
              Open Bloom and see exactly what matters today. No clutter, no guilt
              — just a few tiny wins waiting to be tapped.
            </Step>
            <Step index={1} tag="Check it off" headline="Tap. Confetti. Dopamine.">
              Every completed habit pops with a satisfying burst. We made finishing
              feel as good as it should.
            </Step>
            <Step index={2} tag="Streaks" headline="Momentum you can feel">
              Your streak ring fills as the days stack up. Miss a day? A gentle
              freeze keeps the pressure off.
            </Step>
            <Step index={3} tag="Insights" headline="Watch yourself grow">
              Playful weekly insights show how far you&apos;ve come — proof that
              tiny habits really do add up.
            </Step>
          </div>

          {/* ── Center: animated phone ── */}
          <div className="pin-phone-col">
            <PhoneMockup id="pinPhone">
              <TodayScreen variant="showcase" />
              <CelebrateScreen />
              <StreakScreen />
              <InsightsScreen />
            </PhoneMockup>
          </div>

          {/* ── Right: feature bullets ── */}
          <div className="pin-side">
            <div className="step active" data-step="0">
              <FeatureList features={FEATURES[0]} />
            </div>
            <div className="step" data-step="1">
              <FeatureList features={FEATURES[1]} />
            </div>
            <div className="step" data-step="2">
              <FeatureList features={FEATURES[2]} />
            </div>
            <div className="step" data-step="3">
              <FeatureList features={FEATURES[3]} />
            </div>
          </div>
        </div>

        {/* Scroll progress dots */}
        <div className="progress-dots" aria-hidden="true">
          <span className="pd on" /><span className="pd" /><span className="pd" /><span className="pd" />
        </div>
      </div>
    </section>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

interface StepProps {
  index: number;
  tag: string;
  headline: string;
  children: React.ReactNode;
}

function Step({ index, tag, headline, children }: StepProps) {
  return (
    <div className={`step${index === 0 ? ' active' : ''}`} data-step={index}>
      <div className="step-tag">
        <span className="n">{index + 1}</span> {tag}
      </div>
      <h2>{headline}</h2>
      <p>{children}</p>
    </div>
  );
}

interface Feature {
  color: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureList({ features }: { features: Feature[] }) {
  return (
    <div className="feature-list">
      {features.map(f => (
        <div key={f.title} className="fitem">
          <span className="fic" style={{ background: f.color }}>
            {f.icon}
          </span>
          <div>
            <b>{f.title}</b>
            <p>{f.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Feature data ──────────────────────────────────────────────────────────────

const FEATURES: Feature[][] = [
  // Step 0 — Today
  [
    {
      color: 'var(--sky)',
      icon: <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2s6 7 6 11a6 6 0 1 1-12 0c0-4 6-11 6-11Z" /></svg>,
      title: 'Smart defaults',
      description: 'Bloom suggests habits that fit your life.',
    },
    {
      color: 'var(--violet)',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" />
        </svg>
      ),
      title: 'Flexible times',
      description: 'Morning person or night owl, your call.',
    },
  ],
  // Step 1 — Check it off
  [
    {
      color: 'var(--lime)',
      icon: <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m5 13 4 4L19 7" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>,
      title: 'One-tap done',
      description: 'Big satisfying targets, zero friction.',
    },
    {
      color: 'var(--coral)',
      icon: <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2c1 3 4 4 4 8a4 4 0 0 1-8 0c0-1 .5-2 1-2.5C9 9 9 7 12 2Z" /></svg>,
      title: 'Celebrations',
      description: 'Confetti, haptics, the whole party.',
    },
  ],
  // Step 2 — Streaks
  [
    {
      color: 'var(--coral)',
      icon: <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 17.3 6.2 21l1.6-6.8L3 9.6l6.9-.6L12 2.5l2.1 6.5 6.9.6-4.8 4.6L17.8 21z" /></svg>,
      title: 'Streak shields',
      description: 'Two freeze days a month, on us.',
    },
    {
      color: 'var(--violet)',
      icon: <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M5 3v18l7-4 7 4V3z" /></svg>,
      title: 'Milestones',
      description: 'Unlock badges as you stack days.',
    },
  ],
  // Step 3 — Insights
  [
    {
      color: 'var(--sky)',
      icon: <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 19V5M4 19h16M8 16l3-4 3 2 4-6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>,
      title: 'Weekly review',
      description: 'See trends without spreadsheets.',
    },
    {
      color: 'var(--lime)',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 21c0-5 0-8 3-11M12 21c0-5 0-8-3-11M12 21V10" stroke="#fff" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <path d="M12 6c0-2 1.5-3 3-3 0 2.5-1 4-3 4Zm0 0c0-2-1.5-3-3-3 0 2.5 1 4 3 4Z" />
        </svg>
      ),
      title: 'Your garden',
      description: 'Every habit grows a little plant.',
    },
  ],
];
