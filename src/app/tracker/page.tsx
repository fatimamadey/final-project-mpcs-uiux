'use client';

import { useRouter } from 'next/navigation';

type TransitCard = {
  id: string;
  recipient: string;
  sentOn: string;
  currentIndex: number;
  eta: string;
};

const STEPS = ['Written', 'Printed', 'Addressed', 'On its way', 'Delivered'];

const IN_TRANSIT: TransitCard[] = [
  {
    id: '2',
    recipient: 'Jon',
    sentOn: 'Sep 21',
    currentIndex: 3,
    eta: '2–4 days',
  },
  {
    id: '4',
    recipient: 'Nia',
    sentOn: 'Oct 11',
    currentIndex: 1,
    eta: '5–7 days',
  },
  {
    id: '5',
    recipient: 'Theo',
    sentOn: 'Oct 12',
    currentIndex: 2,
    eta: '4–6 days',
  },
];

export default function TrackerPage() {
  const router = useRouter();

  return (
    <div className="app-shell">
      <section className="app-panel">
        <header>
          <p className="screen-header-eyebrow">Track Your Cards</p>
          <h1 className="screen-title">In‑transit tracker.</h1>
        </header>

        <div className="divider-soft" />

        <div className="layout-stack">
          {IN_TRANSIT.map((card) => {
            const progress = Math.round(
              ((card.currentIndex + 1) / STEPS.length) * 100,
            );

            return (
              <div
                key={card.id}
                className="card"
                style={{ padding: '1.1rem 1.2rem' }}
              >
                <div className="card-decoration" />
                <div className="card-content">
                  <div className="tracker-row">
                    <div>
                      <div className="card-occasion">
                        To {card.recipient} · sent {card.sentOn}
                      </div>
                      <div className="timeline-title" style={{ marginTop: 6 }}>
                        {STEPS[card.currentIndex]}
                      </div>
                      <div className="timeline-description">
                        Estimated arrival: {card.eta}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.6rem' }}>
                      <button
                        type="button"
                        className="secondary-button"
                        onClick={() =>
                          router.push(`/status/${card.id}?current=${card.currentIndex}`)
                        }
                      >
                        View timeline
                      </button>
                    </div>
                  </div>

                  <div className="tracker-bar" style={{ marginTop: '0.9rem' }}>
                    <div
                      className="tracker-bar-fill"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="muted-note" style={{ marginTop: '0.5rem' }}>
                    {progress}% through the journey.
                  </p>
                </div>
              </div>
            );
          })}

          <p className="muted-note">
            This is a prototype tracker with simulated statuses. In a real
            system, these would update as print + mail events happen.
          </p>

          <div className="button-row">
            <button
              type="button"
              className="primary-button"
              onClick={() => router.push('/archive')}
            >
              Back to Sent Cards
            </button>
            <button
              type="button"
              className="ghost-button"
              onClick={() => router.push('/')}
            >
              Home
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

