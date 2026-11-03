import type { ReactNode } from 'react';
import { Badge } from '../Badge/Badge';
import { Tag, type TagTone } from '../Tag/Tag';
import { EntityCard, type EntityCardProps } from './EntityCard';

type DomainBase = Omit<EntityCardProps, 'title'> & {
  title: ReactNode;
};

function mergeTags(...parts: Array<ReactNode | undefined>): ReactNode | undefined {
  const nodes = parts.filter((part) => part != null && part !== false && part !== '');
  if (nodes.length === 0) return undefined;
  return <>{nodes}</>;
}

/** Campaign — cover, title, description, status, tags, metadata. */
export type CampaignCardProps = DomainBase;

export function CampaignCard({
  layout = 'vertical',
  density = 'detailed',
  ...props
}: CampaignCardProps) {
  return <EntityCard layout={layout} density={density} {...props} />;
}

/** Character — thumbnail/avatar, title, subtitle (class/level), tags. */
export type CharacterCardProps = DomainBase & {
  /** Class / level line — maps to description when description is omitted. */
  subtitle?: ReactNode;
};

export function CharacterCard({
  subtitle,
  description,
  layout = 'horizontal',
  density = 'compact',
  ...props
}: CharacterCardProps) {
  return (
    <EntityCard
      layout={layout}
      density={density}
      description={description ?? subtitle}
      {...props}
    />
  );
}

/** NPC — similar to character. */
export type NpcCardProps = CharacterCardProps;

export function NpcCard(props: NpcCardProps) {
  return <CharacterCard {...props} />;
}

/** Monster — cover/thumbnail, CR badge, title, description. */
export type MonsterCardProps = DomainBase & {
  challengeRating?: ReactNode;
};

export function MonsterCard({
  challengeRating,
  status,
  layout = 'vertical',
  density = 'detailed',
  ...props
}: MonsterCardProps) {
  const crStatus =
    status ??
    (challengeRating != null ? (
      <Badge variant="solid-crimson" size="sm">
        CR {challengeRating}
      </Badge>
    ) : undefined);

  return (
    <EntityCard layout={layout} density={density} status={crStatus} {...props} />
  );
}

/** Spell — icon, title, level/school tags. */
export type SpellCardProps = DomainBase & {
  level?: ReactNode;
  school?: ReactNode;
  levelTone?: TagTone;
  schoolTone?: TagTone;
};

export function SpellCard({
  level,
  school,
  levelTone = 'azure',
  schoolTone = 'steel',
  tags,
  layout = 'horizontal',
  density = 'compact',
  ...props
}: SpellCardProps) {
  return (
    <EntityCard
      layout={layout}
      density={density}
      tags={mergeTags(
        level != null ? <Tag tone={levelTone}>{level}</Tag> : null,
        school != null ? <Tag tone={schoolTone}>{school}</Tag> : null,
        tags,
      )}
      {...props}
    />
  );
}

/** Magic item — rarity tag, title, description. */
export type MagicItemCardProps = DomainBase & {
  rarity?: ReactNode;
  rarityTone?: TagTone;
};

export function MagicItemCard({
  rarity,
  rarityTone = 'gold',
  tags,
  layout = 'vertical',
  density = 'detailed',
  ...props
}: MagicItemCardProps) {
  return (
    <EntityCard
      layout={layout}
      density={density}
      tags={mergeTags(rarity != null ? <Tag tone={rarityTone}>{rarity}</Tag> : null, tags)}
      {...props}
    />
  );
}

/** Quest — status, title, metadata. */
export type QuestCardProps = DomainBase;

export function QuestCard({
  layout = 'vertical',
  density = 'compact',
  ...props
}: QuestCardProps) {
  return <EntityCard layout={layout} density={density} {...props} />;
}

/** Journal entry — title, metadata date, description excerpt. */
export type JournalEntryCardProps = DomainBase & {
  date?: ReactNode;
};

export function JournalEntryCard({
  date,
  metadata,
  layout = 'vertical',
  density = 'detailed',
  ...props
}: JournalEntryCardProps) {
  return (
    <EntityCard
      layout={layout}
      density={density}
      metadata={metadata ?? date}
      {...props}
    />
  );
}

/** Location — cover, title, type tag. */
export type LocationCardProps = DomainBase & {
  locationType?: ReactNode;
  locationTypeTone?: TagTone;
};

export function LocationCard({
  locationType,
  locationTypeTone = 'bark',
  tags,
  layout = 'vertical',
  density = 'compact',
  ...props
}: LocationCardProps) {
  return (
    <EntityCard
      layout={layout}
      density={density}
      tags={mergeTags(
        locationType != null ? <Tag tone={locationTypeTone}>{locationType}</Tag> : null,
        tags,
      )}
      {...props}
    />
  );
}

/** Session — date metadata, title, summary. */
export type SessionCardProps = DomainBase & {
  date?: ReactNode;
  summary?: ReactNode;
};

export function SessionCard({
  date,
  summary,
  metadata,
  description,
  layout = 'horizontal',
  density = 'compact',
  ...props
}: SessionCardProps) {
  return (
    <EntityCard
      layout={layout}
      density={density}
      metadata={metadata ?? date}
      description={description ?? summary}
      {...props}
    />
  );
}

/** Wiki article — title, tags, excerpt. */
export type WikiArticleCardProps = DomainBase & {
  excerpt?: ReactNode;
};

export function WikiArticleCard({
  excerpt,
  description,
  layout = 'vertical',
  density = 'detailed',
  ...props
}: WikiArticleCardProps) {
  return (
    <EntityCard
      layout={layout}
      density={density}
      description={description ?? excerpt}
      {...props}
    />
  );
}
