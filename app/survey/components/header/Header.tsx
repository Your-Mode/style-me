import SiteHeader from '@/components/common/site-header/site-header';

export default function Header() {
  const navItems = [
    { label: '홈', href: '/public' },
    { label: '서비스', href: '/public#service' },
    { label: '후기', href: '/public#reviews' },
    { label: 'FAQ', href: '/public#faq' },
  ];

  return <SiteHeader brandHref='/public' navItems={navItems} />;
}
