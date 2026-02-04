import Header from '@/app/survey/components/header/Header';
import AuthGuard from '@/components/auth-guard';
import Notice from '@/app/survey/_section/Notice';
import { SurveyProvider } from '@/app/survey/context/SurveyContext';
import ProgressClient from '@/app/survey/components/progress-client/ProgressClient';
import ChatPanelClient from '@/app/survey/components/chat-panel-client/ChatPanelClient';
import PageBackground from '@/components/common/page-background/page-background';
import PageContainer from '@/components/common/page-container/page-container';

export default function SurveyPage() {
  return (
    <PageBackground className='bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50'>
      <Header />
      <AuthGuard requiredPage='survey' showHeader={false}>
        <PageContainer className='px-4 py-6 max-w-7xl'>
          <SurveyProvider>
            <ProgressClient />
            <Notice />
            <ChatPanelClient />
          </SurveyProvider>
        </PageContainer>
      </AuthGuard>
    </PageBackground>
  );
}
