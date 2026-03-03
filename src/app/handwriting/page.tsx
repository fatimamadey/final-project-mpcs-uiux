'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCard } from '../CardContext';
import { CardPreview } from '../components/CardPreview';

export default function HandwritingPage() {
  const router = useRouter();
  const { card, setStyle } = useCard();
  const [showHandwritingModal, setShowHandwritingModal] = useState(false);

  const handleBackToWriting = () => {
    router.push('/create');
  };

  return (
    <div className="app-shell">
      <section className="app-panel">
        <header>
          <p className="screen-header-eyebrow">
            Optional · How your words will feel on paper
          </p>
          <h1 className="screen-title">
            Try out handwriting and ink styles.
          </h1>
          <p className="screen-subtitle">
            Same message, slightly different vibe. Pick the one you like best.
          </p>
        </header>

        <div className="divider-soft" />

        <div className="screen-layout">
          <div className="layout-stack">
            <div className="field-group">
              <p className="field-label">Text style</p>
              <div className="pill-toggle-row">
                <button
                  type="button"
                  className={[
                    'pill-toggle-option',
                    !card.style.handwritten
                      ? 'pill-toggle-option--active'
                      : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  onClick={() =>
                    setStyle({ handwritten: false, font: 'tidy' })
                  }
                >
                  Typed
                </button>
                <button
                  type="button"
                  className={[
                    'pill-toggle-option',
                    card.style.handwritten
                      ? 'pill-toggle-option--active'
                      : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  onClick={() =>
                    setStyle({ handwritten: true, font: 'handwritten' })
                  }
                >
                  Handwritten
                </button>
              </div>
            </div>

            <div className="field-group">
              <p className="field-label">Ink color</p>
              <div className="pill-choice-row">
                <button
                  type="button"
                  className={[
                    'pill-choice',
                    card.style.ink === 'black' ? 'pill-choice--selected' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  onClick={() => setStyle({ ink: 'black' })}
                >
                  <span>Black</span>
                </button>
                <button
                  type="button"
                  className={[
                    'pill-choice',
                    card.style.ink === 'blue' ? 'pill-choice--selected' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  onClick={() => setStyle({ ink: 'blue' })}
                >
                  <span>Blue</span>
                </button>
                <button
                  type="button"
                  className={[
                    'pill-choice',
                    card.style.ink === 'sepia' ? 'pill-choice--selected' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  onClick={() => setStyle({ ink: 'sepia' })}
                >
                  <span>Sepia</span>
                </button>
                <button
                  type="button"
                  className={[
                    'pill-choice',
                    card.style.ink === 'forest' ? 'pill-choice--selected' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  onClick={() => setStyle({ ink: 'forest' })}
                >
                  <span>Forest</span>
                </button>
                <button
                  type="button"
                  className={[
                    'pill-choice',
                    card.style.ink === 'berry' ? 'pill-choice--selected' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  onClick={() => setStyle({ ink: 'berry' })}
                >
                  <span>Berry</span>
                </button>
                <button
                  type="button"
                  className={[
                    'pill-choice',
                    card.style.ink === 'warmgray'
                      ? 'pill-choice--selected'
                      : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  onClick={() => setStyle({ ink: 'warmgray' })}
                >
                  <span>Warm gray</span>
                </button>
              </div>
              <p className="field-helper">
                Blue and sepia tend to feel softer and more like a real pen.
              </p>
            </div>

            <div className="field-group">
              <p className="field-label">Personal handwriting (optional)</p>
              <p className="field-helper">
                One day soon you&apos;ll be able to upload a few samples and we&apos;ll match your real handwriting.
              </p>
              <div className="button-row" style={{ marginTop: '0.75rem' }}>
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => setShowHandwritingModal(true)}
                >
                  Record your own handwriting
                </button>
              </div>
            </div>

            <div className="button-row">
              <button
                type="button"
                className="primary-button"
                onClick={handleBackToWriting}
              >
                Use these Settings
              </button>
              <button
                type="button"
                className="secondary-button"
                onClick={() => router.back()}
              >
                Go back
              </button>
            </div>
          </div>

          <div className="layout-stack">
            <p className="field-label">Handwriting Preview</p>
            <CardPreview card={card} side="front" />
          </div>
        </div>

        {showHandwritingModal && (
          <div className="modal-backdrop">
            <div className="modal">
              <p className="modal-title">Personal handwriting is coming soon</p>
              <p className="modal-body">
                In the future, you&apos;ll be able to record your own handwriting so we can mimic it on every card. For now, you can keep using the built-in handwriting style.
              </p>
              <div className="button-row" style={{ marginTop: '1rem' }}>
                <button
                  type="button"
                  className="primary-button"
                  onClick={() => setShowHandwritingModal(false)}
                >
                  Got it
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

