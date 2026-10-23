import { useEffect, useRef, useState } from 'react';

interface Props {
  text: string;
  label?: string;
  class?: string;
}

type Status = 'idle' | 'copied' | 'failed';

export default function CopyButton({ text, label = 'Copy', class: className }: Props) {
  const [status, setStatus] = useState<Status>('idle');
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const announce = (next: Status) => {
    setStatus(next);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus('idle'), 2000);
  };

  const fallbackCopy = () => {
    const area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    const copied = document.execCommand('copy');
    area.remove();
    if (!copied) throw new Error('Copy command failed');
  };

  const copy = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        fallbackCopy();
      }
      announce('copied');
    } catch {
      try {
        fallbackCopy();
        announce('copied');
      } catch {
        announce('failed');
      }
    }
  };

  return (
    <span className="copy-button-wrap">
      <button
        type="button"
        className={['copy-button', className].filter(Boolean).join(' ')}
        data-copied={String(status === 'copied')}
        onClick={copy}
        aria-label={`${label} to clipboard`}
      >
        <span aria-hidden="true">
          {status === 'copied' ? '✓' : status === 'failed' ? '×' : '⌘'}
        </span>
        <span>{status === 'copied' ? 'Copied' : status === 'failed' ? 'Retry' : label}</span>
      </button>
      <span className="copy-status" role="status" aria-live="polite">
        {status === 'copied' ? 'Copied to clipboard' : status === 'failed' ? 'Copy failed' : ''}
      </span>
    </span>
  );
}
