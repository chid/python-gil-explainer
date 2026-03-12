import { useEffect, useMemo, useState } from 'react';
import type { SimulationResult } from '../types/simulation';

interface TimelinePlayerProps {
  result: SimulationResult;
  title?: string;
}

export function TimelinePlayer({ result, title }: TimelinePlayerProps): JSX.Element {
  const [index, setIndex] = useState(0);
  const frame = result.frames[Math.min(index, Math.max(0, result.frames.length - 1))];

  useEffect(() => {
    setIndex(0);
  }, [result.model, result.frames.length]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((value) => {
        if (result.frames.length === 0) {
          return 0;
        }
        return (value + 1) % result.frames.length;
      });
    }, 900);

    return () => window.clearInterval(timer);
  }, [result.frames.length]);

  const progress = useMemo(() => {
    if (result.frames.length === 0) {
      return 0;
    }
    return (index / Math.max(1, result.frames.length - 1)) * 100;
  }, [index, result.frames.length]);

  if (!frame) {
    return <p>No frames available.</p>;
  }

  return (
    <article className="timeline-player" aria-live="polite">
      <header>
        <h3>{title ?? 'Execution Timeline'}</h3>
        <p>Tick {frame.tick + 1}</p>
      </header>

      <div className="timeline-bar" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress)}>
        <span style={{ width: `${progress}%` }} />
      </div>

      <div className="thread-row">
        <strong>Running</strong>
        <div className="thread-list">
          {frame.runningThreadIds.map((threadId) => (
            <span key={threadId} className="token token-running">
              {threadId}
            </span>
          ))}
        </div>
      </div>

      <div className="thread-row">
        <strong>Waiting</strong>
        <div className="thread-list">
          {frame.waitingThreadIds.length > 0 ? (
            frame.waitingThreadIds.map((threadId) => (
              <span key={threadId} className="token token-waiting">
                {threadId}
              </span>
            ))
          ) : (
            <span className="token">None</span>
          )}
        </div>
      </div>

      <p className="frame-note">{frame.note}</p>
    </article>
  );
}
