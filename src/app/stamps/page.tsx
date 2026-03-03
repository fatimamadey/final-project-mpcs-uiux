'use client';

import { useRouter } from 'next/navigation';
import { useCard } from '../CardContext';
import { CardPreview } from '../components/CardPreview';

const STAMPS = [
  { id: 'floral', label: 'Floral' },
  { id: 'night', label: 'Night sky' },
  { id: 'wave', label: 'Waves' },
  { id: 'vintage', label: 'Vintage' },
  { id: 'sun', label: 'Warm sun' },
  { id: 'abstract', label: 'Abstract' },
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
          <p className="screen-header-eyebrow">
            Optional · It&apos;s the little things
          </p>
          <h1 className="screen-title">Pick a stamp that feels like them.</h1>
          <p className="screen-subtitle">
            A little detail that makes the letter feel more personal.
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
                    onClick={() => setStamp(selected ? undefined : stamp.id)}
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
                    <span
                      className={[
                        'card-stamp',
                        'card-stamp--chip',
                        `card-stamp--${stamp.id}`,
                      ].join(' ')}
                    />
                    <span style={{ marginTop: '0.5rem', fontSize: '0.8rem' }}>
                      {stamp.label}
                    </span>
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

