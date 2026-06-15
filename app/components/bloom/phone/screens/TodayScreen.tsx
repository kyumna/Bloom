import HabitItem from '../HabitItem';

interface TodayScreenProps {
  /**
   * 'hero'     — static display in the hero section; first habit has .done class.
   * 'showcase' — animated showcase screen; habits have data-h for GSAP targeting.
   */
  variant: 'hero' | 'showcase';
}

/**
 * TodayScreen
 * The "Today" view of the Bloom app phone mockup.
 * Shared between the hero parallax phone and the pinned showcase's first screen.
 */
export default function TodayScreen({ variant }: TodayScreenProps) {
  const isShowcase = variant === 'showcase';

  const habits = [
    {
      color: 'var(--sky)',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2s6 7 6 11a6 6 0 1 1-12 0c0-4 6-11 6-11Z" />
        </svg>
      ),
      name: 'Drink water',
      subtitle: '8 glasses',
      done: !isShowcase, // hero only: first item pre-checked
    },
    {
      color: 'var(--coral)',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M5 4h12a2 2 0 0 1 2 2v14l-4-2-4 2-4-2V6a2 2 0 0 1 2-2Z" />
        </svg>
      ),
      name: 'Read 10 pages',
      subtitle: 'Atomic Habits',
    },
    {
      color: 'var(--violet)',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 3a5 5 0 0 1 5 5c0 3-5 8-5 8s-5-5-5-8a5 5 0 0 1 5-5Z" />
          <circle cx="12" cy="8" r="2" fill="#fff" />
        </svg>
      ),
      name: 'Meditate',
      subtitle: '10 minutes',
    },
    {
      color: 'var(--lime)',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M13 3l-2 6h4l-3 12 1-8H9l4-10Z" />
        </svg>
      ),
      name: 'Walk outside',
      subtitle: '5,000 steps',
    },
  ] as const;

  return (
    <div
      className="app-screen s-today"
      {...(isShowcase ? { 'data-screen': '0' } : {})}
    >
      {/* App header */}
      <div className="app-h">
        <div>
          <div className="app-greet">Hey, Mia 👋</div>
          <div className="app-date">Tuesday · June 9</div>
        </div>
        <div className="app-ava">M</div>
      </div>

      {/* Streak pill */}
      <span className="streak-pill">
        <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" aria-hidden="true">
          <path d="M12 2c1 3 4 4 4 8a4 4 0 0 1-8 0c0-1 .5-2 1-2.5C9 9 9 7 12 2Z" />
        </svg>
        12 day streak
      </span>

      {/* Habit list */}
      {habits.map(h => (
        <HabitItem
          key={h.name}
          color={h.color}
          icon={h.icon}
          name={h.name}
          subtitle={h.subtitle}
          done={'done' in h ? h.done : false}
          showcaseRow={isShowcase}
        />
      ))}
    </div>
  );
}
