import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Heart, MessageCircle, Compass, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { APP_NAME } from '@/lib/constants';

export function AppLayout() {
  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-accent-600" />
              <span className="ml-2 text-xl font-semibold text-gray-900">
                {APP_NAME}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>

      {/* Mobile Navigation */}
      <nav className="bg-white border-t border-gray-200 lg:hidden">
        <div className="flex justify-around">
          <NavItem to="/discover" icon={Compass} label="Discover" />
          <NavItem to="/matches" icon={Heart} label="Matches" />
          <NavItem to="/messages" icon={MessageCircle} label="Messages" />
          <NavItem to="/profile" icon={User} label="Profile" />
        </div>
      </nav>

      {/* Desktop Sidebar (hidden on mobile) */}
      <aside className="hidden lg:block fixed left-0 top-16 bottom-0 w-64 bg-white border-r border-gray-200">
        <nav className="p-4 space-y-2">
          <SidebarNavItem to="/discover" icon={Compass} label="Discover" />
          <SidebarNavItem to="/matches" icon={Heart} label="Matches" />
          <SidebarNavItem to="/messages" icon={MessageCircle} label="Messages" />
          <SidebarNavItem to="/profile" icon={User} label="Profile" />
        </nav>
      </aside>

      {/* Desktop Content Offset */}
      <style>{`
        @media (min-width: 1024px) {
          main {
            margin-left: 16rem;
          }
        }
      `}</style>
    </div>
  );
}

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
}

function NavItem({ to, icon: Icon, label }: NavItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          'flex flex-col items-center justify-center py-3 px-6 text-sm font-medium transition-colors',
          isActive
            ? 'text-accent-600'
            : 'text-gray-600 hover:text-gray-900'
        )
      }
    >
      {({ isActive }) => (
        <>
          <Icon className={cn('h-6 w-6 mb-1', isActive && 'fill-current')} />
          <span>{label}</span>
        </>
      )}
    </NavLink>
  );
}

function SidebarNavItem({ to, icon: Icon, label }: NavItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          'flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-colors',
          isActive
            ? 'bg-accent-50 text-accent-700'
            : 'text-gray-700 hover:bg-gray-100'
        )
      }
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </NavLink>
  );
}
