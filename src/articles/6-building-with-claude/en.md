# Building a Personal Website with Claude Code: From Zero to Live

I've always wanted to create a personal blog to share my technical articles and insights. But every time I thought about the work involved - learning React, TypeScript, configuring build tools, deploying to GitHub Pages - it felt too complex, and I kept putting it off.

Until I met Claude Code - Anthropic's AI programming assistant. The entire website went from zero to live in just a few short conversations. This article documents that process and my thoughts on AI-assisted development.

## Background: Why I Kept Delaying

As a developer, I know what it takes to build a personal blog:

### Tech Stack Choices
- Frontend framework: React, Vue, Next.js? Too many choices
- Build tools: Vite, Webpack, Rollup?
- Styling: CSS, Sass, Tailwind CSS?
- Deployment: Vercel, Netlify, GitHub Pages?

### Development Work
- Set up project structure
- Implement page layouts
- Configure routing
- Add search functionality
- Implement dark mode
- Configure i18n internationalization
- Write Markdown rendering
- Add code highlighting
- Configure GitHub Actions deployment

### Estimated Time
If doing this manually, I estimated:
- Learn React/TypeScript: 2-3 days
- Set up project: half day
- Implement core features: 2-3 days
- Style optimization: 1 day
- i18n configuration: 1 day
- Deployment configuration: half day
- **Total: At least 1 week**

And that's assuming full-time dedication. For someone with a full-time job like me, it might take weeks or even longer.

## The Collaboration Process with Claude Code

### First Conversation: Setting Up the Basic Project

Me: I want to create a personal blog website that can be deployed to GitHub.

Claude Code: Sure, let me help you build a simple website using React + Vite.

A few seconds later, the basic project was set up:
```bash
npm create vite@latest personal-website -- --template react-ts
cd personal-website
npm install
```

Claude Code continued asking me:
- What pages do you need?
- Want to add routing?
- What styling do you need?

I only needed to answer questions and choose the features I wanted, and it would automatically generate the code.

### Second Conversation: Adding Blog Features

Me: I want to add blog functionality, with article writing, search, and filtering.

Claude Code:
- Installed React Router
- Created BlogList and BlogPost components
- Implemented search and filter functionality
- Added Markdown rendering
- Configured code highlighting

I didn't need to do anything except tell it what features I wanted.

### Third Conversation: Adding Dark Mode and i18n

Me: Can you add dark mode and Chinese/English switching?

Claude Code:
- Configured theme switching
- Integrated react-i18next
- Added language switcher component
- Supported language switching for article content

### Fourth Conversation: Optimizing Styles

Me: The blue in dark mode is too harsh, can you make it softer gray?

Claude Code:
- Adjusted dark mode color scheme
- Used iOS-style low-contrast grays
- Optimized dark mode styles for all components

### Fifth Conversation: Optimizing Homepage

Me: The tech stack on the homepage is meaningless, can you show more articles instead?

Claude Code:
- Removed tech stack section
- Added "Recent Articles" section
- Optimized article list layout
- Added "View All" links

Each conversation was just a few minutes, and the features were implemented.

## Time Cost Comparison

### Manual Development

| Phase | Time | Skills Required |
|-------|------|-----------------|
| Learn React/TypeScript | 2-3 days | Frontend dev experience |
| Set up project | Half day | Project architecture exp |
| Implement core features | 2-3 days | React ecosystem exp |
| Style optimization | 1 day | CSS design skills |
| i18n configuration | 1 day | i18n experience |
| Deployment config | Half day | DevOps experience |
| **Total** | **7-8 days** | **Full-stack dev experience** |

### Using Claude Code

| Phase | Time | Skills Required |
|-------|------|-----------------|
| Set up basic project | 5 minutes | Ability to ask questions |
| Add blog features | 20 minutes | Ability to describe requirements |
| Add dark mode | 10 minutes | Ability to give feedback |
| Optimize styles | 15 minutes | Have good taste |
| Optimize homepage | 10 minutes | Know what you want |
| **Total** | **1 hour** | **Natural language description** |

### Efficiency Improvement

**Time saved**: From 1 week → 1 hour, efficiency improved 100x+

**Skill requirements**: From full-stack development experience → natural language description

**Barrier lowered**: Anyone can build their own website

## Key Feature Implementation

Let me show how several core features were implemented:

### 1. Article System: From Hardcoded to File Generation

Initially, article content was hardcoded. I said: Can you change it to read Markdown files?

Claude Code immediately:
- Created `scripts/generate-articles.js` script
- Automatically reads Markdown files from `src/articles` directory
- Extracts titles and excerpts
- Generates TypeScript data files
- Configured npm hooks for auto-generation

