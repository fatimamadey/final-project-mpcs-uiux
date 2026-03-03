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
  forest: 'card-ink-forest',
  berry: 'card-ink-berry',
  warmgray: 'card-ink-warmgray',
};

export function CardPreview({ card, side }: Props) {
  const backgroundClass = backgroundClassMap[card.style.background];
  const inkClass = inkClassMap[card.style.ink];
  const handwritingClass = card.style.handwritten ? 'card-handwritten' : '';

  const isPostcard = card.type === 'postcard';
  const isLetter = card.type === 'letter';

  if (isPostcard && side === 'front') {
    // Writing + address side of a postcard
    return (
      <div className="card-preview-shell">
        <div
          className={
            ['card', backgroundClass, inkClass, handwritingClass, 'card-postcard-front']
              .filter(Boolean)
              .join(' ')
          }
        >
          <div className="card-decoration card-decoration--postcard" />
          <div className="card-postcard-layout">
            <div className="card-postcard-left">
              <div
                className={[
                  'card-message',
                  card.style.handwritten ? 'card-message--handwritten' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                {card.message.trim() || 'Write a few lines to them here.'}
              </div>
            </div>
            <div className="card-postcard-right">
              {card.stampId && (
                <div
                  className={[
                    'card-stamp',
                    'card-stamp--postcard',
                    `card-stamp--${card.stampId}`,
                  ].join(' ')}
                />
              )}
              <div className="card-address card-address--postcard">
                <div>{card.address.name || 'Recipient name'}</div>
                <div>{card.address.street || 'Street address'}</div>
                <div>
                  {(card.address.city || 'City') +
                    ', ' +
                    (card.address.postalCode || 'ZIP')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isPostcard && side === 'back') {
    // Photo / image side of a postcard
    const hasPhoto = card.photo && card.photo.placement === 'front';
    return (
      <div className="card-preview-shell">
        <div
          className={
            ['card', backgroundClass, handwritingClass, 'card-postcard-back']
              .filter(Boolean)
              .join(' ')
          }
        >
          <div className="card-decoration card-decoration--postcard" />
          <div className="card-photo card-photo--full">
            <div
              className="card-photo-inner"
              style={{
                backgroundImage: hasPhoto
                  ? `url(${card.photo?.url})`
                  : 'linear-gradient(135deg, #fce3ce, #e2d5c6)',
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  if (isLetter && side === 'front') {
    // Letter sheet with folds and writing
    return (
      <div className="card-preview-shell">
        <div
          className={
            ['card', backgroundClass, inkClass, handwritingClass, 'card-letter']
              .filter(Boolean)
              .join(' ')
          }
        >
          <div className="card-decoration card-decoration--letter" />
          <div className="card-letter-folds" />
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
              {card.message.trim() || 'Your letter text will show up here.'}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isLetter && side === 'back') {
    // Envelope front: address centered, stamp top-right
    return (
      <div className="card-preview-shell">
        <div
          className={
            ['card', 'card-envelope', backgroundClass, handwritingClass]
              .filter(Boolean)
              .join(' ')
          }
        >
          <div className="card-decoration card-decoration--envelope" />
          {card.stampId && (
            <div
              className={[
                'card-stamp',
                'card-stamp--envelope',
                `card-stamp--${card.stampId}`,
              ].join(' ')}
            />
          )}
          <div className="card-content card-content--envelope">
            <div className="card-address card-address--envelope">
              <div>{card.address.name || 'Recipient name'}</div>
              <div>{card.address.street || 'Street address'}</div>
              <div>
                {(card.address.city || 'City') +
                  ', ' +
                  (card.address.postalCode || 'ZIP')}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Fallback (should not normally hit): simple card with message
  return (
    <div className="card-preview-shell">
      <div
        className={
          ['card', backgroundClass, inkClass, handwritingClass]
            .filter(Boolean)
            .join(' ')
        }
      >
        <div className="card-decoration" />
        <div className="card-content">
          <div
            className={[
              'card-message',
              card.style.handwritten ? 'card-message--handwritten' : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {card.message.trim() || 'Your message will show up here.'}
          </div>
        </div>
      </div>
    </div>
  );
}

