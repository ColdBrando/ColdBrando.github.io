# DDD 架构实践：内存存储 + Proto 替代 Room

在之前的项目中，我们采用了一种独特的数据存储方案：不使用 Room 数据库，而是采用内存存储 + Protocol Buffers。本文将分享这一架构设计的思路和实践经验。

## 背景

在 Android 开发中，Room 是 Google 推荐的标准数据库解决方案。但在我们的场景中，选择了不同的路径。这个决策并非一时兴起，而是基于业务特性和技术需求的综合考量。

## 为什么不用 Room？

### 1. 性能考虑

Room 虽然功能强大，但在高频读写场景下存在性能瓶颈：
- 数据库 I/O 操作相对耗时
- SQL 解析开销
- 跨进程通信成本

我们的应用需要频繁读写数据，内存存储能提供更好的性能表现。

### 2. 数据结构特点

我们的数据具有以下特征：
- 数据量相对较小（几 MB 级别）
- 结构化程度高，Schema 稳定
- 不需要复杂的查询操作

对于这种场景，内存存储 + Proto 更为合适。

### 3. 离线优先架构

应用需要支持完全离线工作：
- 启动时加载所有数据到内存
- 运行期间所有操作在内存进行
- 定期序列化到本地存储

这种模式下，数据库的价值有限。

## 架构设计

### 核心思想

```
┌─────────────────────────────────────────┐
│         内存数据层（Cache Layer）        │
├─────────────────────────────────────────┤
│  Protocol Buffers (序列化/反序列化)      │
├─────────────────────────────────────────┤
│  文件存储（File Persistence）            │
└─────────────────────────────────────────┘
```

### 数据流

```
启动 → 加载 Proto 文件 → 反序列化到内存 → 业务操作
                                      ↓
                                   定期序列化 → 保存到文件
```

## 实现细节

### 1. 定义 Proto Schema

```protobuf
message User {
  string id = 1;
  string name = 2;
  string email = 3;
  repeated string tags = 4;
}

message UserList {
  repeated User users = 1;
  int64 last_updated = 2;
}
```

### 2. 内存缓存管理

```kotlin
object DataManager {
  private var userList: UserList? = null

  suspend fun loadUsers(): UserList {
    return userList ?: loadFromFile().also { userList = it }
  }

  suspend fun saveUsers(users: UserList) {
    userList = users
    saveToFile(users)
  }
}
```

### 3. 数据持久化

```kotlin
class FileRepository {
  fun saveToFile(data: UserList) {
    val bytes = data.toByteArray()
    context.openFileOutput(FILE_NAME, Context.MODE_PRIVATE).use {
      it.write(bytes)
    }
  }

  fun loadFromFile(): UserList? {
    return try {
      context.openFileInput(FILE_NAME).use { stream ->
        UserList.parseFrom(stream)
      }
    } catch (e: Exception) {
      null
    }
  }
}
```

## 优势总结

### 性能优势

- **读写速度**：内存操作比数据库快 10-100 倍
- **启动时间**：预加载所有数据，运行时无 I/O
- **响应性**：UI 操作无卡顿

### 开发优势

- **类型安全**：Proto 生成强类型数据类
- **版本兼容**：Proto 天生支持向前兼容
- **调试友好**：内存数据可直接查看

### 业务优势

- **离线优先**：完全支持离线工作
- **数据一致性**：单一数据源，无同步问题
- **快速迭代**：Schema 变更只需更新 Proto

## 注意事项

### 1. 数据大小控制

- 定期清理无用数据
- 压缩存储大字段
- 考虑分模块存储

### 2. 内存管理

```kotlin
// 及时释放不需要的数据
fun clearCache() {
  userList = null
  System.gc()
}
```

### 3. 异常处理

```kotlin
fun safeLoad(): UserList? {
  return try {
    loadFromFile()
  } catch (e: Exception) {
    // 降级处理
    loadDefaultData()
  }
}
```

## 适用场景

这个架构适合：

✅ **数据量小**（< 50MB）
✅ **结构稳定**，Schema 变更少
✅ **离线优先**应用
✅ **性能敏感**场景

不适合：

❌ 大数据量（> 100MB）
❌ 复杂查询需求
❌ 多进程并发写

## 总结

选择技术方案时，不要盲目跟随"最佳实践"。Room 固然优秀，但在特定场景下，内存 + Proto 可能是更合适的选择。

关键是要深入理解自己的业务需求和技术约束，选择最适合的方案，而不是最流行的方案。

我们的实践证明了这一点：系统运行稳定，性能优异，开发效率高。这就是好的架构设计。
