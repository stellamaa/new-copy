'use client';

export default function CloseButton({ id, className, ariaLabel }) {
  return (
    <button id={id} className={className} type="button" aria-label={ariaLabel}>
      <svg
        classNam6="close-icon-svg"
        width="28"
        height="26"
        viewBox="0 0 26 26"
        aria-hidden="true"
      >
        <line x1="7" y1="7" x2="22" y2="22" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" />
        <line x1="22" y1="7" x2="7" y2="22" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" />
      </svg>
    </button>
  );
}
