# Comprehensive Guide to AI API Services: Domestic & International

With the maturation of large language model technology, the AI API market has entered fierce competition. This article provides a comprehensive comparison of mainstream AI API services from multiple dimensions including pricing, capabilities, and use cases.

## Table of Contents

- [Part 1: Domestic AI API Market](#part-1-domestic-ai-api-market)
- [Part 2: International AI API Solutions](#part-2-international-ai-api-solutions)
- [Part 3: Comprehensive Recommendations](#part-3-comprehensive-recommendations)

---

## Part 1: Domestic AI API Market

Since 2023, domestic LLM vendors have successively opened their APIs, creating intense competition. Developers have become the biggest beneficiaries from the "price war."

### Main Service Providers

#### 1. Qwen (Alibaba Cloud) ⭐Recommended

**Models**: qwen-turbo, qwen-plus, qwen-max

**Pricing**:
```
qwen-turbo:  ¥0.008/1K tokens
qwen-plus:   ¥0.04/1K tokens
qwen-max:    ¥0.12/1K tokens
```

**Advantages**:
- ✅ Best value (qwen-turbo)
- ✅ Strong Chinese capabilities
- ✅ Comprehensive API documentation
- ✅ Function Calling support

**Official**: https://dashscope.aliyun.com/

---

#### 2. DeepSeek ⭐⭐Price Leader

**Models**: deepseek-chat, deepseek-coder

**Pricing**:
```
deepseek-chat:  ¥0.001/1K tokens (Cheapest!)
deepseek-coder: ¥0.001/1K tokens
```

**Advantages**:
- ✅ Unbeatable price (8x cheaper than Qwen)
- ✅ Strong code generation (deepseek-coder)
- ✅ Open source, transparent

**Official**: https://platform.deepseek.com/

---

#### 3. Kimi (Moonshot AI)

**Models**: moonshot-v1-8k, 32k, 128k

**Pricing**:
```
moonshot-v1-8k:   ¥0.012/1K tokens
moonshot-v1-128k: ¥0.06/1K tokens
```

**Advantages**:
- ✅ Ultra-long context (128K)
- ✅ Strong at long document processing
- ✅ Web search integration

**Official**: https://platform.moonshot.cn/

---

### Domestic Price Comparison

| Provider | Lowest Price | Model |
|----------|-------------|-------|
| DeepSeek | ¥0.001 | deepseek-chat |
| Doubao | ¥0.003 | doubao-lite |
| Hunyuan | ¥0.006 | hunyuan-lite |
| Qwen | ¥0.008 | qwen-turbo |
| Kimi | ¥0.012 | moonshot-v1-8k |

**DeepSeek is 50x cheaper than the most expensive GLM!**

---

### Scenario Selection (Domestic)

- **General Chatbot** → Qwen qwen-turbo
- **Code Generation** → DeepSeek-Coder
- **Long Documents** → Kimi moonshot-v1-128k
- **Enterprise** → ERNIE / Hunyuan

---

## Part 2: International AI API Solutions

### Challenge

Developing overseas applications requires OpenAI, Claude, or other overseas AI services, but many developers face:
- ❌ Need overseas credit card
- ❌ Inconvenient domestic payment
- ❌ Exchange rate fees

---

### Solution Comparison

| Solution | Difficulty | Cost | Pros | Cons |
|----------|-----------|------|------|------|
| **Azure OpenAI** | ⭐⭐ | Medium | Domestic payment | Requires application |
| **Third-party Proxy** | ⭐ | Low-Medium | Simple | Trust required |
| **Domestic Global AI** | ⭐ | Medium | Designed for global | Capability gap |
| **Self-deployment** | ⭐⭐⭐ | High | Full control | High maintenance |

---

### Solution 1: Azure OpenAI ⭐Recommended

**Why it works**:
```
Microsoft has operations in China!
- Microsoft China has legal entity
- Supports Alipay, enterprise wire transfer
- No overseas credit card needed
```

**Setup Steps**:
```
1. Register Azure account (China version)
   https://azure.microsoft.com/zh-cn/

2. Create OpenAI resource
   Azure Portal → Create resource → Search "OpenAI"

3. Get API Key (compatible with OpenAI API)

4. Deposit (supports Alipay, WeChat)
```

**Code Example** (fully compatible with OpenAI):
```python
from openai import OpenAI

client = OpenAI(
    api_key="your-azure-api-key",
    base_url="https://your-resource.openai.azure.com/"
)

response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "Hello!"}]
)
```

**Advantages**:
- ✅ Supports domestic payment
- ✅ Fully compatible with OpenAI API
- ✅ Can issue invoices
- ✅ Backed by Microsoft

**Disadvantages**:
- ⚠️ Requires permission application (1-2 weeks)
- ⚠️ Same price as OpenAI

---

### Solution 2: Third-party Proxy Services

**Common Platforms**:

| Platform | Markup | Payment | Features |
|----------|--------|---------|----------|
| API2D | +10-20% | Alipay | Legitimate |
| GPT API Us | +20% | Alipay | Established, stable |
| OpenAI-SB | +30% | Alipay | Cheaper |

**Code Example** (just change base URL):
```python
from openai import OpenAI

client = OpenAI(
    api_key="your-proxy-api-key",
    base_url="https://api.api2d.com/v1"
)

response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "Hello!"}]
)
```

**Advantages**:
- ✅ No overseas credit card needed
- ✅ Ready to use immediately
- ✅ Supports Alipay

**Risks**:
- ⚠️ Requires third-party trust
- ⚠️ 20-50% more expensive
- ⚠️ Potential shutdown risk

---

### Solution 3: Self-deploy Open Source Models

**Mainstream Open Source Models**:

| Model | Capability | Hardware Requirements |
|-------|-----------|----------------------|
| Llama 3.1 | Close to GPT-4 | A100 40GB |
| Qwen2.5 | Close to GPT-4 | RTX 4090 24GB |
| Mistral | Close to GPT-3.5 | RTX 3090 24GB |
| Phi-3 | Close to GPT-3.5 | CPU sufficient |

**Deployment Methods**:

**A. Local Deployment (Ollama)**:
```bash
# Install Ollama
ollama pull llama3.1

# Call
curl http://localhost:11434/api/generate -d '{
  "model": "llama3.1",
  "prompt": "Hello!"
}'
```

**B. Cloud Deployment (AutoDL, etc.)**:
```
Domestic GPU cloud platforms:
- AutoDL: ¥2-5/hour, supports Alipay
- Zhixingyun: supports Alipay
```

**Advantages**:
- ✅ Full control
- ✅ Data privacy
- ✅ No API call fees

**Disadvantages**:
- ❌ High hardware cost
- ❌ High maintenance cost
- ❌ Capability inferior to GPT-4

---

## Part 3: Comprehensive Recommendations

### Quick Decision Tree

**Domestic Applications**:
```
Need long context?
├─ Yes → Kimi (128k)
└─ No → Need code generation?
    ├─ Yes → DeepSeek-Coder
    └─ No → Cost sensitive?
        ├─ Yes → DeepSeek
        └─ No → Qwen
```

**Overseas Applications**:
```
Have Azure account?
├─ Yes → Azure OpenAI (most stable)
└─ No → Urgent?
    ├─ Yes → Third-party proxy (API2D)
    └─ No → Apply Azure + temporary proxy
```

---

### Hybrid Solution

**Architecture Design**:
```
Request routing:
├─ Simple tasks → Domestic AI (Qwen/DeepSeek) cheap
├─ Complex tasks → GPT-4 (Azure/proxy) capable
└─ Offline tasks → Self-deployed model (private)

Smart switching:
- Based on task difficulty
- Dynamic selection based on budget
- Auto fallback on failure
```

**Code Example**:
```python
class HybridAI:
    def __init__(self):
        self.cheap = 'qwen-turbo'      # Domestic
        self.premium = 'gpt-4o'        # Azure
        self.local = 'llama3.1'        # Self-deployed

    def chat(self, message, level='simple'):
        if level == 'simple':
            return self._call_cheap(message)
        elif level == 'complex':
            return self._call_premium(message)
        else:
            return self._call_local(message)
```

---

### Commercial Considerations

#### 1. Compliance

**Domestic Applications**:
```
Required:
- ICP filing
- Algorithm filing
- Content moderation
```

**Overseas Applications**:
```
Note:
- GDPR (EU)
- CCPA (California)
- Cross-border data transfer
```

---

#### 2. Data Security

**Recommendations**:
```
- Mask sensitive data
- Don't send personal information
- Choose compliant providers
- Regularly audit logs
```

---

#### 3. Cost Control

**Optimization Strategies**:
```
1. Prompt optimization (reduce tokens)
2. Cache common questions
3. Rate limiting
4. Monitor and analyze
5. Use cheaper models
```

**Monitoring Code**:
```python
class AIMonitor:
    def __init__(self):
        self.metrics = {
            'tokens': 0,
            'cost': 0,
            'requests': 0
        }

    def record(self, tokens, cost):
        self.metrics['tokens'] += tokens
        self.metrics['cost'] += cost
        self.metrics['requests'] += 1

    def report(self):
        print(f"Total: {self.metrics['tokens']} tokens, ¥{self.metrics['cost']}")
```

---

### Quick Start Guide

#### Step 1: Choose a Provider

**Domestic**: Qwen / DeepSeek
**Overseas**: Azure OpenAI / API2D

---

#### Step 2: Register Account

**Qwen**:
```
1. https://dashscope.aliyun.com/
2. Login with Alibaba Cloud
3. Activate DashScope
4. Create API Key
5. Deposit (¥100 minimum)
```

**Azure OpenAI**:
```
1. https://azure.microsoft.com/zh-cn/
2. Register Azure account
3. Apply for OpenAI permission
4. Create resource
5. Deposit (Alipay)
```

**API2D (Proxy)**:
```
1. https://api.api2d.com/
2. Register account
3. Deposit (Alipay ¥50 minimum)
4. Get API Key
```

---

#### Step 3: First Call

**Python Example (Qwen)**:
```python
import dashscope

dashscope.api_key = "your-api-key"

def chat(message):
    response = dashscope.Generation.call(
        model='qwen-turbo',
        messages=[
            {'role': 'user', 'content': message}
        ]
    )
    return response.output.text

print(chat("你好"))
```

**Python Example (Azure OpenAI/Proxy)**:
```python
from openai import OpenAI

client = OpenAI(
    api_key="your-api-key",
    base_url="your-base-url"
)

response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "Hello!"}]
)

print(response.choices[0].message.content)
```

---

## Summary

### Domestic Application Recommendations

- **General Use**: Qwen qwen-turbo
- **Code Generation**: DeepSeek-Coder
- **Long Documents**: Kimi moonshot-v1-128k
- **Cost Sensitive**: DeepSeek
- **Enterprise**: ERNIE / Hunyuan

### Overseas Application Recommendations

- **Long-term**: Azure OpenAI (stable, compliant)
- **Quick**: Third-party proxy (API2D)
- **Supplementary**: Domestic global AI (MiniMax)
- **Fallback**: Self-deployed open source models

### Key Principles

1. Test capabilities first, then consider price
2. Prepare backup plans
3. Control costs, monitor usage
4. Follow compliance requirements

### Action Items

- **Today**: Choose provider, register account
- **This Week**: Implement first AI feature
- **This Month**: Evaluate effectiveness, optimize costs
- **Long Term**: Accumulate data, iterate product

---

AI is not the destination, but a new starting point. What matters is finding truly valuable scenarios, using AI to solve problems, and creating value.

---

**References**:

**Domestic Services**:
- [Alibaba Cloud DashScope](https://dashscope.aliyun.com/)
- [DeepSeek Platform](https://platform.deepseek.com/)
- [Moonshot AI](https://platform.moonshot.cn/)
- [Baidu Qianfan](https://cloud.baidu.com/product/wenxinworkshop)

**Overseas Services**:
- [Azure OpenAI](https://azure.microsoft.com/zh-cn/)
- [API2D](https://api.api2d.com/)
- [OpenAI](https://openai.com/)

**Let's Connect**:
- GitHub: [ColdBrando](https://github.com/ColdBrando)
- Email: your-email@example.com
