import type { ReactNode } from 'react';

export interface HabitItemProps {
  /** CSS color value for the icon background, e.g. 'var(--sky)' */
  color: string;
  /** SVG icon element */
  icon: ReactNode;
  /** Primary label */
  name: string;
  /** Secondary label */
  subtitle: string;
  /** Applies the .done class (hero phone first habit) */
  done?: boolean;
  /**
   * Adds data-h="" attribute so the Showcase scroll animation
   * can target and animate each habit row's check state.
   */
  showcaseRow?: boolean;
}

/**
 * HabitItem
 * A single row in the phone's Today screen.
 * Used in both HeroSection (static) and TodayScreen (animated showcase).
 */
export default function HabitItem({ color, icon, name, subtitle, done, showcaseRow }: HabitItemProps) {
  return (
    <div
      className={`habit${done ? ' done' : ''}`}
      {...(showcaseRow ? { 'data-h': '' } : {})}
    >
      <span className="ic" style={{ background: color }}>
        {icon}
      </span>
      <div className="tt">
        <b>{name}</b>
        <span>{subtitle}</span>
      </div>
      <div className="check">
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="m5 13 4 4L19 7"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
