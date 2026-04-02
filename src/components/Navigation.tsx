'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/i18n/context';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const navKeys = [
  { href: '/', key: 'home', emoji: '🏠' },
  { href: '/plan', key: 'plan', emoji: '📅' },
  { href: '/diary', key: 'diary', emoji: '📓' },
  { href: '/learn', key: 'learn', emoji: '📖' },
  { href: '/reference', key: 'more', emoji: '⚠️' },
];

export default function Navigation() {
  const pathname = usePathname();
  const dict = useTranslation();
  const nav = dict.nav || {};

  return (
    <>
      {/* Language switcher floating top-right */}
      <div className="fixed top-3 right-3 z-50">
        <div className="bg-green-dark/80 backdrop-blur-sm rounded-xl p-1">
          <LanguageSwitcher />
        </div>
      </div>

      {/* Bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-cream-dark z-50 safe-area-bottom">
        <div className="max-w-lg mx-auto grid grid-cols-5">
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
