# Getting Started with React TypeScript

TypeScript adds static typing to JavaScript, making your React applications more robust and maintainable.

## Why TypeScript with React?

1. **Type Safety**: Catch errors at compile time
2. **Better IDE Support**: Improved autocomplete and refactoring
3. **Self-Documenting**: Types serve as documentation
4. **Easier Refactoring**: Confident changes with type checking

## Basic Setup

```bash
npm create vite@latest my-app -- --template react-ts
```

## Component Example

```typescript
interface ButtonProps {
  label: string;
  onClick: () => void;
}

export function Button({ label, onClick }: ButtonProps) {
  return <button onClick={onClick}>{label}</button>;
}
```

## Best Practices

- Always define props interfaces
- Use union types for limited options
- Leverage generics for reusable components
- Enable strict mode in tsconfig.json

TypeScript may require more upfront work, but it pays off in larger applications.
