import type { Preview } from '@storybook/react';
import React from 'react';
import { BreakpointProvider } from '../src/hooks/BreakpointProvider';
import '../src/styles/fonts.css';
import '../src/styles/tokens.css';

const preview: Preview = {
  decorators: [
    (Story) => (
      React.createElement(BreakpointProvider, null, React.createElement(Story))
    ),
  ],
  parameters: {
    layout: 'padded',
    backgrounds: {
      default: 'parchment',
      values: [{ name: 'parchment', value: '#ece4d4' }],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
