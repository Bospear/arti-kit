import type { KeyboardEvent, MouseEvent, ReactNode } from 'react';
import { StatusBadge, type StatusBadgeStatus } from '../Tag/Tag';
import {
  Card,
  type CardDensity,
  type CardLayout,
  type CardProps,
  type CardVariant,
} from './Card';

export type EntityCardProps = {
  title: ReactNode;
  description?: ReactNode;
  metadata?: ReactNode;
  status?: ReactNode;
  statusTone?: StatusBadgeStatus;
  tags?: ReactNode;
  coverSrc?: string;
  coverAlt?: string;
  thumbnailSrc?: string;
  thumbnailAlt?: string;
  icon?: ReactNode;
  footer?: ReactNode;
  menu?: ReactNode;
  layout?: CardLayout;
  density?: CardDensity;
  selected?: boolean;
  variant?: CardVariant;
  onClick?: CardProps['onClick'];
  className?: string;
  /** Extra props forwarded to the root Card. */
  cardProps?: Omit<
    CardProps,
    | 'children'
    | 'layout'
    | 'density'
    | 'selected'
    | 'variant'
    | 'onClick'
    | 'className'
  >;
};

function stopNestedActivation(event: MouseEvent | KeyboardEvent) {
  event.stopPropagation();
}

/**
 * Composed card with media, title/description, status, tags, and action slots.
 * Nested footer/menu controls stay independently focusable and do not activate the card.
 */
export function EntityCard({
  title,
  description,
  metadata,
  status,
  statusTone = 'default',
  tags,
  coverSrc,
  coverAlt = '',
  thumbnailSrc,
  thumbnailAlt = '',
  icon,
  footer,
  menu,
  layout = 'vertical',
  density = 'detailed',
  selected = false,
  variant = 'default',
  onClick,
  className = '',
  cardProps,
}: EntityCardProps) {
  const statusNode =
    status == null
      ? null
      : typeof status === 'string' || typeof status === 'number'
        ? <StatusBadge status={statusTone}>{status}</StatusBadge>
        : status;

  const leading =
    thumbnailSrc != null ? (
      <img
        className="art-entity-card__thumb"
        src={thumbnailSrc}
        alt={thumbnailAlt}
      />
    ) : icon != null ? (
      <span className="art-entity-card__icon" aria-hidden={typeof icon !== 'string'}>
        {icon}
      </span>
    ) : null;

  const content = (
    <div className="art-entity-card__main">
      <div className="art-entity-card__top">
        {leading}
        <div className="art-entity-card__heading">
          <div className="art-entity-card__title-row">
            <h3 className="art-entity-card__title">{title}</h3>
            {statusNode != null && (
              <div className="art-entity-card__status">{statusNode}</div>
            )}
            {menu != null && (
              <div
                className="art-entity-card__menu"
                onClick={stopNestedActivation}
                onKeyDown={stopNestedActivation}
              >
                {menu}
              </div>
            )}
          </div>
          {description != null && description !== '' && (
            <p className="art-entity-card__description">{description}</p>
          )}
          {metadata != null && metadata !== '' && (
            <div className="art-entity-card__metadata">{metadata}</div>
          )}
        </div>
      </div>
      {tags != null && <div className="art-entity-card__tags">{tags}</div>}
    </div>
  );

  return (
    <Card
      variant={variant}
      layout={layout}
      density={density}
      selected={selected}
      onClick={onClick}
      className={['art-entity-card', className].filter(Boolean).join(' ')}
      {...cardProps}
    >
      {coverSrc != null && (
        <img className="art-entity-card__cover" src={coverSrc} alt={coverAlt} />
      )}
      {layout === 'horizontal' ? (
        <div className="art-entity-card__media">{content}</div>
      ) : (
        content
      )}
      {footer != null && (
        <div
          className="art-entity-card__footer"
          onClick={stopNestedActivation}
          onKeyDown={stopNestedActivation}
        >
          {footer}
        </div>
      )}
    </Card>
  );
}
