'use client';

import { useRouter } from 'next/navigation';
import { useCard } from '../CardContext';

const OPTIONS = ['Birthday', 'Thank You', 'Miss You', 'Just Because'];

export default function OccasionPage() {
  const router = useRouter();
  const { card, setOccasion, setType } = useCard();

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
          <p className="screen-header-eyebrow">Step 1</p>
          <h1 className="screen-title">What are you sending?</h1>
          <p className="screen-subtitle">
            Pick a rough reason and format. You can change it later.
          </p>
        </header>

        <div className="divider-soft" />

        <div className="layout-stack">
          <div className="field-group">
            <p className="field-label">Occasion</p>
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
              This just helps you get started. It&apos;s optional.
            </p>
          </div>

          <div className="field-group">
            <p className="field-label">Format</p>
            <div className="pill-choice-row">
              <button
                type="button"
                className={[
                  'pill-choice',
                  card.type === 'postcard' ? 'pill-choice--selected' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => setType('postcard')}
              >
                <span>Postcard</span>
              </button>
              <button
                type="button"
                className={[
                  'pill-choice',
                  card.type === 'letter' ? 'pill-choice--selected' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => setType('letter')}
              >
                <span>Letter</span>
              </button>
            </div>
            <p className="field-helper">
              Postcard shows message on the back. Letter opens up to it.
            </p>
          </div>

          <div className="button-row">
            <button
              type="button"
              className="primary-button"
              onClick={handleNext}
            >
              Continue to Writing
            </button>
            <button
              type="button"
              className="secondary-button"
              onClick={handleSkip}
            >
              Skip Occasion
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

