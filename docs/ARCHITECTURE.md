# Architecture Documentation

## Overview

Beyond the Swipe is a compatibility-driven dating PWA built with React, TypeScript, and Vite. The M1 milestone establishes the foundational architecture for future backend integration while providing a complete, functional UI.

## Core Principles

1. **Feature-based organization**: Code organized by domain features, not technical layers
2. **Type safety**: Strict TypeScript throughout
3. **Mobile-first**: Responsive design with mobile as primary target
4. **Progressive enhancement**: Core functionality works offline
5. **Maintainability**: Clear separation of concerns, minimal dependencies

## Technology Stack

### Frontend
- **React 19**: Latest stable version with concurrent features
- **TypeScript 6**: Strict mode enabled
- **Vite 8**: Fast development and optimized production builds
- **React Router**: Client-side routing with protected routes
- **Tailwind CSS**: Utility-first styling with custom design system

### PWA
- **vite-plugin-pwa**: Service worker generation and management
- **Workbox**: Asset caching and offline support

### Future (M2+)
- **Supabase**: Authentication, database, real-time, storage
- **React Query** (optional): Server state management

## Directory Structure

```
src/
├── app/                          # Application core
│   ├── router.tsx               # Route configuration
│   └── providers.tsx            # Context providers wrapper
│
├── components/                   # Reusable components
│   ├── ui/                      # Base UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── Card.tsx
│   ├── layout/                  # Layout components
│   │   └── AppLayout.tsx        # Main app shell with navigation
│   └── common/                  # Common components
│       └── ProtectedRoute.tsx   # Auth guard
│
├── features/                     # Domain features
│   ├── auth/                    # Authentication
│   │   ├── AuthContext.tsx     # Auth state management
│   │   ├── LandingPage.tsx
│   │   ├── LoginPage.tsx
│   │   └── SignupPage.tsx
│   ├── onboarding/
│   │   └── OnboardingPage.tsx
│   ├── discovery/
│   │   └── DiscoveryPage.tsx
│   ├── matching/
│   │   └── MatchesPage.tsx
│   ├── messaging/
│   │   └── MessagesPage.tsx
│   └── profiles/
│       ├── ProfilePage.tsx
│       └── SettingsPage.tsx
│
├── hooks/                        # Custom React hooks
│
├── lib/                         # Utilities and constants
│   ├── utils.ts                # Helper functions
│   ├── constants.ts            # App constants
│   └── mockData.ts             # Development mock data
│
├── services/                     # API and service layer
│   └── auth.service.ts         # Authentication service
│
├── types/                        # TypeScript definitions
│   └── index.ts                # Shared types
│
└── styles/                       # Global styles
    └── index.css               # Tailwind imports and globals
```

## Data Flow

### M1 (Current)

```
Component
    ↓
Context/Hook (AuthContext)
    ↓
Service (auth.service.ts)
    ↓
Mock Data / localStorage
```

### M2 (Planned)

```
Component
    ↓
Context/Hook
    ↓
Service Layer
    ↓
Supabase Client
    ↓
Backend (Postgres, Auth, Storage)
```

## State Management

### Current Approach
- **Local State**: `useState` for component-specific state
- **Context API**: `AuthContext` for authentication state
- **localStorage**: Persisting mock auth state

### Future Approach
- **React Context**: App-wide state (user, theme)
- **React Query**: Server state (profiles, matches, messages)
- **Supabase Realtime**: Live updates for messaging

## Routing Strategy

### Route Structure

```
/ (public)
├── /login (public)
├── /signup (public)
├── /onboarding (protected)
└── App Layout (protected)
    ├── /discover
    ├── /matches
    ├── /messages
    ├── /messages/:matchId
    ├── /profile
    └── /settings
```

### Protection

- Public routes: Landing, Login, Signup
- Protected routes: Everything else (requires authentication)
- `ProtectedRoute` component guards authenticated routes
- Unauthenticated users redirect to `/login`

## Component Architecture

### UI Components

Base components in `components/ui/`:
- **Button**: Variants, sizes, loading states
- **Input**: Labels, errors, helper text
- **Card**: Layout variants

Design principles:
- Composable and reusable
- Consistent API with clear props
- Accessible by default
- TypeScript interfaces for all props

### Feature Components

Feature-specific components in `features/`:
- Self-contained within feature folders
- Import from `components/ui/` and `lib/`
- Co-located with feature logic
- Page-level components export as default

## Type System

### Core Types

Defined in `src/types/index.ts`:

- **User**: Authentication user
- **Profile**: User profile data
- **Match**: Match relationship
- **Message**: Chat message
- **CompatibilityScore**: Compatibility calculation
- **OnboardingData**: Onboarding flow data

