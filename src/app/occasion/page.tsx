'use client';

import { useRouter } from 'next/navigation';
import { useCard } from '../CardContext';

const OPTIONS = ['Birthday', 'Thank you', 'Miss you', 'Just because'];

export default function OccasionPage() {
  const router = useRouter();
  const { card, setOccasion } = useCard();

  const handleSelect = (option: string) => {
    setOccasion(option);
  };

  const handleNext = () => {
    router.push('/create');
  };

  const handleSkip = () => {
    setOccasion(undefined);
    router.push('/create');
  };

  return (
    <div className="app-shell">
      <section className="app-panel">
        <header>
          <p className="screen-header-eyebrow">Step 1 · Gentle starting point</p>
          <h1 className="screen-title">What&apos;s this card for?</h1>
          <p className="screen-subtitle">
            No need to overthink it—picking a loose occasion can make the first
            sentence a little less intimidating.
          </p>
        </header>

        <div className="divider-soft" />

        <div className="layout-stack">
          <div className="field-group">
            <p className="field-label">Choose an occasion</p>
            <div className="pill-choice-row">
              {OPTIONS.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={[
                    'pill-choice',
                    card.occasion === option ? 'pill-choice--selected' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  onClick={() => handleSelect(option)}
                >
                  <span>{option}</span>
                </button>
              ))}
            </div>
            <p className="field-helper">
              You can always change this later, or ignore it completely.
            </p>
          </div>

          <div className="button-row">
            <button
              type="button"
              className="primary-button"
              onClick={handleNext}
            >
              Continue to writing
            </button>
            <button
              type="button"
              className="secondary-button"
              onClick={handleSkip}
            >
              Skip occasion
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

