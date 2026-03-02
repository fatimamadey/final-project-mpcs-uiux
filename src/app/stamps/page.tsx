'use client';

import { useRouter } from 'next/navigation';
import { useCard } from '../CardContext';
import { CardPreview } from '../components/CardPreview';

const STAMPS = [
  { id: 'Floral', label: 'Floral', emoji: '🌸' },
  { id: 'Moon', label: 'Night sky', emoji: '🌙' },
  { id: 'Wave', label: 'Waves', emoji: '🌊' },
  { id: 'Vintage', label: 'Vintage', emoji: '📮' },
  { id: 'Sun', label: 'Warm sun', emoji: '☀️' },
  { id: 'Abstract', label: 'Abstract', emoji: '🌀' },
];

export default function StampsPage() {
  const router = useRouter();
  const { card, setStamp } = useCard();

  const handleConfirm = () => {
    router.push('/review');
  };

  const handleSkip = () => {
    setStamp(undefined);
    router.push('/review');
  };

  return (
    <div className="app-shell">
      <section className="app-panel">
        <header>
          <p className="screen-header-eyebrow">Optional · Little joyful details</p>
          <h1 className="screen-title">Pick a stamp that feels like them.</h1>
          <p className="screen-subtitle">
            A tiny square of ink, but somehow it changes the whole mood of the
            card.
          </p>
        </header>

        <div className="divider-soft" />

        <div className="screen-layout">
          <div className="layout-stack">
            <p className="field-label">Stamps</p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(90px, 1fr))',
                gap: '0.75rem',
              }}
            >
              {STAMPS.map((stamp) => {
                const selected = card.stampId === stamp.id;
                return (
                  <button
                    key={stamp.id}
                    type="button"
                    onClick={() =>
                      setStamp(selected ? undefined : stamp.id)
                    }
                    className="pill-choice"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingBlock: '0.7rem',
                      borderStyle: selected ? 'solid' : 'dashed',
                    }}
                  >
                    <span style={{ fontSize: '1.3rem' }}>{stamp.emoji}</span>
                    <span style={{ marginTop: '0.3rem' }}>{stamp.label}</span>
                  </button>
                );
              })}
            </div>
            <p className="muted-note">
              Tap once to try it on the card, tap again to clear.
            </p>

            <div className="button-row">
              <button
                type="button"
                className="primary-button"
                onClick={handleConfirm}
              >
                Looks good
              </button>
              <button
                type="button"
                className="secondary-button"
                onClick={handleSkip}
              >
                Skip stamps
              </button>
            </div>
          </div>

          <div className="layout-stack">
            <p className="field-label">Live card preview</p>
            <CardPreview card={card} side="front" />
            <p className="muted-note">
              We&apos;ll print the real postage too—this is just the fun part.
            </p>
          </div>
        </div>

        <div className="button-row" style={{ marginTop: '1.75rem' }}>
          <button
            type="button"
            className="ghost-button"
            onClick={() => router.back()}
          >
            Go back
          </button>
        </div>
      </section>
    </div>
  );
}

