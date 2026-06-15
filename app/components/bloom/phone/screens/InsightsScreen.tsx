/** Height ratios for each day's bar (Mon–Sun). Driven by GSAP scaleY. */
const BAR_VALUES = [0.5, 0.8, 0.65, 0.95, 0.7, 0.85, 1] as const;
const DAY_LABELS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'] as const;

/**
 * InsightsScreen
 * Weekly completion chart with mini-stats.
 * Bar scaleY values are animated by useBloomMotion via data-v attributes.
 */
export default function InsightsScreen() {
  return (
    <div
      className="app-screen s-insights"
      data-screen="3"
      style={{ opacity: 0 }}
    >
      <div className="app-h">
        <div className="app-greet">This week</div>
        <div className="app-date">Jun 3–9</div>
      </div>

      {/* Summary stats */}
      <div className="mini-stat-row">
        <div className="mini-stat"><b>94%</b><span>completion</span></div>
        <div className="mini-stat"><b>26</b><span>habits done</span></div>
      </div>

      {/* Bar chart — bars start at scaleY:0 and are driven by GSAP */}
      <div className="bars" id="insightBars" aria-hidden="true">
        {BAR_VALUES.map((v, i) => (
          <div key={i} className="bar" data-v={v} />
        ))}
      </div>

      <div className="bar-lbls" aria-hidden="true">
        {DAY_LABELS.map((d, i) => (
          <span key={i}>{d}</span>
        ))}
      </div>
    </div>
  );
}
