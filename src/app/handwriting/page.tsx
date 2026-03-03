'use client';

import { useRouter } from 'next/navigation';
import { useCard } from '../CardContext';
import { CardPreview } from '../components/CardPreview';

export default function HandwritingPage() {
  const router = useRouter();
  const { card, setStyle } = useCard();

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
              </div>
              <p className="field-helper">
                Blue and sepia tend to feel softer and more like a real pen.
              </p>
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
      </section>
    </div>
  );
}

