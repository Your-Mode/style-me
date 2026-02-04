'use client';

import ChatPanel from '@/app/survey/_section/ChatPanel';
import { useSurveyContext } from '@/app/survey/context/SurveyContext';

export default function ChatPanelClient() {
  const {
    messages,
    lastResponseStatus,
    connectionStatus,
    isLoading,
    isProcessing,
    inputMessage,
    setInputMessage,
    handleSend,
    handleKeyDown,
    chatEndRef,
    inputRef,
  } = useSurveyContext();

  return (
    <ChatPanel
      messages={messages}
      lastResponseStatus={lastResponseStatus}
      connectionStatus={connectionStatus}
      isLoading={isLoading}
      isProcessing={isProcessing}
      inputMessage={inputMessage}
      onInputChange={setInputMessage}
      onSend={handleSend}
      onKeyDown={handleKeyDown}
      chatEndRef={chatEndRef}
      inputRef={inputRef}
    />
  );
}
