'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCard } from '../CardContext';
import { CardPreview } from '../components/CardPreview';

export default function FinalPreviewPage() {
  const router = useRouter();
  const { card } = useCard();
  const [side, setSide] = useState<'front' | 'back'>('front');

  const handleContinue = () => {
    router.push('/review');
  };

  return (
    <div className="app-shell">
      <section className="app-panel">
        <header>
          <p className="screen-header-eyebrow">Optional · Final Preview</p>
          <h1 className="screen-title">See the finished card.</h1>
          <p className="screen-subtitle">
            Here&apos;s what your postcard or letter will roughly look like in
            real life.
          </p>
        </header>

        <div className="divider-soft" />

        <div className="screen-layout">
          <div className="layout-stack">
            <div className="card-preview-header">
              <span>{card.type === 'postcard' ? 'Postcard' : 'Letter'}</span>
              <div className="card-tab-row">
                <button
                  type="button"
                  className={[
                    'card-tab',
                    side === 'front' ? 'card-tab--active' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  onClick={() => setSide('front')}
                >
                  {card.type === 'postcard' ? 'Front' : 'Outside'}
                </button>
                <button
                  type="button"
                  className={[
                    'card-tab',
                    side === 'back' ? 'card-tab--active' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  onClick={() => setSide('back')}
                >
                  {card.type === 'postcard' ? 'Back' : 'Inside'}
                </button>
              </div>
            </div>

            <div className="final-preview-shell">
              {card.type === 'postcard' ? (
                <div className="final-preview-layout final-preview-layout--postcard">
                  <div className="final-preview-shadow-card">
                    <CardPreview card={card} side={side} />
                  </div>
                </div>
              ) : (
                <div className="final-preview-layout final-preview-layout--letter">
                  <div className="final-preview-letter-outside">
                    <div className="final-preview-letter-stack">
                      {card.photo && (
                        <div className="final-preview-photo-behind">
                          <div className="final-preview-photo-behind-inner" />
                        </div>
                      )}
                      <CardPreview card={card} side="front" />
                    </div>
                  </div>
                  <div className="final-preview-letter-inside">
                    <CardPreview card={card} side="back" />
                  </div>
                </div>
              )}
            </div>
            <p className="final-preview-note">
              Colors and paper texture are approximate, but layout and content
              match what will be printed.
            </p>
          </div>

          <div className="layout-stack">
            <p className="field-label">Done with how it looks?</p>
            <p className="field-helper">
              Feels right? Add an address and send it.
            </p>

            <div className="button-row">
              <button
                type="button"
                className="primary-button"
                onClick={handleContinue}
              >
                Looks Great · Continue
              </button>
              <button
                type="button"
                className="ghost-button"
                onClick={() => router.back()}
              >
                Go Back and Tweak
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

