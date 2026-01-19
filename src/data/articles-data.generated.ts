// Auto-generated at build time
import type { ArticleFile } from './articles';

export const articles: ArticleFile[] = [
  {
    "id": "1-edge-computing",
    "title": {
      "en": "Understanding Edge Computing",
      "zh": "理解边缘计算"
    },
    "excerpt": {
      "en": "Edge computing is a distributed computing paradigm that brings computation and data storage closer to the location where it is needed, improving respo...",
      "zh": "边缘计算是一种分布式计算范式，它将计算和数据存储带到更接近需要的地方，从而提高响应时间并节省带宽。..."
    },
    "contentEn": "# Understanding Edge Computing\n\nEdge computing is a distributed computing paradigm that brings computation and data storage closer to the location where it is needed, improving response times and saving bandwidth.\n\n## What is Edge Computing?\n\nIn traditional cloud computing, data is processed in centralized data centers. Edge computing moves some of this processing to the \"edge\" of the network - closer to devices and sensors that generate the data.\n\n## Key Benefits\n\n1. **Low Latency**: Processing data locally reduces transmission time\n2. **Bandwidth Savings**: Only essential data is sent to the cloud\n3. **Improved Reliability**: Can operate offline or with limited connectivity\n4. **Privacy**: Sensitive data can be processed locally\n\n## Use Cases\n\n- **IoT Devices**: Smart sensors and actuators\n- **Autonomous Vehicles**: Real-time decision making\n- **Industrial Automation**: Manufacturing process control\n- **Smart Cities**: Traffic management and monitoring\n\nEdge computing is not about replacing the cloud, but complementing it to create more efficient and responsive systems.\n",
    "contentZh": "# 理解边缘计算\n\n边缘计算是一种分布式计算范式，它将计算和数据存储带到更接近需要的地方，从而提高响应时间并节省带宽。\n\n## 什么是边缘计算？\n\n在传统的云计算中，数据在集中式数据中心处理。边缘计算将部分处理移至网络的\"边缘\"——更接近生成数据的设备和传感器。\n\n## 主要优势\n\n1. **低延迟**：本地处理数据减少传输时间\n2. **节省带宽**：只有重要数据才发送到云端\n3. **提高可靠性**：可以在离线或连接有限的情况下运行\n4. **隐私保护**：敏感数据可以在本地处理\n\n## 应用场景\n\n- **物联网设备**：智能传感器和执行器\n- **自动驾驶**：实时决策制定\n- **工业自动化**：制造过程控制\n- **智慧城市**：交通管理监控\n\n边缘计算不是要取代云，而是与云互补，创建更高效、响应更快的系统。\n",
    "date": "2026-01-19",
    "tags": [
      "Architecture",
      "Cloud",
      "Infrastructure"
    ],
    "readTime": 5
  },
  {
    "id": "2-react-typescript",
    "title": {
      "en": "Getting Started with React TypeScript",
      "zh": "React TypeScript 入门指南"
    },
    "excerpt": {
      "en": "TypeScript adds static typing to JavaScript, making your React applications more robust and maintainable....",
      "zh": "TypeScript 为 JavaScript 添加了静态类型，使你的 React 应用更加健壮和可维护。..."
    },
    "contentEn": "# Getting Started with React TypeScript\n\nTypeScript adds static typing to JavaScript, making your React applications more robust and maintainable.\n\n## Why TypeScript with React?\n\n1. **Type Safety**: Catch errors at compile time\n2. **Better IDE Support**: Improved autocomplete and refactoring\n3. **Self-Documenting**: Types serve as documentation\n4. **Easier Refactoring**: Confident changes with type checking\n\n## Basic Setup\n\n```bash\nnpm create vite@latest my-app -- --template react-ts\n```\n\n## Component Example\n\n```typescript\ninterface ButtonProps {\n  label: string;\n  onClick: () => void;\n}\n\nexport function Button({ label, onClick }: ButtonProps) {\n  return <button onClick={onClick}>{label}</button>;\n}\n```\n\n## Best Practices\n\n- Always define props interfaces\n- Use union types for limited options\n- Leverage generics for reusable components\n- Enable strict mode in tsconfig.json\n\nTypeScript may require more upfront work, but it pays off in larger applications.\n",
    "contentZh": "# React TypeScript 入门指南\n\nTypeScript 为 JavaScript 添加了静态类型，使你的 React 应用更加健壮和可维护。\n\n## 为什么在 React 中使用 TypeScript？\n\n1. **类型安全**：在编译时捕获错误\n2. **更好的 IDE 支持**：改进的自动完成和重构\n3. **自文档化**：类型即文档\n4. **更容易重构**：有类型检查保障的代码变更\n\n## 基础设置\n\n```bash\nnpm create vite@latest my-app -- --template react-ts\n```\n\n## 组件示例\n\n```typescript\ninterface ButtonProps {\n  label: string;\n  onClick: () => void;\n}\n\nexport function Button({ label, onClick }: ButtonProps) {\n  return <button onClick={onClick}>{label}</button>;\n}\n```\n\n## 最佳实践\n\n- 始终定义 props 接口\n- 对有限选项使用联合类型\n- 利用泛型创建可复用组件\n- 在 tsconfig.json 中启用严格模式\n\nTypeScript 可能需要更多前期工作，但在大型应用中回报丰厚。\n",
    "date": "2026-01-18",
    "tags": [
      "React",
      "TypeScript",
      "Frontend"
    ],
    "readTime": 7
  },
  {
    "id": "3-distributed-systems",
    "title": {
      "en": "Distributed Systems Design Patterns",
      "zh": "分布式系统设计模式"
    },
    "excerpt": {
      "en": "Building distributed systems requires understanding common patterns and trade-offs....",
      "zh": "构建分布式系统需要理解常用模式和权衡。..."
    },
    "contentEn": "# Distributed Systems Design Patterns\n\nBuilding distributed systems requires understanding common patterns and trade-offs.\n\n## Key Patterns\n\n### 1. Circuit Breaker\nPrevents cascading failures by stopping requests to failing services.\n\n### 2. Retry with Exponential Backoff\nGradually increase retry intervals to avoid overwhelming the system.\n\n### 3. Event Sourcing\nStore all state changes as a sequence of events.\n\n### 4. CQRS\nSeparate read and write operations for better scalability.\n\n## Challenges\n\n- **Network Failures**: Design for partial failures\n- **Data Consistency**: Handle eventual consistency\n- **Service Discovery**: Dynamic service location\n- **Load Balancing**: Distribute traffic effectively\n\n## Best Practices\n\n- Start simple, add complexity when needed\n- Monitor everything\n- Design for failure\n- Use idempotent operations\n\nDistributed systems are complex, but understanding these patterns helps make informed design decisions.\n",
    "contentZh": "# 分布式系统设计模式\n\n构建分布式系统需要理解常用模式和权衡。\n\n## 核心模式\n\n### 1. 熔断器\n通过停止对失败服务的请求来防止级联故障。\n\n### 2. 指数退避重试\n逐渐增加重试间隔，避免压垮系统。\n\n### 3. 事件溯源\n将所有状态变更存储为事件序列。\n\n### 4. CQRS\n分离读写操作以获得更好的可扩展性。\n\n## 挑战\n\n- **网络故障**：设计时考虑部分故障\n- **数据一致性**：处理最终一致性\n- **服务发现**：动态服务定位\n- **负载均衡**：有效分发流量\n\n## 最佳实践\n\n- 从简单开始，需要时再增加复杂性\n- 监控一切\n- 为失败设计\n- 使用幂等操作\n\n分布式系统很复杂，但理解这些模式有助于做出明智的设计决策。\n",
    "date": "2026-01-17",
    "tags": [
      "Distributed Systems",
      "Architecture",
      "Backend"
    ],
    "readTime": 8
  }
] as any;
