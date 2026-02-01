import SiteHeader from '@/components/common/site-header';

export default function Header() {
  const navItems = [
    { label: '서비스', href: '#service' },
    { label: '후기', href: '#reviews' },
    { label: 'FAQ', href: '#faq' },
    { label: '문의', href: '#contact' },
  ];

  return <SiteHeader navItems={navItems} />;
}
