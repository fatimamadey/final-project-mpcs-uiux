'use client';

import { useRouter } from 'next/navigation';
import { CardPreview } from '../components/CardPreview';
import { useCard } from '../CardContext';

export default function CardTypePage() {
  const router = useRouter();
  const { card, setType } = useCard();

  const handleConfirm = () => {
    router.push('/create');
  };

  return (
    <div className="app-shell">
      <section className="app-panel">
        <header>
          <p className="screen-header-eyebrow">
            Optional · What kind of paper moment?
          </p>
          <h1 className="screen-title">
            Postcard or folded letter, your choice.
          </h1>
          <p className="screen-subtitle">
            This doesn&apos;t change your words—it just changes how they arrive
            in someone&apos;s hands.
          </p>
        </header>

        <div className="divider-soft" />

        <div className="screen-layout">
          <div className="layout-stack">
            <div className="field-group">
              <p className="field-label">Choose a format</p>
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
                  <span>Folded letter</span>
                </button>
              </div>
              <p className="field-helper">
                Postcards feel casual and bright; folded cards feel a bit more
                like a keepsake.
              </p>
            </div>

            <div className="button-row">
              <button
                type="button"
                className="primary-button"
                onClick={handleConfirm}
              >
                Looks good · back to writing
              </button>
              <button
                type="button"
                className="ghost-button"
                onClick={() => router.back()}
              >
                Never mind, keep things simple
              </button>
            </div>
          </div>

          <div className="layout-stack">
            <p className="field-label">How it will roughly feel</p>
            <CardPreview card={card} side="front" />
            <p className="muted-note">
              Postcards show your words right away; letters open up into them.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

