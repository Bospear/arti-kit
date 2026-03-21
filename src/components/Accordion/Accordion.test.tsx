import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from './Accordion';

describe('Accordion', () => {
  it('opens default section and toggles', async () => {
    const user = userEvent.setup();
    render(
      <Accordion defaultOpenIds={['a']}>
        <AccordionItem value="a">
          <AccordionTrigger>Section A</AccordionTrigger>
          <AccordionPanel>Content A</AccordionPanel>
        </AccordionItem>
        <AccordionItem value="b">
          <AccordionTrigger>Section B</AccordionTrigger>
          <AccordionPanel>Content B</AccordionPanel>
        </AccordionItem>
      </Accordion>
    );

    expect(screen.getByRole('button', { name: /section a/i })).toHaveAttribute(
      'aria-expanded',
      'true'
    );
    expect(screen.getByText('Content A')).toBeVisible();

    await user.click(screen.getByRole('button', { name: /section a/i }));
    expect(screen.getByRole('button', { name: /section a/i })).toHaveAttribute(
      'aria-expanded',
      'false'
    );
  });

  it('switches single-open panel', async () => {
    const user = userEvent.setup();
    render(
      <Accordion defaultOpenIds={['x']}>
        <AccordionItem value="x">
          <AccordionTrigger>One</AccordionTrigger>
          <AccordionPanel>Panel one</AccordionPanel>
        </AccordionItem>
        <AccordionItem value="y">
          <AccordionTrigger>Two</AccordionTrigger>
          <AccordionPanel>Panel two</AccordionPanel>
        </AccordionItem>
      </Accordion>
    );

    await user.click(screen.getByRole('button', { name: /^two$/i }));
    expect(screen.getByRole('button', { name: /^one$/i })).toHaveAttribute(
      'aria-expanded',
      'false'
    );
    expect(screen.getByRole('button', { name: /^two$/i })).toHaveAttribute(
      'aria-expanded',
      'true'
    );
  });
});
