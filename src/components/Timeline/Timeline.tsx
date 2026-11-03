import type { HTMLAttributes, ReactNode } from 'react';
import './Timeline.css';

export type TimelineMarkerVariant = 'filled' | 'outline' | 'line';

export type TimelineItem = {
  id: string;
  title: ReactNode;
  description?: ReactNode;
  meta?: ReactNode;
  marker?: TimelineMarkerVariant;
  icon?: ReactNode;
};

export type TimelineProps = HTMLAttributes<HTMLElement> & {
  items: TimelineItem[];
  orientation?: 'vertical' | 'horizontal';
  density?: 'detailed' | 'compact';
  loading?: boolean;
  emptyMessage?: ReactNode;
};

export function TimelineMarker({
  variant = 'filled',
  className = '',
}: {
  variant?: TimelineMarkerVariant;
  className?: string;
}) {
  return (
    <span
      className={`art-timeline__marker art-timeline__marker--${variant}${className ? ` ${className}` : ''}`}
      aria-hidden="true"
    />
  );
}

export function Timeline({
  items,
  orientation = 'vertical',
  density = 'detailed',
  loading = false,
  emptyMessage = 'No events yet',
  className = '',
  ...props
}: TimelineProps) {
  if (loading) {
    return (
      <div
        className={`art-timeline art-timeline--${orientation} art-timeline--${density} art-timeline--loading${className ? ` ${className}` : ''}`}
        aria-busy="true"
        aria-label="Loading timeline"
      >
        {[0, 1, 2].map((i) => (
          <div key={i} className="art-timeline__item art-timeline__item--skeleton">
            <TimelineMarker />
            <div className="art-timeline__content">
              <div className="art-timeline__skeleton-line" />
              <div className="art-timeline__skeleton-line art-timeline__skeleton-line--short" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div
        className={`art-timeline art-timeline--empty${className ? ` ${className}` : ''}`}
        role="status"
      >
        {emptyMessage}
      </div>
    );
  }

  return (
    <ol
      className={`art-timeline art-timeline--${orientation} art-timeline--${density}${className ? ` ${className}` : ''}`}
      {...props}
    >
      {items.map((item) => (
        <li key={item.id} className="art-timeline__item">
          <div className="art-timeline__rail">
            {item.icon ? (
              <span className="art-timeline__icon">{item.icon}</span>
            ) : (
              <TimelineMarker variant={item.marker ?? 'filled'} />
            )}
          </div>
          <div className="art-timeline__content">
            {item.meta && <div className="art-timeline__meta">{item.meta}</div>}
            <div className="art-timeline__title">{item.title}</div>
            {density === 'detailed' && item.description && (
              <div className="art-timeline__description">{item.description}</div>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
