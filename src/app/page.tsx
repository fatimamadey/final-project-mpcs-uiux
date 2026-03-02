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
            Send a real postcard that actually sounds like you.
          </h1>
          <p className="screen-subtitle">
            No stamps, no printer, no “perfect wording” pressure. Just a few
            honest lines, turned into something someone can hold onto.
          </p>
        </div>

        <div className="divider-soft" />

        <div className="layout-stack">
          <p className="eyeline">
            <strong>Here’s the idea:</strong> you write from the heart, we take
            care of the paper, ink, and mailbox.
          </p>

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
              I&apos;m not sure what to say yet
            </button>
          </div>

          <p className="muted-note">
            It doesn&apos;t have to be long, or clever, or perfectly phrased to
            be meaningful.
          </p>
        </div>
      </section>
    </div>
  );
}

