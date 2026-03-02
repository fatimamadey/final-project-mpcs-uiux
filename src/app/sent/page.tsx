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
          <p className="screen-header-eyebrow">Delivered to the future</p>
          <h1 className="screen-title">Your card is on its way.</h1>
          <p className="screen-subtitle">
            We&apos;ll take it from here—onto paper, into an envelope, and out
            into the real world. The most important part was you deciding to
            send it.
          </p>
        </header>

        <div className="divider-soft" />

        <div className="layout-stack">
          <p className="eyeline">
            It doesn&apos;t have to be perfect to be meaningful. Someone you
            care about is going to open their mailbox and see your name.
          </p>

          <div className="button-row">
            <button
              type="button"
              className="primary-button"
              onClick={handleSendAnother}
            >
              Send another card
            </button>
            <button
              type="button"
              className="ghost-button"
              onClick={handleBackHome}
            >
              Back to home
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

