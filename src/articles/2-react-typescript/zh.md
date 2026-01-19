# React TypeScript 入门指南

TypeScript 为 JavaScript 添加了静态类型，使你的 React 应用更加健壮和可维护。

## 为什么在 React 中使用 TypeScript？

1. **类型安全**：在编译时捕获错误
2. **更好的 IDE 支持**：改进的自动完成和重构
3. **自文档化**：类型即文档
4. **更容易重构**：有类型检查保障的代码变更

## 基础设置

```bash
npm create vite@latest my-app -- --template react-ts
```

## 组件示例

```typescript
interface ButtonProps {
  label: string;
  onClick: () => void;
}

export function Button({ label, onClick }: ButtonProps) {
  return <button onClick={onClick}>{label}</button>;
}
```

## 最佳实践

- 始终定义 props 接口
- 对有限选项使用联合类型
- 利用泛型创建可复用组件
- 在 tsconfig.json 中启用严格模式

TypeScript 可能需要更多前期工作，但在大型应用中回报丰厚。
