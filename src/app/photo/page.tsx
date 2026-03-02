'use client';

import { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCard } from '../CardContext';

export default function PhotoPage() {
  const router = useRouter();
  const { card, setPhoto } = useCard();
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(
    card.photo?.url,
  );
  const [placement, setPlacement] = useState<'front' | 'inside'>(
    card.photo?.placement ?? 'front',
  );

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleUsePhoto = () => {
    if (!previewUrl) return;
    setPhoto({ url: previewUrl, placement });
    router.push('/create');
  };

  const handleSkip = () => {
    router.push('/create');
  };

  return (
    <div className="app-shell">
      <section className="app-panel">
        <header>
          <p className="screen-header-eyebrow">Optional · Add a small visual</p>
          <h1 className="screen-title">Add a photo if it helps tell the story.</h1>
          <p className="screen-subtitle">
            A favorite place, an inside joke, a screenshot of a note—anything
            that might make the moment feel a bit more like the two of you.
          </p>
        </header>

        <div className="divider-soft" />

        <div className="screen-layout">
          <div className="layout-stack">
            <div className="field-group">
              <p className="field-label">Upload one image</p>
              <input
                className="input"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
              <p className="field-helper">
                We&apos;ll lightly crop it to a postcard-friendly rectangle.
              </p>
            </div>

            <div className="field-group">
              <p className="field-label">Where should it live?</p>
              <div className="pill-choice-row">
                <button
                  type="button"
                  className={[
                    'pill-choice',
                    placement === 'front' ? 'pill-choice--selected' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  onClick={() => setPlacement('front')}
                >
                  <span>On the front</span>
                </button>
                <button
                  type="button"
                  className={[
                    'pill-choice',
                    placement === 'inside' ? 'pill-choice--selected' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  onClick={() => setPlacement('inside')}
                >
                  <span>Inside the letter</span>
                </button>
              </div>
              <p className="field-helper">
                Front works well for postcards; inside feels more intimate for
                folded cards.
              </p>
            </div>

            <div className="button-row">
              <button
                type="button"
                className="primary-button"
                onClick={handleUsePhoto}
                disabled={!previewUrl}
              >
                Use this photo
              </button>
              <button
                type="button"
                className="secondary-button"
                onClick={handleSkip}
              >
                Skip for now
              </button>
            </div>
          </div>

          <div className="layout-stack">
            <p className="field-label">Rough crop preview</p>
            <div className="card-preview-shell">
              <div className="card">
                <div className="card-decoration" />
                <div className="card-content">
                  <div className="card-photo card-photo--front">
                    <div
                      className="card-photo-inner"
                      style={{
                        backgroundImage: previewUrl
                          ? `url(${previewUrl})`
                          : 'linear-gradient(135deg, #fce3ce, #e2d5c6)',
                      }}
                    />
                  </div>
                  <p className="muted-note">
                    We&apos;ll keep the edges soft so it feels printed, not
                    pasted on.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="button-row" style={{ marginTop: '1.75rem' }}>
          <button
            type="button"
            className="ghost-button"
            onClick={() => router.back()}
          >
            Go back
          </button>
        </div>
      </section>
    </div>
  );
}

