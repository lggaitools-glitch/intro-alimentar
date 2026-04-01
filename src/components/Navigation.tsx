'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Inicio', emoji: '🏠' },
  { href: '/plan', label: 'Plan', emoji: '📅' },
  { href: '/diary', label: 'Diario', emoji: '📓' },
  { href: '/learn', label: 'Aprender', emoji: '📖' },
  { href: '/reference', label: 'Más', emoji: '⚠️' },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-cream-dark z-50 safe-area-bottom">
      <div className="max-w-lg mx-auto grid grid-cols-5">
        {navItems.map(item => {
          const isActive = item.href === '/'
            ? pathname === '/'
            : pathname.startsWith(item.href);
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
                {item.label}
              </span>
              {isActive && (
                <span className="absolute bottom-1 w-1 h-1 rounded-full bg-green-app" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
