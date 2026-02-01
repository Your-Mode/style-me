import SiteHeader from '@/components/common/site-header';

export default function Header() {
  const navItems = [
    { label: '홈', href: '/' },
    { label: '다시 진단', href: '/survey' },
    { label: '서비스', href: '/#service' },
    { label: 'FAQ', href: '/#faq' },
  ];

  return <SiteHeader brandHref='/' navItems={navItems} />;
}
