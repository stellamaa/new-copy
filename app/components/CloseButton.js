'use client';

export default function CloseButton({ id, className, ariaLabel }) {
  return (
    <button id={id} className={className} type="button" aria-label={ariaLabel}>
      <svg
        className="close-icon-svg"
        width="26"
        height="26"
        viewBox="0 0 26 26"
        aria-hidden="true"
      >
        <line x1="7" y1="7" x2="19" y2="19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="19" y1="7" x2="7" y2="19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </button>
  );
}
