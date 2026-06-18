import type { Preview } from '@storybook/react-vite';
import '@/index.scss';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'fullscreen',
    backgrounds: {
      default: 'parchment',
      values: [
        { name: 'parchment', value: '#f5f0e8' },
        { name: 'dark', value: '#1a1a2e' },
        { name: 'white', value: '#ffffff' },
      ],
    },
    viewport: {
      viewports: {
        iphone12: {
          name: 'iPhone 12',
          styles: {
            width: '390px',
            height: '844px',
          },
          type: 'mobile',
        },
      },
      defaultViewport: 'iphone12',
    },
  },
};

export default preview;
