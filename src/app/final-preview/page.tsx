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
          <p className="screen-header-eyebrow">
            Optional · One more look before it travels
          </p>
          <h1 className="screen-title">
            See your card as if it&apos;s on the table.
          </h1>
          <p className="screen-subtitle">
            This is roughly how it will feel when someone sets it down next to
            their keys or tucks it into a book.
          </p>
        </header>

        <div className="divider-soft" />

        <div className="screen-layout">
          <div className="layout-stack">
            <div className="card-preview-header">
              <span>High‑fidelity preview</span>
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
                  {card.type === 'postcard' ? 'Front' : 'Cover'}
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
              <div className="final-preview-card">
                <CardPreview card={card} side={side} />
              </div>
            </div>
            <p className="final-preview-note">
              Edges, textures, and tiny imperfections will vary—just like real
              paper.
            </p>
          </div>

          <div className="layout-stack">
            <p className="field-label">What happens next</p>
            <p className="field-helper">
              From here, your words will be printed on warm stock, paired with
              your chosen stamp and ink style, and dropped into the real mail.
            </p>
            <p className="field-helper">
              If anything feels off, you can always hop back to the writing
              step. Most people end up overthinking more than they need to.
            </p>

            <div className="button-row">
              <button
                type="button"
                className="primary-button"
                onClick={handleContinue}
              >
                Looks right · continue
              </button>
              <button
                type="button"
                className="ghost-button"
                onClick={() => router.back()}
              >
                Go back and tweak
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

