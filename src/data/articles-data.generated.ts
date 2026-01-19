// Auto-generated at build time
import type { ArticleFile } from './articles';

export const articles: ArticleFile[] = [
  {
    "id": "4-dda-architecture",
    "title": {
      "en": "DDD Architecture in Practice: Memory Storage + Proto vs Room",
      "zh": "DDD 架构实践：内存存储 + Proto 替代 Room"
    },
    "excerpt": {
      "en": "In our previous project, we adopted a unique data storage approach: instead of using Room database, we used in-memory storage with Protocol Buffers. T...",
      "zh": "在之前的项目中，我们采用了一种独特的数据存储方案：不使用 Room 数据库，而是采用内存存储 + Protocol Buffers。本文将分享这一架构设计的思路和实践经验。..."
    },
    "contentEn": "# DDD Architecture in Practice: Memory Storage + Proto vs Room\n\nIn our previous project, we adopted a unique data storage approach: instead of using Room database, we used in-memory storage with Protocol Buffers. This article shares the rationale and practical experience behind this architectural decision.\n\n## Background\n\nIn Android development, Room is Google's recommended standard database solution. However, in our scenario, we chose a different path. This decision wasn't made on a whim; it was based on a comprehensive consideration of business characteristics and technical requirements.\n\n## Why Not Room?\n\n### 1. Performance Considerations\n\nWhile Room is powerful, it has performance bottlenecks in high-frequency read-write scenarios:\n- Database I/O operations are relatively time-consuming\n- SQL parsing overhead\n- Cross-process communication costs\n\nOur application requires frequent data read-write operations, and in-memory storage provides better performance.\n\n### 2. Data Structure Characteristics\n\nOur data has these features:\n- Relatively small data size (few MBs)\n- Highly structured with stable Schema\n- No complex query requirements\n\nFor this type of scenario, memory + Proto is more suitable.\n\n### 3. Offline-First Architecture\n\nThe application needs to support complete offline operation:\n- Load all data into memory at startup\n- All operations happen in memory during runtime\n- Periodically serialize to local storage\n\nIn this mode, databases provide limited value.\n\n## Architecture Design\n\n### Core Concept\n\n```\n┌─────────────────────────────────────────┐\n│         Memory Data Layer (Cache)         │\n├─────────────────────────────────────────┤\n│  Protocol Buffers (Serialize/Deserialize) │\n├─────────────────────────────────────────┤\n│  File Storage (Persistence)               │\n└─────────────────────────────────────────┘\n```\n\n### Data Flow\n\n```\nStartup → Load Proto Files → Deserialize to Memory → Business Operations\n                                                ↓\n                                          Periodic Serialize → Save to File\n```\n\n## Implementation Details\n\n### 1. Define Proto Schema\n\n```protobuf\nmessage User {\n  string id = 1;\n  string name = 2;\n  string email = 3;\n  repeated string tags = 4;\n}\n\nmessage UserList {\n  repeated User users = 1;\n  int64 last_updated = 2;\n}\n```\n\n### 2. Memory Cache Management\n\n```kotlin\nobject DataManager {\n  private var userList: UserList? = null\n\n  suspend fun loadUsers(): UserList {\n    return userList ?: loadFromFile().also { userList = it }\n  }\n\n  suspend fun saveUsers(users: UserList) {\n    userList = users\n    saveToFile(users)\n  }\n}\n```\n\n### 3. Data Persistence\n\n```kotlin\nclass FileRepository {\n  fun saveToFile(data: UserList) {\n    val bytes = data.toByteArray()\n    context.openFileOutput(FILE_NAME, Context.MODE_PRIVATE).use {\n      it.write(bytes)\n    }\n  }\n\n  fun loadFromFile(): UserList? {\n    return try {\n      context.openFileInput(FILE_NAME).use { stream ->\n        UserList.parseFrom(stream)\n      }\n    } catch (e: Exception) {\n      null\n    }\n  }\n}\n```\n\n## Advantages Summary\n\n### Performance Benefits\n\n- **Read/Write Speed**: Memory operations are 10-100x faster than database\n- **Startup Time**: Preload all data, no runtime I/O\n- **Responsiveness**: No UI lag\n\n### Development Benefits\n\n- **Type Safety**: Proto generates strongly-typed data classes\n- **Version Compatibility**: Proto natively supports forward compatibility\n- **Debug Friendly**: Memory data can be directly inspected\n\n### Business Benefits\n\n- **Offline-First**: Complete offline support\n- **Data Consistency**: Single source of truth, no sync issues\n- **Fast Iteration**: Schema changes only require updating Proto\n\n## Caveats\n\n### 1. Data Size Control\n\n- Regularly clean up unused data\n- Compress large fields\n- Consider modular storage\n\n### 2. Memory Management\n\n```kotlin\n// Release unnecessary data promptly\nfun clearCache() {\n  userList = null\n  System.gc()\n}\n```\n\n### 3. Exception Handling\n\n```kotlin\nfun safeLoad(): UserList? {\n  return try {\n    loadFromFile()\n  } catch (e: Exception) {\n    // Fallback handling\n    loadDefaultData()\n  }\n}\n```\n\n## Use Cases\n\nThis architecture is suitable for:\n\n✅ **Small Data** (< 50MB)\n✅ **Stable Structure**, infrequent Schema changes\n✅ **Offline-First** applications\n✅ **Performance-Sensitive** scenarios\n\nNot suitable for:\n\n❌ Large Data (> 100MB)\n❌ Complex Query Requirements\n❌ Multi-Process Concurrent Writes\n\n## Conclusion\n\nWhen choosing a technical solution, don't blindly follow \"best practices.\" Room is excellent, but in specific scenarios, Memory + Proto might be the better choice.\n\nThe key is to deeply understand your business requirements and technical constraints, then choose the solution that fits best, not the most popular one.\n\nOur practice proves this point: the system runs stably with excellent performance and high development efficiency. This is good architecture design.\n",
    "contentZh": "# DDD 架构实践：内存存储 + Proto 替代 Room\n\n在之前的项目中，我们采用了一种独特的数据存储方案：不使用 Room 数据库，而是采用内存存储 + Protocol Buffers。本文将分享这一架构设计的思路和实践经验。\n\n## 背景\n\n在 Android 开发中，Room 是 Google 推荐的标准数据库解决方案。但在我们的场景中，选择了不同的路径。这个决策并非一时兴起，而是基于业务特性和技术需求的综合考量。\n\n## 为什么不用 Room？\n\n### 1. 性能考虑\n\nRoom 虽然功能强大，但在高频读写场景下存在性能瓶颈：\n- 数据库 I/O 操作相对耗时\n- SQL 解析开销\n- 跨进程通信成本\n\n我们的应用需要频繁读写数据，内存存储能提供更好的性能表现。\n\n### 2. 数据结构特点\n\n我们的数据具有以下特征：\n- 数据量相对较小（几 MB 级别）\n- 结构化程度高，Schema 稳定\n- 不需要复杂的查询操作\n\n对于这种场景，内存存储 + Proto 更为合适。\n\n### 3. 离线优先架构\n\n应用需要支持完全离线工作：\n- 启动时加载所有数据到内存\n- 运行期间所有操作在内存进行\n- 定期序列化到本地存储\n\n这种模式下，数据库的价值有限。\n\n## 架构设计\n\n### 核心思想\n\n```\n┌─────────────────────────────────────────┐\n│         内存数据层（Cache Layer）        │\n├─────────────────────────────────────────┤\n│  Protocol Buffers (序列化/反序列化)      │\n├─────────────────────────────────────────┤\n│  文件存储（File Persistence）            │\n└─────────────────────────────────────────┘\n```\n\n### 数据流\n\n```\n启动 → 加载 Proto 文件 → 反序列化到内存 → 业务操作\n                                      ↓\n                                   定期序列化 → 保存到文件\n```\n\n## 实现细节\n\n### 1. 定义 Proto Schema\n\n```protobuf\nmessage User {\n  string id = 1;\n  string name = 2;\n  string email = 3;\n  repeated string tags = 4;\n}\n\nmessage UserList {\n  repeated User users = 1;\n  int64 last_updated = 2;\n}\n```\n\n### 2. 内存缓存管理\n\n```kotlin\nobject DataManager {\n  private var userList: UserList? = null\n\n  suspend fun loadUsers(): UserList {\n    return userList ?: loadFromFile().also { userList = it }\n  }\n\n  suspend fun saveUsers(users: UserList) {\n    userList = users\n    saveToFile(users)\n  }\n}\n```\n\n### 3. 数据持久化\n\n```kotlin\nclass FileRepository {\n  fun saveToFile(data: UserList) {\n    val bytes = data.toByteArray()\n    context.openFileOutput(FILE_NAME, Context.MODE_PRIVATE).use {\n      it.write(bytes)\n    }\n  }\n\n  fun loadFromFile(): UserList? {\n    return try {\n      context.openFileInput(FILE_NAME).use { stream ->\n        UserList.parseFrom(stream)\n      }\n    } catch (e: Exception) {\n      null\n    }\n  }\n}\n```\n\n## 优势总结\n\n### 性能优势\n\n- **读写速度**：内存操作比数据库快 10-100 倍\n- **启动时间**：预加载所有数据，运行时无 I/O\n- **响应性**：UI 操作无卡顿\n\n### 开发优势\n\n- **类型安全**：Proto 生成强类型数据类\n- **版本兼容**：Proto 天生支持向前兼容\n- **调试友好**：内存数据可直接查看\n\n### 业务优势\n\n- **离线优先**：完全支持离线工作\n- **数据一致性**：单一数据源，无同步问题\n- **快速迭代**：Schema 变更只需更新 Proto\n\n## 注意事项\n\n### 1. 数据大小控制\n\n- 定期清理无用数据\n- 压缩存储大字段\n- 考虑分模块存储\n\n### 2. 内存管理\n\n```kotlin\n// 及时释放不需要的数据\nfun clearCache() {\n  userList = null\n  System.gc()\n}\n```\n\n### 3. 异常处理\n\n```kotlin\nfun safeLoad(): UserList? {\n  return try {\n    loadFromFile()\n  } catch (e: Exception) {\n    // 降级处理\n    loadDefaultData()\n  }\n}\n```\n\n## 适用场景\n\n这个架构适合：\n\n✅ **数据量小**（< 50MB）\n✅ **结构稳定**，Schema 变更少\n✅ **离线优先**应用\n✅ **性能敏感**场景\n\n不适合：\n\n❌ 大数据量（> 100MB）\n❌ 复杂查询需求\n❌ 多进程并发写\n\n## 总结\n\n选择技术方案时，不要盲目跟随\"最佳实践\"。Room 固然优秀，但在特定场景下，内存 + Proto 可能是更合适的选择。\n\n关键是要深入理解自己的业务需求和技术约束，选择最适合的方案，而不是最流行的方案。\n\n我们的实践证明了这一点：系统运行稳定，性能优异，开发效率高。这就是好的架构设计。\n",
    "date": "2026-01-20",
    "tags": [
      "DDD",
      "Android",
      "Architecture",
      "Proto"
    ],
    "readTime": 10
  },
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
