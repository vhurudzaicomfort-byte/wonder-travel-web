import { BookingStepper } from '@/components/booking/BookingStepper';
import { Step4Review } from '@/components/booking/Step4Review';

export const metadata = { title: 'Book — review', robots: { index: false } };

export default function BookStep4() {
  return (
    <>
      <BookingStepper current={4} />
      <Step4Review />
    </>
  );
}
