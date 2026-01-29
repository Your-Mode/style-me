'use client';

import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import { overlay } from 'overlay-kit';
import ContactModal from '@/app/(home)/components/contact-modal/ContactModal';

export default function FloatingButton() {
  const handleOpenContactModal = () =>
    overlay.open(({ isOpen, close }) => <ContactModal isOpen={isOpen} setShowContact={close} />);

  return (
    <div className='fixed bottom-8 right-8 flex flex-col space-y-4 z-50'>
      <Button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className='w-14 h-14 rounded-full bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 shadow-2xl text-white'
      >
        ↑
      </Button>
      <Button
        onClick={handleOpenContactModal}
        className='w-14 h-14 rounded-full bg-white hover:bg-rose-50 shadow-2xl border-2 border-rose-200'
      >
        <MessageCircle className='h-6 w-6 text-rose-500' />
      </Button>
    </div>
  );
}
