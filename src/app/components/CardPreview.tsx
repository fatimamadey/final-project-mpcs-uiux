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

const inkClassMap: Record<CardState['style']['ink'], string> = {
  black: 'card-ink-black',
  blue: 'card-ink-blue',
  sepia: 'card-ink-sepia',
};

export function CardPreview({ card, side }: Props) {
  const backgroundClass = backgroundClassMap[card.style.background];
  const inkClass = inkClassMap[card.style.ink];

  const showPhotoOnFront =
    card.photo && card.photo.placement === 'front' && card.type === 'postcard';

  const showPhotoInside =
    card.photo && card.photo.placement === 'inside' && card.type === 'letter';

  if (side === 'back') {
    return (
      <div className="card-preview-shell">
        <div className={`card card-back ${inkClass}`}>
          <div className="card-decoration" />
          <div className="card-content">
            {card.type === 'postcard' ? (
              <>
                <div className="card-address">
                  <div>{card.address.name || 'Recipient name'}</div>
                  <div>{card.address.street || 'Street address'}</div>
                  <div>
                    {card.address.city || 'City'},{' '}
                    {card.address.postalCode || 'ZIP'}
                  </div>
                </div>
              </>
            ) : (
              <>
                {showPhotoInside && card.photo && (
                  <div className="card-photo card-photo--inside">
                    <div
                      className="card-photo-inner"
                      style={{
                        backgroundImage: `url(${card.photo.url})`,
                      }}
                    />
                  </div>
                )}
                <div
                  className={[
                    'card-message',
                    card.style.handwritten ? 'card-message--handwritten' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  {card.message.trim() ||
                    'Inside spread where your message will live.'}
                </div>
              </>
            )}
            {card.stampId && (
              <div className="card-stamp card-stamp--back">
                <span>{card.stampId}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card-preview-shell">
      <div
        className={[
          'card',
          backgroundClass,
          inkClass,
          card.type === 'letter' ? 'card-letter' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <div className="card-decoration" />
        <div className="card-content">
          {card.type === 'postcard' ? (
            <>
              {card.occasion && (
                <div className="card-occasion">{card.occasion}</div>
              )}
              {showPhotoOnFront && card.photo && (
                <div className="card-photo card-photo--front">
                  <div
                    className="card-photo-inner"
                    style={{
                      backgroundImage: `url(${card.photo.url})`,
                    }}
                  />
                </div>
              )}
              <div
                className={[
                  'card-message',
                  card.style.handwritten ? 'card-message--handwritten' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                {card.message.trim() ||
                  'Write something a little imperfect here.'}
              </div>
            </>
          ) : (
            <>
              <div className="card-occasion">Folded card · front</div>
              <div className="card-message">
                A simple, quiet cover that opens up to your words inside.
              </div>
            </>
          )}
          {card.stampId && (
            <div className="card-stamp card-stamp--front">
              <span>{card.stampId}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

