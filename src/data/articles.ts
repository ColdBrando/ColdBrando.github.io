export interface LocalizedContent {
  en: string;
  zh: string;
}

export interface Article {
  id: string;
  title: LocalizedContent;
  excerpt: LocalizedContent;
  content: LocalizedContent;
  date: string;
  tags: string[];
  readTime: number;
}

export const articles: Article[] = [
  {
    id: '1',
    title: {
      en: 'Understanding Edge Computing',
      zh: '理解边缘计算'
    },
    excerpt: {
      en: 'Edge computing brings computation and data storage closer to the location where it is needed...',
      zh: '边缘计算将计算和数据存储带到更接近需要的地方...'
    },
    content: {
      en: `
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
      zh: `
# 理解边缘计算

边缘计算是一种分布式计算范式，它将计算和数据存储带到更接近需要的地方，从而提高响应时间并节省带宽。

## 什么是边缘计算？

在传统的云计算中，数据在集中式数据中心处理。边缘计算将部分处理移至网络的"边缘"——更接近生成数据的设备和传感器。

## 主要优势

1. **低延迟**：本地处理数据减少传输时间
2. **节省带宽**：只有重要数据才发送到云端
3. **提高可靠性**：可以在离线或连接有限的情况下运行
4. **隐私保护**：敏感数据可以在本地处理

## 应用场景

- **物联网设备**：智能传感器和执行器
- **自动驾驶**：实时决策制定
- **工业自动化**：制造过程控制
- **智慧城市**：交通管理监控

边缘计算不是要取代云，而是与云互补，创建更高效、响应更快的系统。
      `
    },
    date: '2026-01-19',
    tags: ['Architecture', 'Cloud', 'Infrastructure'],
    readTime: 5,
  },
  {
    id: '2',
    title: {
      en: 'Getting Started with React TypeScript',
      zh: 'React TypeScript 入门指南'
    },
    excerpt: {
      en: 'Learn how to build type-safe React applications using TypeScript...',
      zh: '学习如何使用 TypeScript 构建类型安全的 React 应用...'
    },
    content: {
      en: `
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
      zh: `
# React TypeScript 入门指南

TypeScript 为 JavaScript 添加了静态类型，使你的 React 应用更加健壮和可维护。

## 为什么在 React 中使用 TypeScript？

1. **类型安全**：在编译时捕获错误
2. **更好的 IDE 支持**：改进的自动完成和重构
3. **自文档化**：类型即文档
4. **更容易重构**：有类型检查保障的代码变更

## 基础设置

\`\`\`bash
npm create vite@latest my-app -- --template react-ts
\`\`\`

## 组件示例

\`\`\`typescript
interface ButtonProps {
  label: string;
  onClick: () => void;
}

export function Button({ label, onClick }: ButtonProps) {
  return <button onClick={onClick}>{label}</button>;
}
\`\`\`

## 最佳实践

- 始终定义 props 接口
- 对有限选项使用联合类型
- 利用泛型创建可复用组件
- 在 tsconfig.json 中启用严格模式

TypeScript 可能需要更多前期工作，但在大型应用中回报丰厚。
      `
    },
    date: '2026-01-18',
    tags: ['React', 'TypeScript', 'Frontend'],
    readTime: 7,
  },
  {
    id: '3',
    title: {
      en: 'Distributed Systems Design Patterns',
      zh: '分布式系统设计模式'
    },
    excerpt: {
      en: 'Common patterns for building scalable distributed systems...',
      zh: '构建可扩展分布式系统的常用模式...'
    },
    content: {
      en: `
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
      zh: `
# 分布式系统设计模式

构建分布式系统需要理解常用模式和权衡。

## 核心模式

### 1. 熔断器
通过停止对失败服务的请求来防止级联故障。

### 2. 指数退避重试
逐渐增加重试间隔，避免压垮系统。

### 3. 事件溯源
将所有状态变更存储为事件序列。

### 4. CQRS
分离读写操作以获得更好的可扩展性。

## 挑战

- **网络故障**：设计时考虑部分故障
- **数据一致性**：处理最终一致性
- **服务发现**：动态服务定位
- **负载均衡**：有效分发流量

## 最佳实践

- 从简单开始，需要时再增加复杂性
- 监控一切
- 为失败设计
- 使用幂等操作

分布式系统很复杂，但理解这些模式有助于做出明智的设计决策。
      `
    },
    date: '2026-01-17',
    tags: ['Distributed Systems', 'Architecture', 'Backend'],
    readTime: 8,
  },
];

// Helper function to get localized content
export function getLocalizedContent(localizedContent: LocalizedContent, language: string): string {
  return localizedContent[language as keyof LocalizedContent] || localizedContent.en;
}
