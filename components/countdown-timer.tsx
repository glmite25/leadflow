'use client';

import { useEffect, useState } from 'react';

// Class date: Saturday July 5, 2026 at 7:00 PM WAT (UTC+1)
const CLASS_DATE = new Date('2026-07-05T19:00:00+01:00');

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(): TimeLeft {
  const diff = CLASS_DATE.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft());
  const [mounted, setMounted] = useState(false);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft());
      // Trigger pulse on every second tick
      setPulse(true);
      setTimeout(() => setPulse(false), 260);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const isOver = timeLeft.days === 0 && timeLeft.hours === 0 &&
    timeLeft.minutes === 0 && timeLeft.seconds === 0;

  if (!mounted) return null;

  return (
    <div className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4">
      {/* Date line */}
      <div className="flex items-center gap-2 mb-3">
        <span className="size-2 rounded-full bg-amber-500 animate-pulse inline-block shrink-0" />
        <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide">
          Saturday, July 5th · 7:00 PM WAT · Google Meet
        </p>
      </div>

      {isOver ? (
        <p className="text-sm font-semibold text-amber-700">The class has started — join now!</p>
      ) : (
        <>
          <p className="text-xs text-amber-600 mb-3">Class starts in:</p>
          <div className="flex items-center gap-3">
            {[
              { value: timeLeft.days, label: 'Days' },
              { value: timeLeft.hours, label: 'Hours' },
              { value: timeLeft.minutes, label: 'Mins' },
              { value: timeLeft.seconds, label: 'Secs', isPulse: true },
            ].map(({ value, label, isPulse }) => (
              <div key={label} className="flex flex-col items-center">
                <span className={`text-2xl font-extrabold text-amber-700 tabular-nums w-10 text-center${isPulse && pulse ? ' tick-pulse' : ''}`}>
                  {String(value).padStart(2, '0')}
                </span>
                <span className="text-[10px] text-amber-500 font-medium uppercase tracking-wide mt-0.5">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
