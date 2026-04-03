'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/i18n/context';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const navKeys = [
  { href: '/', key: 'home', emoji: '🏠' },
  { href: '/plan', key: 'plan', emoji: '📅' },
  { href: '/diary', key: 'diary', emoji: '📓' },
  { href: '/blog', key: 'blog', emoji: '📝' },
  { href: '/learn', key: 'learn', emoji: '📖' },
  { href: '/reference', key: 'more', emoji: '⚠️' },
];

export default function Navigation() {
  const pathname = usePathname();
  const dict = useTranslation();
  const nav = dict.nav || {};
  const { user, signOut, supabaseAvailable } = useAuth();
  const { profile } = useProfile();

  return (
    <>
      {/* Top bar: language switcher + auth */}
      <div className="fixed top-3 right-3 z-50 flex items-center gap-2">
        {supabaseAvailable && (
          <div className="bg-white/90 backdrop-blur-sm rounded-xl px-3 py-1.5 shadow-sm border border-cream-dark flex items-center gap-2 text-xs">
            {user ? (
              <>
                <Link href="/account" className="text-text-secondary truncate max-w-[120px] hover:text-green-dark transition">
                  {profile.name || user.email}
                </Link>
                <button
                  onClick={() => signOut()}
                  className="text-red-app hover:underline font-medium"
                >
                  Salir
                </button>
              </>
            ) : (
              <Link href="/auth" className="text-green-dark font-medium hover:underline">
                Iniciar sesión
              </Link>
            )}
          </div>
        )}
        <div className="bg-green-dark/80 backdrop-blur-sm rounded-xl p-1">
          <LanguageSwitcher />
        </div>
      </div>

      {/* Bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-cream-dark z-50 safe-area-bottom">
        <div className="max-w-lg mx-auto grid grid-cols-6">
          {navKeys.map(item => {
            const isActive = item.href === '/'
              ? pathname === '/'
              : pathname.startsWith(item.href);
            const label = nav[item.key] || item.key;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex flex-col items-center justify-center py-2 gap-0.5 transition-all active:scale-95',
                  isActive
                    ? 'text-green-dark'
                    : 'text-text-muted'
                )}
              >
                <span className={cn(
                  'text-xl transition-transform',
                  isActive && 'scale-110'
                )}>
                  {item.emoji}
                </span>
                <span className={cn(
                  'text-[10px] leading-tight',
                  isActive ? 'font-bold' : 'font-medium'
                )}>
                  {label}
                </span>
                {isActive && (
                  <span className="absolute bottom-1 w-1 h-1 rounded-full bg-green-app" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
