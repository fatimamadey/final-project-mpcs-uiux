'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div className="app-shell">
      <section className="app-panel">
        <div>
          <p className="screen-header-eyebrow">Paper Kindness</p>
          <h1 className="screen-title">
            Write a message. We’ll handle the rest.
          </h1>
          <p className="screen-subtitle">
            Turn a few words into something physical.
          </p>
        </div>

        <div className="divider-soft" />

        <div className="layout-stack">
          <div className="button-row">
            <button
              className="primary-button"
              type="button"
              onClick={() => router.push('/occasion')}
            >
              Create a card
            </button>
            <button
              className="ghost-button"
              type="button"
              onClick={() => router.push('/occasion')}
            >
              I’m not sure what to say
            </button>
          </div>

          <p className="muted-note">
            It doesn’t need to be perfect to matter.
          </p>
        </div>
      </section>
    </div>
  );
}