# DDD Architecture in Practice: Memory Storage + Proto vs Room

In our previous project, we adopted a unique data storage approach: instead of using Room database, we used in-memory storage with Protocol Buffers. This article shares the rationale and practical experience behind this architectural decision.

## Background

In Android development, Room is Google's recommended standard database solution. However, in our scenario, we chose a different path. This decision wasn't made on a whim; it was based on a comprehensive consideration of business characteristics and technical requirements.

## Why Not Room?

### 1. Performance Considerations

While Room is powerful, it has performance bottlenecks in high-frequency read-write scenarios:
- Database I/O operations are relatively time-consuming
- SQL parsing overhead
- Cross-process communication costs

Our application requires frequent data read-write operations, and in-memory storage provides better performance.

### 2. Data Structure Characteristics

Our data has these features:
- Relatively small data size (few MBs)
- Highly structured with stable Schema
- No complex query requirements

For this type of scenario, memory + Proto is more suitable.

### 3. Offline-First Architecture

The application needs to support complete offline operation:
- Load all data into memory at startup
- All operations happen in memory during runtime
- Periodically serialize to local storage

In this mode, databases provide limited value.

## Architecture Design

### Core Concept

```
┌─────────────────────────────────────────┐
│         Memory Data Layer (Cache)         │
├─────────────────────────────────────────┤
│  Protocol Buffers (Serialize/Deserialize) │
├─────────────────────────────────────────┤
│  File Storage (Persistence)               │
└─────────────────────────────────────────┘
```

### Data Flow

```
Startup → Load Proto Files → Deserialize to Memory → Business Operations
                                                ↓
                                          Periodic Serialize → Save to File
```

## Implementation Details

### 1. Define Proto Schema

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

### 2. Memory Cache Management

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

### 3. Data Persistence

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

## Advantages Summary

### Performance Benefits

- **Read/Write Speed**: Memory operations are 10-100x faster than database
- **Startup Time**: Preload all data, no runtime I/O
- **Responsiveness**: No UI lag

### Development Benefits

- **Type Safety**: Proto generates strongly-typed data classes
- **Version Compatibility**: Proto natively supports forward compatibility
- **Debug Friendly**: Memory data can be directly inspected

### Business Benefits

- **Offline-First**: Complete offline support
- **Data Consistency**: Single source of truth, no sync issues
- **Fast Iteration**: Schema changes only require updating Proto

## Caveats

### 1. Data Size Control

- Regularly clean up unused data
- Compress large fields
- Consider modular storage

### 2. Memory Management

```kotlin
// Release unnecessary data promptly
fun clearCache() {
  userList = null
  System.gc()
}
```

### 3. Exception Handling

```kotlin
fun safeLoad(): UserList? {
  return try {
    loadFromFile()
  } catch (e: Exception) {
    // Fallback handling
    loadDefaultData()
  }
}
```

## Use Cases

This architecture is suitable for:

✅ **Small Data** (< 50MB)
✅ **Stable Structure**, infrequent Schema changes
✅ **Offline-First** applications
✅ **Performance-Sensitive** scenarios

Not suitable for:

❌ Large Data (> 100MB)
❌ Complex Query Requirements
❌ Multi-Process Concurrent Writes

## Conclusion

When choosing a technical solution, don't blindly follow "best practices." Room is excellent, but in specific scenarios, Memory + Proto might be the better choice.

The key is to deeply understand your business requirements and technical constraints, then choose the solution that fits best, not the most popular one.

Our practice proves this point: the system runs stably with excellent performance and high development efficiency. This is good architecture design.
