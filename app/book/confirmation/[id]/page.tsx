import { Confirmation } from '@/components/booking/Confirmation';

export const metadata = { title: 'Booking confirmed', robots: { index: false } };

export default function ConfirmationPage({ params }: { params: { id: string } }) {
  return <Confirmation bookingRef={params.id} />;
}
