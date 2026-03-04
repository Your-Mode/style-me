import SiteHeader from '@/components/common/site-header/site-header';
import { PRIVACY_POLICY_PATH, TERMS_OF_SERVICE_PATH } from '@/lib/privacy-consent';

export default function Header() {
  const navItems = [
    { label: '서비스', href: '#service' },
    { label: '후기', href: '#reviews' },
    { label: 'FAQ', href: '#faq' },
    { label: '문의', href: '#contact' },
    { label: '개인정보처리방침', href: PRIVACY_POLICY_PATH },
    { label: '이용약관', href: TERMS_OF_SERVICE_PATH },
  ];

  return <SiteHeader navItems={navItems} />;
}
