import { BookingStepper } from '@/components/booking/BookingStepper';
import { Step5Payment } from '@/components/booking/Step5Payment';

export const metadata = { title: 'Book — payment', robots: { index: false } };

export default function BookStep5() {
  return (
    <>
      <BookingStepper current={5} />
      <Step5Payment />
    </>
  );
}
