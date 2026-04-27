'use client';

import { Icon } from '@/components/ui/Icon';
import { getBusiness } from '@/lib/api';

export function WhatsAppFloat() {
  const business = getBusiness();
  const phone = business.phones[0];
  const message = encodeURIComponent("Hi Wonder Travel, I'd like to ask about a car rental.");
  const href = `${phone.waLink}?text=${message}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-30 inline-flex items-center justify-center rounded-full bg-success text-white shadow-lg hover:scale-105 transition-transform animate-pulse-soft"
      style={{ width: 56, height: 56 }}
    >
      <Icon name="whatsapp" size={28} className="text-white" />
    </a>
  );
}
