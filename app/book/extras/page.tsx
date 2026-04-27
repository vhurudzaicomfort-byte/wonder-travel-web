import { BookingStepper } from '@/components/booking/BookingStepper';
import { Step3Extras } from '@/components/booking/Step3Extras';

export const metadata = { title: 'Book — extras', robots: { index: false } };

export default function BookStep3() {
  return (
    <>
      <BookingStepper current={3} />
      <Step3Extras />
    </>
  );
}
