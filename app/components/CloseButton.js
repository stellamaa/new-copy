'use client';

export default function CloseButton({ id, className, ariaLabel }) {
  return (
    <button id={id} className={className} type="button" aria-label={ariaLabel}>
      <img src="/assets/close-icon.png" alt="" className="close-icon-img" aria-hidden="true" />
    </button>
  );
}
