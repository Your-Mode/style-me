import { Button } from '@/components/ui/button';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Bot, CheckCircle, Loader2, Send, Wifi, WifiOff, XCircle } from 'lucide-react';
import type { ChatMessage } from '@/apis/chat';
import type { RefObject } from 'react';

interface ChatPanelProps {
  messages: ChatMessage[];
  lastResponseStatus: 'success' | 'failed' | null;
  connectionStatus: 'online' | 'offline';
  isLoading: boolean;
  isProcessing: boolean;
  inputMessage: string;
  onInputChange: (value: string) => void;
  onSend: () => void;
  onKeyDown: (event: React.KeyboardEvent) => void;
  chatEndRef: RefObject<HTMLDivElement | null>;
  inputRef: RefObject<HTMLInputElement | null>;
}

export default function ChatPanel({
  messages,
  lastResponseStatus,
  connectionStatus,
  isLoading,
  isProcessing,
  inputMessage,
  onInputChange,
  onSend,
  onKeyDown,
  chatEndRef,
  inputRef,
}: ChatPanelProps) {
  return (
    <div className='bg-white/90 backdrop-blur-sm shadow-xl flex flex-col h-[70vh]'>
      <CardHeader className='bg-gradient-to-r from-pink-400 to-purple-500 text-white p-4 rounded-t-lg'>
        <CardTitle className='flex items-center text-lg font-bold'>
          <Bot className='h-5 w-5 mr-2' />
          스타일 AI
          <div className='ml-auto flex items-center space-x-2'>
            {lastResponseStatus === 'success' && <CheckCircle className='h-4 w-4 text-green-200' />}
            {lastResponseStatus === 'failed' && <XCircle className='h-4 w-4 text-red-200' />}
            {connectionStatus === 'offline' ? (
              <WifiOff className='h-4 w-4 text-red-200' />
            ) : (
              <Wifi className='h-4 w-4 text-green-200' />
            )}
            {(isLoading || isProcessing) && <Loader2 className='h-4 w-4 animate-spin' />}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className='flex-1 flex flex-col p-4 overflow-hidden'>
        <div className='flex-1 overflow-y-auto space-y-3 pr-2'>
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`rounded-xl p-3 text-sm md:text-base max-w-[80%] ${
                  m.type === 'bot'
                    ? 'bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-200'
                    : m.type === 'system'
                      ? 'bg-blue-50 border border-blue-200 text-blue-600'
                      : 'bg-rose-100 border border-rose-200'
                }`}
              >
                <pre className='whitespace-pre-line font-sans'>{m.content}</pre>
                <span className='block text-xs text-right mt-1 text-gray-500'>{m.timestamp.toLocaleTimeString()}</span>
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        <div className='mt-3 flex space-x-2'>
          <Input
            ref={inputRef}
            value={inputMessage}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder={
              lastResponseStatus === 'failed'
                ? '더 구체적으로 답변해주세요...'
                : connectionStatus === 'offline'
                  ? '오프라인 모드 (기본 분석)'
                  : '대화로 답변해보세요...'
            }
            disabled={isLoading || isProcessing}
            className='flex-1'
          />
          <Button onClick={onSend} disabled={isLoading || isProcessing || !inputMessage.trim()}>
            {isLoading ? <Loader2 className='h-4 w-4 animate-spin' /> : <Send className='h-4 w-4' />}
          </Button>
        </div>
        <p className='text-xs mt-1 text-gray-500'>
          Enter 로 전송 •{' '}
          {lastResponseStatus === 'failed'
            ? '답변을 다시 해주세요'
            : connectionStatus === 'offline'
              ? '오프라인 모드 (기본 분석 사용)'
              : isLoading || isProcessing
                ? '처리 중...'
                : 'AI가 답변을 분석해드려요'}
        </p>
      </CardContent>
    </div>
  );
}
