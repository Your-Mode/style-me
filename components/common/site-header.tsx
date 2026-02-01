import Link from 'next/link';
import BrandMark from '@/components/common/brand-mark';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  href: string;
}

interface SiteHeaderProps {
  brandHref?: string;
  navItems?: NavItem[];
  className?: string;
}

function NavItemLink({ href, label }: NavItem) {
  const classes = 'text-gray-600 hover:text-rose-500 transition-colors font-medium';

  if (href.startsWith('#')) {
    return (
      <a href={href} className={classes}>
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {label}
    </Link>
  );
}

export default function SiteHeader({ brandHref, navItems = [], className }: SiteHeaderProps) {
  return (
    <header
      className={cn(
        'sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-rose-200/50 shadow-sm',
        className,
      )}
    >
      <div className='container mx-auto px-6 py-4 flex justify-between items-center'>
        {brandHref ? (
          <Link href={brandHref}>
            <BrandMark />
          </Link>
        ) : (
          <BrandMark />
        )}
        {navItems.length > 0 ? (
          <nav className='hidden md:flex space-x-8'>
            {navItems.map((item) => (
              <NavItemLink key={`${item.href}-${item.label}`} {...item} />
            ))}
          </nav>
        ) : null}
      </div>
    </header>
  );
}
