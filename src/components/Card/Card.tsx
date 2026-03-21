import type { HTMLAttributes, ReactNode } from 'react';
import './Card.css';

export type CardVariant = 'default' | 'parchment' | 'crimson' | 'azure' | 'elevated';

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  variant?: CardVariant;
};

export function Card({
  children,
  variant = 'default',
  className = '',
  ...props
}: CardProps) {
  const classes = ['art-card', `art-card--${variant}`, className].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}

export type CardSectionProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function CardHeader({ children, className = '', ...props }: CardSectionProps) {
  return (
    <div className={`art-card__header ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}

export function CardBody({ children, className = '', ...props }: CardSectionProps) {
  return (
    <div className={`art-card__body ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className = '', ...props }: CardSectionProps) {
  return (
    <div className={`art-card__footer ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}
