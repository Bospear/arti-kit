# Artikit (`arti-kit`)

React **19** component library from the **Artificer** design system: tokens, typography (Cinzel + Crimson Text), and accessible UI primitives.

**Repository:** [github.com/Bospear/arti-kit](https://github.com/Bospear/arti-kit)

## Install

```bash
npm install arti-kit
```

From source:

```bash
git clone https://github.com/Bospear/arti-kit.git
cd arti-kit
npm install
npm run build
```

Local file dependency:

```json
"dependencies": {
  "arti-kit": "file:../arti-kit"
}
```

## Usage

```tsx
import {
  Button,
  Banner,
  Card,
  CardHeader,
  CardBody,
  Input,
} from 'arti-kit';
import 'arti-kit/styles.css';
```

The package entry applies **design tokens** (`tokens.css`). For fonts, load Cinzel + Crimson Text (see `src/styles/fonts.css`) or add the Google Fonts link in your app shell.

## Scripts

| Script                    | Description                 |
| ------------------------- | --------------------------- |
| `npm run build`           | ESM library + `.d.ts` + CSS |
| `npm run storybook`       | Storybook on port 6006      |
| `npm run build-storybook` | Static Storybook            |
| `npm test`                | Vitest + Testing Library    |
| `npm run lint`            | Typecheck                   |

## Components

Button, Card (+ header/body/footer), Banner, Input, Textarea, Select, Checkbox (binary + triple), Switch, Badge, Divider, Accordion (compound API), **Logo** (Artificer mark).

### Logo

```tsx
import { Logo, LOGO_SRC } from 'arti-kit';

<Logo size="lg" alt="Artificer Tools" />;
```

The default image is bundled with the library (large PNG). For a separate file, use the published asset or pass `src`:

```tsx
import logoUrl from 'arti-kit/logo.png';
<Logo src={logoUrl} size="md" />;
```

After `npm run build`, `dist/logo.png` is copied for the `./logo.png` export.

## Peer dependencies

- `react` ^19.0.0
- `react-dom` ^19.0.0

## License

MIT — see [LICENSE](./LICENSE).
