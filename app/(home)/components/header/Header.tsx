import SiteHeader from '@/components/common/site-header/site-header';

export default function Header() {
  const navItems = [
    { label: '서비스', href: '#service' },
    { label: '후기', href: '#reviews' },
    { label: 'FAQ', href: '#faq' },
    { label: '문의', href: '#contact' },
    { label: '개인정보처리방침', href: '/privacy' },
    { label: '이용약관', href: '/terms' },
  ];

  return <SiteHeader navItems={navItems} />;
}