### Type Safety

- Strict TypeScript mode enabled
- No implicit `any`
- Explicit return types for functions
- Interface over type for object shapes

## Service Layer

### Current Implementation

`auth.service.ts`:
- Mock authentication logic
- Simulates API delays
- Returns typed responses
- Clearly marked as development-only

### Future Implementation

Services for:
- `auth.service.ts`: Supabase Auth wrapper
- `profile.service.ts`: Profile CRUD
- `match.service.ts`: Matching logic
- `message.service.ts`: Real-time messaging

## PWA Architecture

### Service Worker Strategy

**Workbox Configuration** (vite-plugin-pwa):
- **Static assets**: Cache-first (JS, CSS, fonts)
- **Images**: Cache-first with size limit
- **API calls**: Network-first (M2+)
- **Offline fallback**: `/offline.html`

### Manifest

Key properties:
- **name**: Beyond the Swipe
- **short_name**: BtS
- **display**: standalone
- **orientation**: portrait
- **theme_color**: #334e68
- **icons**: Multiple sizes (64, 192, 512)

### Update Strategy

- **registerType**: autoUpdate
- Prompts user on new version (future enhancement)
- Reloads seamlessly

## Performance Considerations

### Current Optimizations

1. **Vite**: Fast HMR in development
2. **Code splitting**: React Router lazy loading (future)
3. **Image optimization**: Using external URLs (M1)
4. **Minimal dependencies**: Only essential packages

### Future Optimizations

1. **React.lazy()**: Route-based code splitting
2. **Image CDN**: Optimized image delivery
3. **Virtual scrolling**: Large profile lists
4. **Debounced search**: Search input optimization

## Security Architecture

### M1 Security

- Mock auth clearly identified
- No secrets in codebase
- `.env.example` for configuration
- HTTPS required for PWA

### M2 Security

- Supabase Row Level Security (RLS)
- Server-side validation
- Rate limiting
- Content Security Policy (CSP)
- Photo upload validation

## Accessibility

### Standards

- WCAG 2.1 AA compliance target
- Semantic HTML
- ARIA labels where needed
- Keyboard navigation
- Focus management

### Implementation

- Color contrast ratios meet AA
- Form inputs have labels
- Error messages are announced
- Focus indicators visible
- Mobile touch targets ≥44px

## Testing Strategy

### M1 (Manual)

- TypeScript compilation
- Production build verification
- Manual cross-browser testing
- Mobile responsiveness checks

### M2 (Automated)

- **Unit**: Vitest + Testing Library
- **Integration**: Feature flows
- **E2E**: Playwright (critical paths)
- **A11y**: axe-core automated checks

## Deployment Architecture

### M1

- Static hosting (Vercel, Netlify, Cloudflare Pages)
- Build: `npm run build`
- Output: `dist/`
- PWA manifest and service worker included

### M2

- Same hosting + Supabase backend
- Environment variables for Supabase config
- CDN for static assets
- Edge functions for API (optional)

## Migration Path (M1 → M2)

### Phase 1: Authentication
1. Replace `auth.service.ts` with Supabase Auth
2. Update `AuthContext` to use real API
3. Implement session management
4. Add email verification

### Phase 2: Database
1. Design Postgres schema
2. Implement Row Level Security
3. Replace mock data with queries
4. Add profile CRUD operations

### Phase 3: Real-time
1. Set up Supabase real-time subscriptions
2. Implement live messaging
3. Add presence indicators
4. Sync match notifications

### Phase 4: Storage
1. Implement photo upload to Supabase Storage
2. Add image processing pipeline
3. Implement photo moderation (future)

## Monitoring and Analytics

### Future Implementation

- **Error tracking**: Sentry or similar
- **Analytics**: Privacy-focused (Plausible, Fathom)
- **Performance**: Web Vitals monitoring
- **User behavior**: Feature usage tracking

## Design System

### Colors

```typescript
primary: {
  700: '#334e68',  // Navy
  800: '#243b53'
}

accent: {
  600: '#f95980',  // Rose
  700: '#e03a63'
}
```

### Typography

- **Font**: Inter
- **Scale**: Tailwind default (text-sm to text-7xl)
- **Line height**: Optimized for readability

### Spacing

- Consistent 4px base unit
- Component padding: 1rem - 2rem
- Section margins: 2rem - 4rem

## Future Considerations

### Scalability

- Redis caching for compatibility scores
- Background jobs for match calculations
- CDN for profile photos
- Database indexing strategy

### Feature Expansion

- Video profiles
- Voice messages
- Group events
- Premium subscriptions
- Advanced filters
- Verified profiles

### Internationalization

- i18n setup with react-i18next
- RTL support
- Date/time localization
- Currency formatting
