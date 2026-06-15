/** Palette of draggable habit chips */
const HABIT_CHIPS = [
  { label: '💧 Water',    name: 'Water',    color: '--sky'    },
  { label: '📖 Read',     name: 'Read',     color: '--coral'  },
  { label: '🧘 Meditate', name: 'Meditate', color: '--violet' },
  { label: '🚶 Walk',     name: 'Walk',     color: '--lime'   },
  { label: '✏️ Journal',  name: 'Journal',  color: '--sun'    },
  { label: '🤸 Stretch',  name: 'Stretch',  color: '--pink'   },
] as const;

/**
 * BuilderSection
 * Interactive drag-and-drop habit builder.
 * Chip dragging, drop detection, and add/remove animations
 * are all handled by useBloomMotion.
 */
export default function BuilderSection() {
  return (
    <section className="builder wrap" id="build">
      <div className="builder-grid">

        {/* ── Left: copy + chip tray ── */}
        <div className="builder-copy">
          <span
            className="eyebrow"
            style={{ background: 'var(--coral-soft)', color: 'var(--coral)' }}
          >
            <span className="dot" style={{ background: 'var(--coral)' }} /> Try it
          </span>

          <h2 style={{ marginTop: '18px' }}>
            Build your<br />perfect day
          </h2>

          <p>
            Drag a few habits into your routine. Go on — it feels nice.
            (This little sandbox is fully interactive.)
          </p>

          {/* Draggable habit chips */}
          <div className="tray" id="tray">
            {HABIT_CHIPS.map(chip => (
              <div
                key={chip.name}
                className="h-chip"
                data-habit={chip.name}
                data-color={`--${chip.color.replace('--', '')}`}
              >
                <span
                  className="hdot"
                  style={{ background: `var(${chip.color})` }}
                />
                {chip.label}
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: drop zone ── */}
        <div className="dropzone" id="dropzone">
          <div className="dz-title">
            My routine{' '}
            <span className="dz-count" id="dzCount">0 habits</span>
          </div>
          <div className="dropzone-empty" id="dzEmpty">
            Drag habits here ↑
            <br />
            <span style={{ fontSize: '12px', opacity: 0.7 }}>or tap one to add it</span>
          </div>
          {/* Placed habit rows are injected here by useBloomMotion */}
          <div id="placedList" />
        </div>
      </div>
    </section>
  );
}
