'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCard } from '../CardContext';
import { CardPreview } from '../components/CardPreview';

function refineMessage(original: string): string {
  if (!original.trim()) return '';

  const trimmed = original.trim();

  // Simple, gentle refinement: soften openings and add a warm closing if missing.
  let refined = trimmed;

  if (!/^(hi|hey|dear)/i.test(trimmed)) {
    refined = `Hey,\n\n${refined}`;
  }

  if (!/(love|with love|thinking of you|grateful|appreciate)/i.test(trimmed)) {
    refined = `${refined}\n\nI really mean all of this — I'm grateful for you.`;
  }

  return refined;
}

export default function CreatePage() {
  const router = useRouter();
  const { card, setMessage, setStyle } = useCard();
  const [side, setSide] = useState<'front' | 'back'>('front');
  const [suggestion, setSuggestion] = useState<string>('');
  const [hasRequestedSuggestion, setHasRequestedSuggestion] =
    useState<boolean>(false);

  const canRefine = useMemo(() => card.message.trim().length > 0, [card]);

  const handleRefine = () => {
    if (!canRefine) return;
    const suggestionText = refineMessage(card.message);
    setSuggestion(suggestionText);
    setHasRequestedSuggestion(true);
  };

  const handleAcceptSuggestion = () => {
    if (!suggestion) return;
    setMessage(suggestion.replace(/&apos;/g, "'"));
    setHasRequestedSuggestion(false);
    setSuggestion('');
  };

  const handleNext = () => {
    router.push('/review');
  };

  return (
    <div className="app-shell">
      <section className="app-panel">
        <header>
          <p className="screen-header-eyebrow">Step 2</p>
          <h1 className="screen-title">Write your message.</h1>
          <p className="screen-subtitle">
            We can tidy it up if you want.
          </p>
        </header>

        <div className="divider-soft" />

        <div className="screen-layout">
          <div className="layout-stack">
            <div className="field-group">
              <p className="field-label">Your message</p>
              <textarea
                className="textarea"
                placeholder="What do you want to say?"
                value={card.message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            <div className="field-group">
              <p className="field-label">Handwriting + Theme</p>
              <div className="pill-choice-row">
                <button
                  type="button"
                  className={[
                    'pill-choice',
                    card.style.background === 'cream'
                      ? 'pill-choice--selected'
                      : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  onClick={() => setStyle({ background: 'cream' })}
                >
                  <span>Cream paper</span>
                </button>
                <button
                  type="button"
                  className={[
                    'pill-choice',
                    card.style.background === 'blush'
                      ? 'pill-choice--selected'
                      : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  onClick={() => setStyle({ background: 'blush' })}
                >
                  <span>Blush</span>
                </button>
                <button
                  type="button"
                  className={[
                    'pill-choice',
                    card.style.background === 'sage'
                      ? 'pill-choice--selected'
                      : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  onClick={() => setStyle({ background: 'sage' })}
                >
                  <span>Sage</span>
                </button>
              </div>

              <div
                style={{
                  marginTop: '0.75rem',
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.75rem',
                  alignItems: 'center',
                }}
              >
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
            </div>

            <div className="button-row">
              <button
                type="button"
                className="primary-button"
                onClick={handleNext}
                disabled={!card.message.trim()}
              >
                Continue
              </button>
              <button
                type="button"
                className="ghost-button"
                onClick={handleNext}
              >
                Skip for now
              </button>
            </div>
            <p className="muted-note">
              You can add a photo, stamp, or tweak the look. None of that
              is required though.
            </p>
            <div className="field-group">
              <p className="field-label">Optional finishing touches</p>
              <div className="button-row" style={{ marginTop: '0.75rem' }}>
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => router.push('/photo')}
                >
                  Add a Photo
                </button>
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => router.push('/stamps')}
                >
                  Pick a Stamp
                </button>
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => router.push('/handwriting')}
                >
                  Handwriting &amp; Ink
                </button>
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => router.push('/final-preview')}
                >
                  Preview
                </button>
              </div>
            </div>
          </div>

          <div className="layout-stack">
            <div className="card-preview-header">
            <p className="field-label">Preview</p>

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
                  Front
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
                  Back
                </button>
              </div>
            </div>

            <CardPreview card={card} side={side} />

            <div className="divider-soft" />

            <div className="field-group">
              <p className="field-label">Need a nudge?</p>
              <p className="field-helper">
                We&apos;ll suggest a cleaner version of what you wrote with AI. 
              </p>

              <div className="button-row" style={{ marginTop: '1rem' }}>
                <button
                  type="button"
                  className="secondary-button"
                  onClick={handleRefine}
                  disabled={!canRefine}
                >
                  Suggest a Clearer Version
                </button>
              </div>

              {hasRequestedSuggestion && (
                <div className="card-message-columns">
                  <div>
                    <p className="field-label">What you wrote</p>
                    <div className="textarea" style={{ minHeight: 140 }}>
                      <p className="card-message">{card.message || '—'}</p>
                    </div>
                  </div>
                  <div>
                    <p className="field-label">An alternative</p>
                    <div className="textarea" style={{ minHeight: 140 }}>
                      <p className="card-message">
                        {suggestion || 'We&apos;ll show a suggestion here.'}
                      </p>
                    </div>
                    <div className="button-row" style={{ marginTop: '0.8rem' }}>
                      <button
                        type="button"
                        className="primary-button"
                        disabled={!suggestion}
                        onClick={handleAcceptSuggestion}
                      >
                        Use this wording
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

