'use client';

import { useState, type ReactNode } from 'react';
import { ASSETS, type ChallengeOption } from '@/lib/destinations';

function PassportStamp({ accent }: { accent: string }) {
  return (
    <span className="pass-stamp" style={{ borderColor: accent, color: accent }} aria-hidden="true">
      EXPLORED<br />✶ 2026 ✶
    </span>
  );
}

// Collapsible panel using the grid-rows trick
function Panel({ open, kind, children }: { open: boolean; kind: 'hint' | 'answer'; children: ReactNode }) {
  return (
    <div className={`panel panel-${kind}`} data-open={open ? 'true' : 'false'}>
      <div className="panel-inner">
        <div className="panel-pad">{children}</div>
      </div>
    </div>
  );
}

function OptionGrid({
  options,
  correct,
  revealed,
}: {
  options: ChallengeOption[];
  correct?: string;
  revealed: boolean;
}) {
  const [picked, setPicked] = useState<string | null>(null);
  return (
    <div className="opt-grid">
      {options.map((o) => {
        const isPicked = picked === o.label;
        const isCorrect = revealed && o.label === correct;
        const isWrongPick = revealed && isPicked && o.label !== correct;
        return (
          <button
            key={o.label}
            type="button"
            className={'opt' + (isPicked ? ' picked' : '') + (isCorrect ? ' correct' : '') + (isWrongPick ? ' wrong' : '')}
            onClick={() => setPicked(o.label)}
          >
            <img src={ASSETS + o.image} alt={'Handprints — ' + o.label} />
            <span className="opt-label">{o.label}</span>
            {isCorrect && <span className="opt-mark">✓</span>}
            {isWrongPick && <span className="opt-mark wrong">✕</span>}
          </button>
        );
      })}
    </div>
  );
}

export default function ChallengeCard({
  level,
  body,
  options,
  correct,
  aside,
  hint,
  answer,
  open,
  accent,
}: {
  level: string;
  body: ReactNode;
  options?: ChallengeOption[];
  correct?: string;
  aside?: { image: string; alt: string; caption: string };
  hint?: string;
  answer?: ReactNode;
  open?: string;
  accent: string;
}) {
  const [hintOpen, setHintOpen] = useState(false);
  const [answerOpen, setAnswerOpen] = useState(false);
  return (
    <section className="card challenge" style={{ '--accent': accent } as React.CSSProperties}>
      <div className="challenge-head">
        <span className="level-pill">{level}</span>
        {answerOpen && !open && <PassportStamp accent={accent} />}
      </div>
      <div className="challenge-body">{body}</div>
      {options && <OptionGrid options={options} correct={correct} revealed={answerOpen} />}
      {aside && (
        <figure className="maw-fig aside-fig">
          <img src={ASSETS + aside.image} alt={aside.alt} />
          <figcaption>{aside.caption}</figcaption>
        </figure>
      )}
      <div className="challenge-actions">
        {hint && (
          <button type="button" className="btn btn-hint" aria-expanded={hintOpen} onClick={() => setHintOpen((o) => !o)}>
            <span className="diamond" aria-hidden="true">◆</span> {hintOpen ? 'Hide hint' : 'Show hint'}
          </button>
        )}
        {!open && (
          <button type="button" className="btn btn-reveal" aria-expanded={answerOpen} onClick={() => setAnswerOpen((o) => !o)}>
            {answerOpen ? 'Hide the answer' : 'Reveal the answer'}
          </button>
        )}
      </div>
      {hint && <Panel open={hintOpen} kind="hint">{hint}</Panel>}
      {!open && <Panel open={answerOpen} kind="answer">{answer}</Panel>}
      {open && <p className="open-task">{open}</p>}
    </section>
  );
}
