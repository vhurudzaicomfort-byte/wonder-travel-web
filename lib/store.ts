'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type BookingTrip = {
  pickupLocationId: string;
  dropoffLocationId: string;
  pickupDate: string;
  pickupTime: string;
  returnDate: string;
  returnTime: string;
  sameDropoff: boolean;
};

export type BookingDriver = {
  firstName: string;
  lastName: string;
  dob: string;
  email: string;
  phone: string;
  idNumber: string;
  licenceNumber: string;
  licenceCountry: string;
  licenceHeldSince: string;
  street: string;
  city: string;
  country: string;
  addAdditionalDriver: boolean;
};

export type BookingState = {
  vehicleSlug: string | null;
  trip: Partial<BookingTrip>;
  driver: Partial<BookingDriver>;
  extras: string[];
  termsAccepted: boolean;
  paymentMethod: string | null;
  bookingRef: string | null;

  setVehicle: (slug: string) => void;
  setTrip: (trip: Partial<BookingTrip>) => void;
  setDriver: (driver: Partial<BookingDriver>) => void;
  toggleExtra: (id: string) => void;
  setTerms: (v: boolean) => void;
  setPaymentMethod: (m: string) => void;
  setBookingRef: (r: string) => void;
  reset: () => void;
};

const initial: Pick<BookingState, 'vehicleSlug' | 'trip' | 'driver' | 'extras' | 'termsAccepted' | 'paymentMethod' | 'bookingRef'> = {
  vehicleSlug: null,
  trip: { sameDropoff: true },
  driver: { licenceCountry: 'ZW', country: 'Zimbabwe' },
  extras: [],
  termsAccepted: false,
  paymentMethod: null,
  bookingRef: null
};

export const useBooking = create<BookingState>()(
  persist(
    (set, get) => ({
      ...initial,
      setVehicle: slug => set({ vehicleSlug: slug }),
      setTrip: trip => set({ trip: { ...get().trip, ...trip } }),
      setDriver: driver => set({ driver: { ...get().driver, ...driver } }),
      toggleExtra: id =>
        set(s => ({
          extras: s.extras.includes(id) ? s.extras.filter(e => e !== id) : [...s.extras, id]
        })),
      setTerms: v => set({ termsAccepted: v }),
      setPaymentMethod: m => set({ paymentMethod: m }),
      setBookingRef: r => set({ bookingRef: r }),
      reset: () => set({ ...initial })
    }),
    {
      name: 'wt-booking',
      storage: createJSONStorage(() => sessionStorage)
    }
  )
);
