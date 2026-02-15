import { useEffect, useState } from 'react';

export function useConnectionStatus(isChatError: boolean, chatError: unknown) {
  const [connectionStatus, setConnectionStatus] = useState<'online' | 'offline'>('online');

  useEffect(() => {
    const handleOnline = () => setConnectionStatus('online');
    const handleOffline = () => setConnectionStatus('offline');

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    if (isChatError && chatError) {
      setConnectionStatus('offline');
      return;
    }

    if (!isChatError) {
      setConnectionStatus('online');
    }
  }, [chatError, isChatError]);

  return connectionStatus;
}
