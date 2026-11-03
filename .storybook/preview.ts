import type { Preview } from '@storybook/react';
import React, { useEffect } from 'react';
import { BreakpointProvider } from '../src/hooks/BreakpointProvider';
import '../src/styles/fonts.css';
import '../src/styles/tokens.css';

function ThemeDecorator(
  Story: React.ComponentType,
  context: { globals: { theme?: string } }
) {
  const theme = context.globals.theme ?? 'light';

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.classList.toggle('art-theme-dark', theme === 'dark');
    document.documentElement.classList.toggle('art-theme-light', theme === 'light');
    document.body.style.background = 'var(--color-bg)';
    document.body.style.color = 'var(--color-text-primary)';
  }, [theme]);

  return React.createElement(
    BreakpointProvider,
    null,
    React.createElement(
      'div',
      {
        style: {
          background: 'var(--color-bg)',
          color: 'var(--color-text-primary)',
          minHeight: '100%',
          padding: 8,
        },
      },
      React.createElement(Story)
    )
  );
}

const preview: Preview = {
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Figma semantic theme (Light / Dark)',
      defaultValue: 'light',
      toolbar: {
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [ThemeDecorator],
  parameters: {
    layout: 'padded',
    backgrounds: {
      disable: true,
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
