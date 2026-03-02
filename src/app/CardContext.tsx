'use client';

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
} from 'react';

type CardBackground = 'cream' | 'blush' | 'sage';
type CardFont = 'tidy' | 'handwritten' | 'typewriter';

export type CardStyle = {
  background: CardBackground;
  font: CardFont;
  handwritten: boolean;
};

export type CardAddress = {
  name: string;
  street: string;
  city: string;
  postalCode: string;
};

export type CardState = {
  occasion?: string;
  message: string;
  style: CardStyle;
  address: CardAddress;
};

type CardContextValue = {
  card: CardState;
  setOccasion: (occasion?: string) => void;
  setMessage: (message: string) => void;
  setStyle: (partial: Partial<CardStyle>) => void;
  setAddress: (partial: Partial<CardAddress>) => void;
  reset: () => void;
};

const defaultCard: CardState = {
  occasion: undefined,
  message: '',
  style: {
    background: 'cream',
    font: 'tidy',
    handwritten: false,
  },
  address: {
    name: '',
    street: '',
    city: '',
    postalCode: '',
  },
};

const CardContext = createContext<CardContextValue | undefined>(undefined);

export function CardProvider({ children }: { children: ReactNode }) {
  const [card, setCard] = useState<CardState>(defaultCard);

  const value = useMemo<CardContextValue>(
    () => ({
      card,
      setOccasion: (occasion) =>
        setCard((prev) => ({
          ...prev,
          occasion,
        })),
      setMessage: (message) =>
        setCard((prev) => ({
          ...prev,
          message,
        })),
      setStyle: (partial) =>
        setCard((prev) => ({
          ...prev,
          style: {
            ...prev.style,
            ...partial,
          },
        })),
      setAddress: (partial) =>
        setCard((prev) => ({
          ...prev,
          address: {
            ...prev.address,
            ...partial,
          },
        })),
      reset: () => setCard(defaultCard),
    }),
    [card],
  );

  return (
    <CardContext.Provider value={value}>{children}</CardContext.Provider>
  );
}

export function useCard() {
  const ctx = useContext(CardContext);
  if (!ctx) {
    throw new Error('useCard must be used within a CardProvider');
  }
  return ctx;
}

