# My UI Library

## Overview

My UI Library is a collection of reusable UI components built with React and TypeScript. This library aims to provide a set of components that can be easily integrated into any React application.

## Installation

To install the library, use npm or yarn:

```bash
npm install arti-kit
```

or

```bash
yarn add arti-kit
```

## Usage

To use the components in your project, import them as follows:

```tsx
import { Button } from 'arti-kit';
```

### Button Component

The Button component can be used as shown below:

```tsx
<Button label="Click Me" onClick={() => alert('Button clicked!')} />
```

## Development

To start developing and testing the components locally, clone the repository and run:

```bash
npm install
npm run storybook
```

This will start the Storybook server, allowing you to view and interact with the components in isolation.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.