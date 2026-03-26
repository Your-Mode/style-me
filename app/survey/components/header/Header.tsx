import SiteHeader from '@/components/common/site-header/site-header';
import { PRIVACY_POLICY_PATH, TERMS_OF_SERVICE_PATH } from '@/lib/privacy-consent';

export default function Header() {
  const navItems = [
    { label: '홈', href: '/public' },
    { label: '서비스', href: '/public#service' },
    { label: '후기', href: '/public#reviews' },
    { label: 'FAQ', href: '/public#faq' },
    { label: '개인정보처리방침', href: PRIVACY_POLICY_PATH },
    { label: '이용약관', href: TERMS_OF_SERVICE_PATH },
  ];

  return <SiteHeader brandHref='/public' navItems={navItems} />;
}
