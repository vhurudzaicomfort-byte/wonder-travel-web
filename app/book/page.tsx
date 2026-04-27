import { BookingStepper } from '@/components/booking/BookingStepper';
import { Step1Trip } from '@/components/booking/Step1Trip';

export const metadata = { title: 'Book — trip details', robots: { index: false } };

export default function BookStep1() {
  return (
    <>
      <BookingStepper current={1} />
      <Step1Trip />
    </>
  );
}
