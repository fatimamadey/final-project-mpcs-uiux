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
type InkColor = 'black' | 'blue' | 'sepia';
type CardType = 'postcard' | 'letter';

export type CardStyle = {
  background: CardBackground;
  font: CardFont;
  handwritten: boolean;
  ink: InkColor;
};

export type CardAddress = {
  name: string;
  street: string;
  city: string;
  postalCode: string;
};

export type CardPhotoPlacement = 'front' | 'inside';

export type CardPhoto = {
  url: string;
  placement: CardPhotoPlacement;
};

export type CardState = {
  occasion?: string;
  message: string;
  style: CardStyle;
  address: CardAddress;
  type: CardType;
  photo?: CardPhoto;
  stampId?: string;
};

type CardContextValue = {
  card: CardState;
  setOccasion: (occasion?: string) => void;
  setMessage: (message: string) => void;
  setStyle: (partial: Partial<CardStyle>) => void;
  setAddress: (partial: Partial<CardAddress>) => void;
  setType: (type: CardType) => void;
  setPhoto: (photo?: CardPhoto) => void;
  setStamp: (stampId?: string) => void;
  reset: () => void;
};

const defaultCard: CardState = {
  occasion: undefined,
  message: '',
  style: {
    background: 'cream',
    font: 'tidy',
    handwritten: false,
    ink: 'sepia',
  },
  address: {
    name: '',
    street: '',
    city: '',
    postalCode: '',
  },
  type: 'postcard',
  photo: undefined,
  stampId: undefined,
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
      setType: (type) =>
        setCard((prev) => ({
          ...prev,
          type,
        })),
      setPhoto: (photo) =>
        setCard((prev) => ({
          ...prev,
          photo,
        })),
      setStamp: (stampId) =>
        setCard((prev) => ({
          ...prev,
          stampId,
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

