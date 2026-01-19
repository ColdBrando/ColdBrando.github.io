export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  tags: string[];
  readTime: number;
}

export const articles: Article[] = [
  {
    id: '1',
    title: 'Understanding Edge Computing',
    excerpt: 'Edge computing brings computation and data storage closer to the location where it is needed...',
    content: `
# Understanding Edge Computing

Edge computing is a distributed computing paradigm that brings computation and data storage closer to the location where it is needed, improving response times and saving bandwidth.

## What is Edge Computing?

In traditional cloud computing, data is processed in centralized data centers. Edge computing moves some of this processing to the "edge" of the network - closer to devices and sensors that generate the data.

## Key Benefits

1. **Low Latency**: Processing data locally reduces transmission time
2. **Bandwidth Savings**: Only essential data is sent to the cloud
3. **Improved Reliability**: Can operate offline or with limited connectivity
4. **Privacy**: Sensitive data can be processed locally

## Use Cases

- **IoT Devices**: Smart sensors and actuators
- **Autonomous Vehicles**: Real-time decision making
- **Industrial Automation**: Manufacturing process control
- **Smart Cities**: Traffic management and monitoring

Edge computing is not about replacing the cloud, but complementing it to create more efficient and responsive systems.
    `,
    date: '2026-01-19',
    tags: ['Architecture', 'Cloud', 'Infrastructure'],
    readTime: 5,
  },
  {
    id: '2',
    title: 'Getting Started with React TypeScript',
    excerpt: 'Learn how to build type-safe React applications using TypeScript...',
    content: `
# Getting Started with React TypeScript

TypeScript adds static typing to JavaScript, making your React applications more robust and maintainable.

## Why TypeScript with React?

1. **Type Safety**: Catch errors at compile time
2. **Better IDE Support**: Improved autocomplete and refactoring
3. **Self-Documenting**: Types serve as documentation
4. **Easier Refactoring**: Confident changes with type checking

## Basic Setup

\`\`\`bash
npm create vite@latest my-app -- --template react-ts
\`\`\`

## Component Example

\`\`\`typescript
interface ButtonProps {
  label: string;
  onClick: () => void;
}

export function Button({ label, onClick }: ButtonProps) {
  return <button onClick={onClick}>{label}</button>;
}
\`\`\`

## Best Practices

- Always define props interfaces
- Use union types for limited options
- Leverage generics for reusable components
- Enable strict mode in tsconfig.json

TypeScript may require more upfront work, but it pays off in larger applications.
    `,
    date: '2026-01-18',
    tags: ['React', 'TypeScript', 'Frontend'],
    readTime: 7,
  },
  {
    id: '3',
    title: 'Distributed Systems Design Patterns',
    excerpt: 'Common patterns for building scalable distributed systems...',
    content: `
# Distributed Systems Design Patterns

Building distributed systems requires understanding common patterns and trade-offs.

## Key Patterns

### 1. Circuit Breaker
Prevents cascading failures by stopping requests to failing services.

### 2. Retry with Exponential Backoff
Gradually increase retry intervals to avoid overwhelming the system.

### 3. Event Sourcing
Store all state changes as a sequence of events.

### 4. CQRS
Separate read and write operations for better scalability.

## Challenges

- **Network Failures**: Design for partial failures
- **Data Consistency**: Handle eventual consistency
- **Service Discovery**: Dynamic service location
- **Load Balancing**: Distribute traffic effectively

## Best Practices

- Start simple, add complexity when needed
- Monitor everything
- Design for failure
- Use idempotent operations

Distributed systems are complex, but understanding these patterns helps make informed design decisions.
    `,
    date: '2026-01-17',
    tags: ['Distributed Systems', 'Architecture', 'Backend'],
    readTime: 8,
  },
];
