import Header from '@/app/survey/components/header/Header';
import AuthGuard from '@/components/auth-guard';
import Notice from '@/app/survey/_section/Notice';
import { SurveyProvider } from '@/app/survey/context/SurveyContext';
import ProgressClient from '@/app/survey/components/progress-client/ProgressClient';
import ChatPanelClient from '@/app/survey/components/chat-panel-client/ChatPanelClient';

export default function SurveyPage() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50'>
      <Header />
      <AuthGuard requiredPage='survey' showHeader={false}>
        <div className='container mx-auto px-4 py-6 max-w-7xl'>
          <SurveyProvider>
            <ProgressClient />
            <Notice />
            <ChatPanelClient />
          </SurveyProvider>
        </div>
      </AuthGuard>
    </div>
  );
}
