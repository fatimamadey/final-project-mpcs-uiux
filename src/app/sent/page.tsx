'use client';

import { useRouter } from 'next/navigation';
import { useCard } from '../CardContext';

export default function SentPage() {
  const router = useRouter();
  const { reset } = useCard();

  const handleSendAnother = () => {
    reset();
    router.push('/');
  };

  const handleBackHome = () => {
    router.push('/');
  };

  return (
    <div className="app-shell">
      <section className="app-panel">
        <header>
          <p className="screen-header-eyebrow">Delivered... 📦</p>
          <h1 className="screen-title">Your card is on its way.</h1>
          <p className="screen-subtitle">
            We&apos;ll take it from here — onto paper, into an envelope, and
            into the world.
          </p>
        </header>

        <div className="divider-soft" />

        <div className="layout-stack">

          <div className="button-row">
            <button
              type="button"
              className="primary-button"
              onClick={handleSendAnother}
            >
              Send Another Card
            </button>
            <button
              type="button"
              className="ghost-button"
              onClick={handleBackHome}
            >
              Back to Home
            </button>
            <button
              type="button"
              className="ghost-button"
              onClick={() => router.push('/archive')}
            >
              View Sent Cards
            </button>
            <button
              type="button"
              className="ghost-button"
              onClick={() => router.push('/tracker')}
            >
              Track Your Card
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

