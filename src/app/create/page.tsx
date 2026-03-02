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
    refined = `${refined}\n\nI really mean all of this — I&apos;m grateful for you.`;
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
  };

  const handleNext = () => {
    router.push('/review');
  };

  return (
    <div className="app-shell">
      <section className="app-panel">
        <header>
          <p className="screen-header-eyebrow">
            Step 2 · Write like yourself
          </p>
          <h1 className="screen-title">Let&apos;s write your card.</h1>
          <p className="screen-subtitle">
            Start with whatever comes to mind. You can polish later—or not at
            all. The point is that it&apos;s from you.
          </p>
        </header>

        <div className="divider-soft" />

        <div className="screen-layout">
          <div className="layout-stack">
            <div className="field-group">
              <p className="field-label">Your message</p>
              <textarea
                className="textarea"
                placeholder="Write a few lines you might put in a real handwritten card..."
                value={card.message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <p className="field-helper">
                Don&apos;t worry about sounding perfect. Think about how you&apos;d
                explain this out loud.
              </p>
            </div>

            <div className="field-group">
              <p className="field-label">Handwriting + mood</p>
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
                    Typed look
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
                    Handwritten style
                  </button>
                </div>
                <p className="muted-note">
                  Visual only for now—either way, it&apos;s still your words.
                </p>
              </div>
            </div>

            <div className="button-row">
              <button
                type="button"
                className="primary-button"
                onClick={handleNext}
                disabled={!card.message.trim()}
              >
                Looks good · continue
              </button>
              <button
                type="button"
                className="ghost-button"
                onClick={handleNext}
              >
                I&apos;ll tweak it later
              </button>
            </div>
          </div>

          <div className="layout-stack">
            <div className="card-preview-header">
              <span>Postcard preview</span>
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
                  Front · your words
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
                  Back · address
                </button>
              </div>
            </div>

            <CardPreview card={card} side={side} />

            <div className="divider-soft" />

            <div className="field-group">
              <p className="field-label">Need a nudge?</p>
              <p className="field-helper">
                We&apos;ll gently suggest an edit based on what you wrote. It
                won&apos;t start from scratch or overwrite anything unless you
                say so.
              </p>

              <div className="button-row" style={{ marginTop: '1rem' }}>
                <button
                  type="button"
                  className="secondary-button"
                  onClick={handleRefine}
                  disabled={!canRefine}
                >
                  Help me say this better
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
                    <p className="field-label">A gentle alternative</p>
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

