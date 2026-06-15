import type { ReactNode } from 'react';

interface PhoneMockupProps {
  /** HTML id applied to the outer .phone element */
  id?: string;
  /** Pass true to add data-tilt attribute (used by hero tilt effect) */
  tilt?: boolean;
  children: ReactNode;
}

/**
 * PhoneMockup
 * Renders the phone chrome (frame, notch, status bar) around its children.
 * The status bar SVG signal icon is shared by both Hero and Showcase phones.
 */
export default function PhoneMockup({ id, tilt, children }: PhoneMockupProps) {
  return (
    <div className="phone" id={id} {...(tilt ? { 'data-tilt': '' } : {})}>
      <div className="screen">
        <div className="screen-status">
          <span>9:41</span>
          <span className="dots">
            <svg width="16" height="11" viewBox="0 0 16 11" fill="currentColor" aria-hidden="true">
              <rect x="0"  y="6"   width="3" height="5"    rx="1" />
              <rect x="4.5" y="3.5" width="3" height="7.5"  rx="1" />
              <rect x="9"  y="1"   width="3" height="10"   rx="1" />
              <rect x="13" y="6"   width="3" height="5"    rx="1" opacity=".4" />
            </svg>
          </span>
        </div>

        {children}
      </div>
    </div>
  );
}
