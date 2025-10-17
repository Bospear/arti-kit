#!/usr/bin/env node

import fs from "fs";
import path from "path";

// --- Utility: Convert to PascalCase ---
function toPascalCase(str) {
  return str
    .replace(/[-_]+/g, " ") // replace dashes and underscores with space
    .replace(/\s+(.)(\w*)/g, (_, ch, rest) => ch.toUpperCase() + rest)
    .replace(/^(.)/, (_, ch) => ch.toUpperCase());
}

// --- Get component name from CLI ---
const inputName = process.argv[2];
if (!inputName) {
  console.error("❌ Please provide a component name. Example:");
  console.error("   node create-component.js Button");
  process.exit(1);
}

const componentName = inputName;
const componentNamePascal = toPascalCase(inputName);

// --- Paths ---
const baseDir = path.resolve("src/components", componentName);
const storiesDir = path.join(baseDir, "stories");
const testsDir = path.join(baseDir, "tests");

// --- Create folder structure ---
fs.mkdirSync(baseDir, { recursive: true });
fs.mkdirSync(storiesDir, { recursive: true });
fs.mkdirSync(testsDir, { recursive: true });

// --- File templates ---
const indexTs = `export * from "./${componentName}";\n`;

const componentTsx = `import React from "react";

export interface ${componentNamePascal}Props {
  // define your props here
}

export const ${componentNamePascal}: React.FC<${componentNamePascal}Props> = (props) => {
  return <div>${componentNamePascal} component</div>;
};
`;

const storyTsx = `
import { ${componentNamePascal}, ${componentNamePascal}Props } from "../${componentName}";

export default {
  title: "Components/${componentNamePascal}",
  component: ${componentNamePascal},
};

export const Default = (args: ${componentNamePascal}Props) => <${componentNamePascal} {...args} />;

Default.args = {
};
`;

const testTsx = `import { render, screen } from "@testing-library/react";
import { ${componentNamePascal} } from "../${componentName}";

test("renders ${componentNamePascal}", () => {
  render(<${componentNamePascal} />);
  expect(screen.getByText("${componentNamePascal} component")).toBeInTheDocument();
});
`;

// --- Write files ---
fs.writeFileSync(path.join(baseDir, "index.ts"), indexTs);
fs.writeFileSync(path.join(baseDir, `${componentName}.tsx`), componentTsx);
fs.writeFileSync(path.join(storiesDir, `${componentName}.stories.tsx`), storyTsx);
fs.writeFileSync(path.join(testsDir, `${componentName}.test.tsx`), testTsx);

console.log(`✅ Component "${componentName}" created successfully at ${baseDir}`);
