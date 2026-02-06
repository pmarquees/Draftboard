# AGENTS.MD

Guidelines for AI coding agents working on this codebase.

## Code Style & Conventions

### Pluralization

Always use the `pluralize()` helper from `~/lib/utils` when displaying counts with text labels. Never hardcode plural forms.

```tsx
// ✅ Correct
import { pluralize } from "~/lib/utils";
<span>{count} {pluralize(count, "post")}</span>
<span>{count} {pluralize(count, "reply", "replies")}</span>

// ❌ Wrong - hardcoded plural
<span>{count} posts</span>
<span>{count} members</span>
```

The `pluralize(count, singular, plural?)` function:
- Returns singular form when count === 1
- Returns plural form (or singular + "s") otherwise
- Supports irregular plurals via optional third argument

### Component Structure

- Use `"use client"` directive for interactive components
- Keep server components as the default where possible
- Place shared UI components in `src/components/ui/`
- Feature-specific components go in their respective folders (e.g., `src/components/feed/`)

### Imports

- Use path aliases: `~/` maps to `src/`
- Import order: React → Next.js → external libs → internal modules → types
- Prefer named exports over default exports for components

### TypeScript

- Always type component props with interfaces
- Use `unknown` for JSON data from the database (e.g., Lexical editor state)
- Prefer explicit types over `any`

### API & Data Fetching

- Use tRPC for all API calls via `api` from `~/lib/trpc/client`
- Use React Query's infinite queries for paginated data
- Handle loading and error states explicitly

### Styling

- Use Tailwind CSS classes
- Use `cn()` from `~/lib/utils` for conditional class merging
- Follow shadcn/ui patterns for custom components

#### Destructive Action Styling

Destructive/negative actions with red text must have proper hover/focus states to remain readable:

```tsx
// ✅ Correct - red background with white text on hover/focus
<DropdownMenuItem className="text-destructive focus:bg-destructive focus:text-destructive-foreground">
  Delete item
</DropdownMenuItem>

<Button className="text-destructive hover:bg-destructive hover:text-destructive-foreground">
  Sign out
</Button>

// ❌ Wrong - red text stays red on dark hover background, becomes unreadable
<DropdownMenuItem className="text-destructive focus:text-destructive">
  Delete item
</DropdownMenuItem>

<Button className="text-destructive hover:text-destructive">
  Sign out
</Button>
```

Rule: Elements with `text-destructive` in default state should use `focus:bg-destructive focus:text-destructive-foreground` (for menu items) or `hover:bg-destructive hover:text-destructive-foreground` (for buttons) in their interactive states.

## Project Architecture

```
src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Auth pages (public)
│   ├── (main)/            # Protected pages
│   └── api/               # API routes (tRPC, NextAuth)
├── components/            # React components
├── server/                # Server-side code
│   └── api/routers/       # tRPC routers
├── lib/                   # Utilities and hooks
└── middleware.ts          # Auth middleware
```

## Testing

- Use Vitest for unit tests
- Place test files alongside source files with `.test.ts` extension
- Run tests with `npm test`

## Common Patterns

### Infinite Scroll Lists

```tsx
const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = 
  api.post.list.useInfiniteQuery(
    { limit: 10 },
    { getNextPageParam: (lastPage) => lastPage.nextCursor }
  );

const items = data?.pages.flatMap((page) => page.items) ?? [];
```

### Date Formatting

Use `formatRelativeTime()` from `~/lib/utils` for consistent relative dates.

### URL Signing for R2

Private R2 URLs need signing. Use `api.upload.getDownloadUrl.useQuery()` for attachments and cover images.
