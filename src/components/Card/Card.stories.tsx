import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button/Button';
import { Card, CardBody, CardFooter, CardHeader } from './Card';

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
    </div>
  ),
};
