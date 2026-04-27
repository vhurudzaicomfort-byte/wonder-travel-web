import { BookingStepper } from '@/components/booking/BookingStepper';
import { Step2Driver } from '@/components/booking/Step2Driver';

export const metadata = { title: 'Book — driver details', robots: { index: false } };

export default function BookStep2() {
  return (
    <>
      <BookingStepper current={2} />
      <Step2Driver />
    </>
  );
}