Now to add new articles, I only need to:
1. Create `src/articles/xxx/en.md` and `src/articles/xxx/zh.md`
2. Run `npm run build`
3. Articles automatically appear on the website

### 2. Internationalization: From Idea to Implementation

Me: I want to add Chinese/English switching.

Claude Code:
- Installed `react-i18next`
- Created `src/locales/en.json` and `src/locales/zh.json`
- Added translations to all components
- Implemented language switcher button
- Configured language detection and caching

I only need to provide translation content, everything else is automatic.

### 3. Dark Mode: From Harsh to Comfortable

Me: The blue in dark mode is too harsh.

Claude Code:
- Modified CSS variables, using soft grays
- Main background from pure black to `#1c1c1e`
- Text color from pure white to `#ebebf5`
- Added dark mode styles for all components

I only had to say "too harsh", and it understood and optimized.

### 4. Deployment: From Manual to Automated

Me: I want to deploy to GitHub Pages.

Claude Code:
- Configured `vite.config.ts` base path
- Installed `gh-pages` package
- Added `npm run deploy` script
- Created `.nojekyll` file
- Configured auto-generation hooks

Now deployment is just one command: `npm run deploy`

## My Thoughts

### 1. AI is Not Replacement, It's Empowerment

Some say AI will replace programmers. I don't think so.

If built manually, this website might take 1 week. But with AI assistance, it took 1 hour.

**Key difference**:
- Manual development: I need to do all the details
- AI assistance: I make decisions, AI executes

**My value**:
- Decide what features I want (blog, search, dark mode, i18n)
- Judge what's good design (iOS style, low contrast)
- Choose tech stack (React + Vite + TypeScript)
- Provide what content (technical articles, insights)

**AI's value**:
- Quickly implement my ideas
- Solve technical details
- Optimize code quality
- Provide best practices

### 2. Natural Language is the New Programming Language

Before, building a website required learning:
- HTML/CSS/JavaScript
- React framework
- TypeScript type system
- Build tools
- Package managers

Now, you only need to:
- Describe requirements in natural language
- Give feedback and adjustments
- Make final decisions

**Natural language = New programming language**

### 3. Power of Rapid Iteration

If building manually, I might:
- Give up because it's too complex
- Use a crude solution
- Outsource to others, expensive and slow communication

With AI assistance:
- Implement features as soon as I think of them
- Adjust immediately if not satisfied
- See results quickly
- Continuously optimize and improve

**Rapid iteration = High quality output**

### 4. Sharing Cost Greatly Reduced

Before, the cost of writing a tech blog was high:
- Need to maintain website
- Need continuous updates
- Need to handle various technical issues

Now:
- Adding new articles only requires writing Markdown
- AI helps with website maintenance
- Technical issues resolved anytime

**Lower cost of sharing, but increased value**

### 5. Everyone Can Build Their Own Brand

Before, personal websites were a technical barrier:
- Required programming skills
- Required design ability
- Required continuous maintenance

Now:
- Anyone can build a website
- Fast, low cost, high quality
- Focus on content creation

**Technology is no longer a barrier, creativity is the core**

## Future Outlook

This website is just the beginning. With AI assistance, I can:

### Content Creation
- Write technical articles
- Share AI usage insights
- Document project experiences
- Explore monetization methods

### Feature Expansion
- Add comment system
- Integrate RSS subscription
- Add analytics
- Optimize SEO

### Commercialization Exploration
- Display ads
- Paid content
- Knowledge payment
- Consulting services

**Everything is possible, because technology is no longer a barrier**

## Conclusion

The experience of building this website with Claude Code gave me profound insights:

1. **AI is a powerful tool** - But humans need to provide direction and decisions
2. **Natural language is the new programming language** - Lower barriers, higher efficiency
3. **Rapid iteration is core competitiveness** - Implement as soon as you think
4. **Sharing cost is greatly reduced** - Everyone can build their own brand
5. **Technology is not the barrier, creativity is** - Focus on what you're good at

This website went from idea to live in just 1 hour. And in this process, I didn't write a single line of code, just described my requirements in natural language, and Claude Code helped me implement all the features.

**This is not the future, this is now.**

AI-assisted development is here, and the results are amazing. The key is:
- You need to know what you want
- You need to clearly describe requirements
- You need to give valuable feedback
- You need to make final decisions

**AI does the work, but you need to think clearly about what you want.**

This website is just the beginning. I believe with AI assistance, everyone can quickly implement their ideas, focus on what they're good at, and create greater value.

Let's explore this new era of AI empowerment together!
