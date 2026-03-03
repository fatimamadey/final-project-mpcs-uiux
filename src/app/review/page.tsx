'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCard } from '../CardContext';
import { CardPreview } from '../components/CardPreview';

export default function ReviewPage() {
  const router = useRouter();
  const { card, setAddress } = useCard();
  const [side, setSide] = useState<'front' | 'back'>('front');

  const handleSend = () => {
    router.push('/sent');
  };

  return (
    <div className="app-shell">
      <section className="app-panel">
        <header>
          <p className="screen-header-eyebrow">
            Step 3 · Address
          </p>
          <h1 className="screen-title">Check your card and address.</h1>
          <p className="screen-subtitle">
            Take a quick look at how everything will appear on paper, then add a
            mailing address.
          </p>
        </header>

        <div className="divider-soft" />

        <div className="screen-layout">
          <div className="layout-stack">
            <div className="card-preview-header">
            <p className="screen-header-eyebrow">
                Preview
            </p>
              <div className="card-tab-row">
                <button
                  type="button"
                  className={[
                    'card-tab',
                    side === 'front' ? 'card-tab--active' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  onClick={() => setSide('front')}
                >
                  Front
                </button>
                <button
                  type="button"
                  className={[
                    'card-tab',
                    side === 'back' ? 'card-tab--active' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  onClick={() => setSide('back')}
                >
                  Back
                </button>
              </div>
            </div>

            <CardPreview card={card} side={side} />
          </div>

          <div className="layout-stack">
            <div className="field-group">
              <p className="field-label">Mailing address</p>
              <p className="field-helper">
                Just the basics are enough. We&apos;ll handle the printing,
                envelope, and postage.
              </p>

              <div className="field-group" style={{ marginTop: '1rem' }}>
                <label className="field-group">
                  <span className="field-label">Name</span>
                  <input
                    className="input"
                    placeholder="Who is this going to?"
                    value={card.address.name}
                    onChange={(e) => setAddress({ name: e.target.value })}
                  />
                </label>

                <label className="field-group">
                  <span className="field-label">Street</span>
                  <input
                    className="input"
                    placeholder="Street and apartment or dorm, if needed"
                    value={card.address.street}
                    onChange={(e) => setAddress({ street: e.target.value })}
                  />
                </label>

                <div className="address-grid">
                  <label className="field-group">
                    <span className="field-label">City</span>
                    <input
                      className="input"
                      placeholder="City"
                      value={card.address.city}
                      onChange={(e) => setAddress({ city: e.target.value })}
                    />
                  </label>
                  <label className="field-group">
                    <span className="field-label">ZIP</span>
                    <input
                      className="input"
                      placeholder="ZIP code"
                      value={card.address.postalCode}
                      onChange={(e) =>
                        setAddress({ postalCode: e.target.value })
                      }
                    />
                  </label>
                </div>
              </div>
            </div>

            <p className="muted-note">
              We got it from here. ✉️
            </p>

            <div className="button-row">
              <button
                type="button"
                className="primary-button"
                onClick={handleSend}
              >
                Send this card
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

