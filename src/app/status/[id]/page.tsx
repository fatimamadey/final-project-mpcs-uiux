'use client';

import { useRouter } from 'next/navigation';

type Props = {
  params: {
    id: string;
  };
};

export default function StatusPage({ params }: Props) {
  const router = useRouter();
  const { id } = params;

  const steps = [
    {
      title: 'Written',
      description: 'You took a few minutes to put something real into words.',
    },
    {
      title: 'Printed',
      description: 'We laid your message out on warm, textured stock.',
    },
    {
      title: 'Addressed',
      description:
        'Your recipient’s name and address were added with care and double‑checked.',
    },
    {
      title: 'On its way',
      description:
        'The card is moving through the postal system—sorting centers, trucks, and mailbags.',
    },
    {
      title: 'Delivered 💌',
      description:
        'It&apos;s reached their mailbox. They may not have opened it yet, but it&apos;s there, waiting.',
    },
  ];

  return (
    <div className="app-shell">
      <section className="app-panel">
        <header>
          <p className="screen-header-eyebrow">
            Card {id} · Where it is now
          </p>
          <h1 className="screen-title">Status timeline.</h1>
          <p className="screen-subtitle">
            A simple, honest view of what&apos;s happened between you clicking
            send and someone opening their mailbox.
          </p>
        </header>

        <div className="divider-soft" />

        <div className="layout-stack">
          <div className="timeline">
            {steps.map((step) => (
              <div key={step.title} className="timeline-item">
                <div className="timeline-marker" />
                <div className="timeline-title">{step.title}</div>
                <div
                  className="timeline-description"
                  dangerouslySetInnerHTML={{ __html: step.description }}
                />
              </div>
            ))}
          </div>

          <p className="muted-note">
            In a fuller version of this product, these steps would update over
            time as the card moves through the real world.
          </p>

          <div className="button-row">
            <button
              type="button"
              className="primary-button"
              onClick={() => router.push('/archive')}
            >
              Back to sent cards
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

