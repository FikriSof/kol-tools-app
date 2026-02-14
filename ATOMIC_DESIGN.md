# Atomic Design Structure Documentation

## Overview

This project now follows **Atomic Design** methodology, organizing components into five distinct levels for better reusability, maintainability, and scalability.

## Folder Structure

```
src/
├── app/
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                    # Uses HomeTemplate
├── components/
│   ├── atoms/                      # Basic building blocks
│   │   ├── Button.tsx
│   │   ├── Heading.tsx
│   │   ├── Image.tsx
│   │   ├── Link.tsx
│   │   ├── Text.tsx
│   │   └── index.ts               # Barrel exports
│   ├── molecules/                  # Simple combinations
│   │   ├── ButtonGroup.tsx
│   │   ├── Logo.tsx
│   │   └── index.ts
│   ├── organisms/                  # Complex UI sections
│   │   ├── Hero.tsx
│   │   └── index.ts
│   └── templates/                  # Page layouts
│       ├── HomeTemplate.tsx
│       └── index.ts
├── hooks/                          # Custom React hooks (empty)
├── utils/                          # Utility functions (empty)
├── types/                          # TypeScript types (empty)
└── styles/                         # Shared styles (empty)
```

## Component Hierarchy

### Atoms (Basic Building Blocks)

#### Button
- **Path**: `src/components/atoms/Button.tsx`
- **Props**: `variant` (primary | secondary | outline), `children`, standard button props
- **Usage**: Reusable button component with three variants

#### Link
- **Path**: `src/components/atoms/Link.tsx`
- **Props**: `variant` (primary | secondary | outline), `children`, standard anchor props
- **Usage**: Styled link component matching button styles

#### Image
- **Path**: `src/components/atoms/Image.tsx`
- **Props**: All Next.js Image props
- **Usage**: Wrapper around Next.js Image component

#### Heading
- **Path**: `src/components/atoms/Heading.tsx`
- **Props**: `level` (1-6), `children`, standard heading props
- **Usage**: Typography component for headings with consistent styling

#### Text
- **Path**: `src/components/atoms/Text.tsx`
- **Props**: `variant` (large | body | small), `muted`, `children`
- **Usage**: Typography component for body text

### Molecules (Simple Combinations)

#### Logo
- **Path**: `src/components/molecules/Logo.tsx`
- **Composed of**: Image atom
- **Usage**: Next.js logo with dark mode support

#### ButtonGroup
- **Path**: `src/components/molecules/ButtonGroup.tsx`
- **Composed of**: Link atoms + Image atom
- **Usage**: Group of action buttons (Deploy + Documentation)

### Organisms (Complex UI Sections)

#### Hero
- **Path**: `src/components/organisms/Hero.tsx`
- **Composed of**: Logo, Heading, Text, ButtonGroup
- **Usage**: Main hero section for the homepage

### Templates (Page Layouts)

#### HomeTemplate
- **Path**: `src/components/templates/HomeTemplate.tsx`
- **Composed of**: Hero organism
- **Usage**: Complete layout for the home page

## Usage Examples

### Importing Components

```typescript
// Import individual components
import Button from "@/components/atoms/Button";
import { Logo } from "@/components/molecules";

// Import from barrel exports
import { Button, Link, Image } from "@/components/atoms";
import { Hero } from "@/components/organisms";
```

### Using Atoms

```typescript
// Button
<Button variant="primary" onClick={handleClick}>
  Click Me
</Button>

// Heading
<Heading level={1}>Welcome</Heading>

// Text
<Text variant="large" muted>
  This is some descriptive text
</Text>
```

### Building New Components

When creating new components, follow this pattern:

1. **Atoms**: Create in `src/components/atoms/` - single-purpose, reusable
2. **Molecules**: Create in `src/components/molecules/` - combine atoms
3. **Organisms**: Create in `src/components/organisms/` - combine molecules/atoms
4. **Templates**: Create in `src/components/templates/` - page-level layouts
5. **Add to barrel exports**: Update the `index.ts` file in the respective folder

## Benefits

1. **Reusability**: Components can be easily reused across pages
2. **Maintainability**: Clear separation of concerns
3. **Scalability**: Easy to add new components following the same pattern
4. **Testability**: Smaller components are easier to test
5. **Collaboration**: Team members can work on different levels without conflicts
6. **Design System**: Natural foundation for building a design system

## Next Steps

- Add custom hooks in `src/hooks/`
- Add utility functions in `src/utils/`
- Add TypeScript types in `src/types/`
- Add shared styles/theme in `src/styles/`
- Create more organisms (Header, Footer, etc.)
- Build additional templates for other pages
