import type { Preview } from '@storybook/react';
import '../src/styles/fonts.css';
import '../src/styles/tokens.css';

const preview: Preview = {
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
