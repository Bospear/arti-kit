import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button/Button';
import { IconButton } from '../Button/IconButton';
import { Tag } from '../Tag/Tag';
import { Card, CardBody, CardFooter, CardHeader } from './Card';
import {
  CampaignCard,
  CharacterCard,
  JournalEntryCard,
  LocationCard,
  MagicItemCard,
  MonsterCard,
  NpcCard,
  QuestCard,
  SessionCard,
  SpellCard,
  WikiArticleCard,
} from './domain';
import { EntityCard } from './EntityCard';

const cover =
  'data:image/svg+xml,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="480" height="240" viewBox="0 0 480 240"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#3d2a1a"/><stop offset="1" stop-color="#914c15"/></linearGradient></defs><rect width="480" height="240" fill="url(#g)"/><text x="24" y="210" fill="#f5efe5" font-family="Georgia,serif" font-size="28">Cover</text></svg>`,
  );

const thumb =
  'data:image/svg+xml,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96"><rect width="96" height="96" rx="8" fill="#526178"/><text x="48" y="54" text-anchor="middle" fill="#f5efe5" font-family="sans-serif" font-size="18">PC</text></svg>`,
  );

const meta = {
  title: 'Artikit/Card',
  component: Card,
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card>
      <CardHeader>Quest notes</CardHeader>
      <CardBody>Standard surface with medium border and soft shadow.</CardBody>
      <CardFooter>
        <Button size="sm" variant="ghost">
          Action
        </Button>
      </CardFooter>
    </Card>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
      <Card>
        <CardHeader>Default</CardHeader>
        <CardBody>Body text</CardBody>
      </Card>
      <Card variant="parchment">
        <CardHeader>Parchment</CardHeader>
        <CardBody>Ruled texture</CardBody>
      </Card>
      <Card variant="crimson">
        <CardHeader>Crimson</CardHeader>
        <CardBody>Accent top</CardBody>
      </Card>
      <Card variant="azure">
        <CardHeader>Azure</CardHeader>
        <CardBody>Accent top</CardBody>
      </Card>
      <Card variant="elevated">
        <CardHeader>Elevated</CardHeader>
        <CardBody>Raised shadow</CardBody>
      </Card>
    </div>
  ),
};

const dens: Array<'compact' | 'detailed'> = ['compact', 'detailed'];
const lays: Array<'vertical' | 'horizontal'> = ['vertical', 'horizontal'];

/** Layout × density × state matrix for the base EntityCard. */
export const BaseMatrix: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 24 }}>
      {lays.map((layout) => (
        <section key={layout}>
          <h3 style={{ margin: '0 0 12px', color: 'var(--color-text-primary)' }}>
            Layout: {layout}
          </h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: 16,
            }}
          >
            {dens.map((density) =>
              (['default', 'hover', 'selected', 'focused'] as const).map((state) => (
                <EntityCard
                  key={`${layout}-${density}-${state}`}
                  layout={layout}
                  density={density}
                  selected={state === 'selected'}
                  coverSrc={layout === 'vertical' ? cover : undefined}
                  thumbnailSrc={layout === 'horizontal' ? thumb : undefined}
                  title={`${density} / ${state}`}
                  description="Description slot for the entity body copy."
                  metadata="Updated 2h ago"
                  status={state === 'default' ? 'Active' : 'Ready'}
                  statusTone={state === 'selected' ? 'success' : 'info'}
                  tags={
                    <>
                      <Tag tone="bark">Tag</Tag>
                      <Tag tone="azure">Slot</Tag>
                    </>
                  }
                  menu={
                    <IconButton
                      aria-label="More"
                      size="sm"
                      variant="ghost"
                      icon={<span aria-hidden>⋯</span>}
                    />
                  }
                  footer={
                    <Button size="sm" variant="secondary">
                      Open
                    </Button>
                  }
                  className={state === 'focused' ? 'art-card--interactive' : undefined}
                  cardProps={
                    state === 'focused'
                      ? { tabIndex: 0, autoFocus: true }
                      : state === 'hover'
                        ? { style: { borderColor: 'var(--color-border-strong)' } }
                        : undefined
                  }
                />
              )),
            )}
          </div>
        </section>
      ))}
    </div>
  ),
};

export const SelectedStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
      <EntityCard title="Default" description="Not selected" />
      <EntityCard title="Selected" description="Border + indicator + check" selected />
      <EntityCard
        title="Selected + actions"
        description="Nested controls stay focusable"
        selected
        menu={
          <IconButton
            aria-label="Menu"
            size="sm"
            variant="ghost"
            icon={<span aria-hidden>⋯</span>}
          />
        }
        footer={
          <Button size="sm" variant="primary">
            Confirm
          </Button>
        }
        onClick={() => undefined}
      />
    </div>
  ),
};

/** Domain card gallery — RPG entity presets. */
export const DomainCards: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: 16,
      }}
    >
      <CampaignCard
        coverSrc={cover}
        title="Curse of Strahd"
        description="Gothic horror in Barovia."
        status="Active"
        statusTone="success"
        tags={
          <>
            <Tag tone="crimson">Horror</Tag>
            <Tag>Level 1–10</Tag>
          </>
        }
        metadata="12 sessions · 5 players"
      />
      <CharacterCard
        thumbnailSrc={thumb}
        title="Elara Moonwhisper"
        subtitle="Ranger 5 · Wood Elf"
        tags={
          <>
            <Tag tone="bark">Party</Tag>
            <Tag tone="azure">Scout</Tag>
          </>
        }
      />
      <NpcCard
        thumbnailSrc={thumb}
        title="Ireena Kolyana"
        subtitle="Noble · Barovia"
        tags={<Tag tone="gold">Ally</Tag>}
      />
      <MonsterCard
        coverSrc={cover}
        challengeRating="5"
        title="Young Blue Dragon"
        description="Lightning breath, lair actions."
      />
      <SpellCard
        icon="✦"
        title="Fireball"
        level="3rd"
        school="Evocation"
      />
      <MagicItemCard
        rarity="Rare"
        title="Cloak of Elvenkind"
        description="Advantage on Stealth while hooded."
      />
      <QuestCard
        status="In progress"
        statusTone="warning"
        title="Find the Sunsword"
        metadata="Given by Ezmerelda · Reward: 500 gp"
      />
      <JournalEntryCard
        title="Night at the Blood of the Vine"
        date="Session 4 · Mar 12"
        description="The party overheard whispers of a Vistana caravan…"
      />
      <LocationCard
        coverSrc={cover}
        title="Castle Ravenloft"
        locationType="Dungeon"
      />
      <SessionCard
        date="Mar 19, 2026"
        title="Session 7 — The Amber Temple"
        summary="Entered the temple; two dark gifts claimed."
      />
      <WikiArticleCard
        title="Dark Powers"
        tags={
          <>
            <Tag tone="crimson">Lore</Tag>
            <Tag tone="steel">Barovia</Tag>
          </>
        }
        excerpt="Mysterious entities that grant gifts at a terrible price."
      />
    </div>
  ),
};
