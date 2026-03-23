'use client';

export default function RegistrationMarks() {
  const positions = [
    'registration-mark--tl',
    'registration-mark--tc',
    'registration-mark--tr',
    'registration-mark--ml',
    'registration-mark--mr',
    'registration-mark--bl',
    'registration-mark--bc',
    'registration-mark--br',
  ];

  return (
    <>
      {positions.map((className) => (
        <div
          key={className}
          className={`registration-mark ${className}`}
          aria-hidden="true"
          style={{ pointerEvents: 'none' }}
        />
      ))}
    </>
  );
}
