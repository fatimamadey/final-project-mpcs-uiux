'use client';

import { useRouter } from 'next/navigation';

type ArchiveCard = {
  id: string;
  recipient: string;
  sentOn: string;
  snippet: string;
};

const MOCK_CARDS: ArchiveCard[] = [
  {
    id: '1',
    recipient: 'Maya',
    sentOn: 'Oct 3',
    snippet: 'I keep thinking about that walk back from the concert…',
  },
  {
    id: '2',
    recipient: 'Jon',
    sentOn: 'Sep 21',
    snippet: 'Thanks again for letting me crash on your couch…',
  },
  {
    id: '3',
    recipient: 'Grandma',
    sentOn: 'Aug 14',
    snippet: 'I finally tried your banana bread recipe on my roommates…',
  },
];

export default function ArchivePage() {
  const router = useRouter();

  const handleOpenStatus = (id: string) => {
    router.push(`/status/${id}`);
  };

  return (
    <div className="app-shell">
      <section className="app-panel">
        <header>
          <p className="screen-header-eyebrow">History</p>
          <h1 className="screen-title">Sent cards archive.</h1>
          <p className="screen-subtitle">
            Here are all the cards you&apos;ve sent.
          </p>
        </header>

        <div className="divider-soft" />

        <div className="layout-stack">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1rem',
            }}
          >
            {MOCK_CARDS.map((card) => (
              <button
                key={card.id}
                type="button"
                className="card"
                style={{
                  textAlign: 'left',
                  cursor: 'pointer',
                  padding: '1rem 1.1rem',
                }}
                onClick={() => handleOpenStatus(card.id)}
              >
                <div className="card-decoration" />
                <div className="card-content">
                  <div className="card-occasion">
                    To {card.recipient} · sent {card.sentOn}
                  </div>
                  <div
                    className="card-message"
                    style={{ fontSize: '0.88rem', opacity: 0.9 }}
                  >
                    {card.snippet}
                  </div>
                </div>
              </button>
            ))}
          </div>

          <p className="muted-note">
            This is a prototype—these examples are fictional, but give a feel
            for what a real archive could look like.
          </p>

          <div className="button-row">
            <button
              type="button"
              className="primary-button"
              onClick={() => router.push('/')}
            >
              Send a new card
            </button>
            <button
              type="button"
              className="secondary-button"
              onClick={() => router.push('/tracker')}
            >
              Track Your Current Cards
            </button>
            <button
              type="button"
              className="ghost-button"
              onClick={() => router.back()}
            >
              Back
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

