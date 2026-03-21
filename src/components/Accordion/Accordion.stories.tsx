import type { Meta, StoryObj } from '@storybook/react';
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from './Accordion';

const meta = {
  title: 'Artikit/Accordion',
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Accordion defaultOpenIds={['1']} style={{ maxWidth: 400 }}>
      <AccordionItem value="1">
        <AccordionTrigger>First section</AccordionTrigger>
        <AccordionPanel>Content for the first panel.</AccordionPanel>
      </AccordionItem>
      <AccordionItem value="2">
        <AccordionTrigger>Second section</AccordionTrigger>
        <AccordionPanel>More content here.</AccordionPanel>
      </AccordionItem>
    </Accordion>
  ),
};

export const Multiple: Story = {
  render: () => (
    <Accordion allowMultiple defaultOpenIds={['a', 'b']} style={{ maxWidth: 400 }}>
      <AccordionItem value="a">
        <AccordionTrigger>Panel A</AccordionTrigger>
        <AccordionPanel>Both A and B start open.</AccordionPanel>
      </AccordionItem>
      <AccordionItem value="b">
        <AccordionTrigger>Panel B</AccordionTrigger>
        <AccordionPanel>Independent toggles.</AccordionPanel>
      </AccordionItem>
    </Accordion>
  ),
};
