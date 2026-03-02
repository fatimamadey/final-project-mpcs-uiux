'use client';

import { CardState } from '../CardContext';

type CardSide = 'front' | 'back';

type Props = {
  card: CardState;
  side: CardSide;
};

const backgroundClassMap: Record<CardState['style']['background'], string> = {
  cream: 'card-background--cream',
  blush: 'card-background--blush',
  sage: 'card-background--sage',
};

export function CardPreview({ card, side }: Props) {
  const backgroundClass = backgroundClassMap[card.style.background];

  if (side === 'back') {
    return (
      <div className="card-preview-shell">
        <div className="card card-back">
          <div className="card-decoration" />
          <div className="card-content">
            <div className="card-address">
              <div>{card.address.name || 'Recipient name'}</div>
              <div>{card.address.street || 'Street address'}</div>
              <div>
                {card.address.city || 'City'},{' '}
                {card.address.postalCode || 'ZIP'}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card-preview-shell">
      <div className={`card ${backgroundClass}`}>
        <div className="card-decoration" />
        <div className="card-content">
          {card.occasion && (
            <div className="card-occasion">{card.occasion}</div>
          )}
          <div
            className={[
              'card-message',
              card.style.handwritten ? 'card-message--handwritten' : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {card.message.trim() || 'Write something a little imperfect here.'}
          </div>
        </div>
      </div>
    </div>
  );
}

