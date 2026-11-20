# Beyond the Swipe

A compatibility-driven dating Progressive Web Application (PWA) that goes beyond superficial swiping to help people find meaningful connections based on values, lifestyle, and long-term compatibility.

## ⚠️ M1 Status

This is the **M1 Foundation** milestone. The application provides:

- Complete PWA infrastructure
- Full UI/UX for all core screens
- Development-only mock authentication
- Responsive design and mobile-first layout
- Offline capability

**Not yet implemented:**
- Real backend integration (planned for M2 with Supabase)
- Real-time messaging
- Payment processing
- Production authentication

## 🚀 Quick Start

### Prerequisites

- Node.js 22.x or higher
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development Mode

The application runs in development mode with mock authentication. You can:
- Use any email/password combination to log in
- Complete onboarding with sample data
- Browse mock profiles
- View sample matches and messages

All data is stored in local browser state and is not persisted.

## 📱 Features

### Implemented in M1

- **Landing Page**: Product introduction and value proposition
- **Authentication**: Login and registration flows (mock)
- **Onboarding**: Multi-step profile creation
- **Discovery**: Browse profiles with compatibility scores
- **Matches**: View your matches
- **Messaging**: Sample conversation interface
- **Profile**: View and manage your profile
- **Settings**: Account settings placeholder
- **PWA**: Installable, offline-capable

### Design Principles

- Mobile-first responsive design
- Premium, elegant aesthetics
- Warm neutral backgrounds with deep navy typography
- Restrained accent colors
- Excellent typography and spacing
- Accessible (WCAG AA contrast ratios)
- Subtle animations

## 🏗️ Technical Stack

- **Framework**: React 19
- **Language**: TypeScript (strict mode)
- **Build Tool**: Vite 8
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **PWA**: vite-plugin-pwa
- **Icons**: Lucide React

## 📂 Project Structure

```
src/
├── app/                    # Application core
│   ├── router.tsx         # Route definitions
│   └── providers.tsx      # Context providers
├── components/
│   ├── ui/                # Reusable UI components
│   ├── layout/            # Layout components
│   └── common/            # Common components
├── features/              # Feature modules
│   ├── auth/             # Authentication
│   ├── onboarding/       # User onboarding
│   ├── profiles/         # Profile management
│   ├── discovery/        # Profile discovery
│   ├── matching/         # Match management
│   └── messaging/        # Messaging
├── hooks/                # Custom React hooks
├── lib/                  # Utilities and helpers
├── services/             # API and service layer
├── types/                # TypeScript type definitions
└── styles/               # Global styles
```

## 🧪 Testing

```bash
# Run type checking
npm run build

# Lint code
npm run lint
```

## 📱 PWA Configuration

The application is configured as a Progressive Web App with:

- **Service Worker**: Automatic updates with Workbox
- **Manifest**: Complete web app manifest
- **Offline Support**: Fallback page for offline usage
- **Installability**: Can be installed on mobile and desktop

### Installing the PWA

1. Open the app in a supported browser (Chrome, Edge, Safari)
2. Look for the "Install" prompt or menu option
3. Click "Install" to add to home screen

## 🔒 Security Notes

- No secrets or API keys are committed
- Environment variables use `.env.example` template
- Mock authentication clearly marked as development-only
- HTTPS required for PWA features in production

## 🎨 Design System

### Colors

- **Primary**: Deep navy (#334e68)
- **Accent**: Rose pink (#f95980)
- **Background**: Warm white and gray
- **Text**: Dark gray for readability

### Typography

- **Font**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700

### Component Library

Minimal custom components:
- Button (variants: primary, secondary, outline, ghost)
- Input (with label, error, helper text)
- Card (variants: default, elevated, bordered)

## 🚧 Known Limitations

1. **Authentication**: Mock only - data not persisted
2. **API Integration**: No backend connectivity
3. **Real-time Features**: Not implemented
4. **Photo Upload**: Not functional
5. **PWA Icons**: Placeholder SVG (needs PNG generation)
6. **Database**: No data persistence

## 📋 Next Steps (M2)

1. Integrate Supabase for:
   - Authentication
   - Database (profiles, matches, messages)
   - Real-time subscriptions
   - Storage (photos)
2. Implement photo upload
3. Build compatibility algorithm
4. Add real-time messaging
5. Implement search and filters
6. Generate production PWA icons

## 🤝 Contributing

This is a milestone-based project. Current focus is M1 foundation completion.

## 📄 License

Private project - all rights reserved.

## 📞 Support

For questions or issues, refer to the project documentation in `/docs`.
