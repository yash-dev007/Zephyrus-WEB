import { useEffect, useId, useRef, useState } from 'react';
import { motion } from 'motion/react';
import CopyButton from '@/components/forms/CopyButton';
import { firstBoot, installFacts, installMethods, verification } from '@/data/install';
import { links } from '@/data/site';

const spring = { type: 'spring', bounce: 0, duration: 0.32 } as const;

const TerminalLines = ({ commands, comment }: { commands: string[]; comment?: string }) => (
  <pre>
    <code>
      {commands.map((command) => (
        <span className="terminal__line" key={command}>
          <span className="prompt" aria-hidden="true">
            ${' '}
          </span>
          {command}
          {'\n'}
        </span>
      ))}
      {comment && (
        <span className="comment">
          <span aria-hidden="true"># </span>
          {comment}
        </span>
      )}
    </code>
  </pre>
);

export default function InstallTabs() {
  const [active, setActive] = useState(0);
  const [ready, setReady] = useState(false);
  const baseId = useId().replace(/:/g, '');
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    setReady(true);
  }, []);

  const select = (index: number, moveFocus = false) => {
    const next = (index + installMethods.length) % installMethods.length;
    setActive(next);
    if (moveFocus) tabRefs.current[next]?.focus();
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      select(index + 1, true);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      select(index - 1, true);
    } else if (event.key === 'Home') {
      event.preventDefault();
      select(0, true);
    } else if (event.key === 'End') {
      event.preventDefault();
      select(installMethods.length - 1, true);
    }
  };

  return (
    <div className="install" data-ready={String(ready)}>
      <div className="install__tabs" role="tablist" aria-label="Install method">
        {installMethods.map((method, index) => {
          const selected = index === active;
          return (
            <button
              key={method.id}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${method.id}`}
              className="install__tab"
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${method.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => select(index)}
              onKeyDown={(event) => onKeyDown(event, index)}
            >
              {method.label}
              {selected && (
                <motion.span
                  className="install__tab-underline"
                  layoutId={`${baseId}-underline`}
                  transition={spring}
                  aria-hidden="true"
                />
              )}
            </button>
          );
        })}
      </div>

      <div className="install__panels">
        {installMethods.map((method, index) => (
          <section
            key={method.id}
            id={`${baseId}-panel-${method.id}`}
            className="install__panel"
            role="tabpanel"
            aria-labelledby={`${baseId}-tab-${method.id}`}
            data-active={String(index === active)}
            tabIndex={index === active ? 0 : -1}
          >
            <div className="install__panel-head">
              <span>{method.panelLabel}</span>
              <span>{method.commands.length} commands</span>
            </div>
            <div className="terminal">
              <div className="terminal__bar">
                <span className="terminal__dots" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
                <span>{method.id === 'windows' ? 'powershell' : 'zsh / bash'}</span>
                <CopyButton
                  text={[...method.commands, ...(method.comment ? [method.comment] : [])].join(
                    '\n',
                  )}
                  label="Copy"
                />
              </div>
              <div className="terminal__body">
                <TerminalLines commands={method.commands} comment={method.comment} />
              </div>
            </div>
            {method.note && <p className="install__note">{method.note}</p>}
            {method.caveat && <p className="install__note">{method.caveat}</p>}
          </section>
        ))}
      </div>

      <div className="install__grid">
        <div>
          <p className="label install__aside-title">{verification.title}</p>
          <div className="terminal">
            <div className="terminal__bar">
              <span className="terminal__dots" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span>health check</span>
              <CopyButton text={verification.commands.join('\n')} label="Copy" />
            </div>
            <div className="terminal__body">
              <TerminalLines commands={[...verification.commands]} />
            </div>
          </div>
          <p className="install__note">{verification.note}</p>
        </div>

        <aside className="install__aside">
          <p className="label install__aside-title">First boot</p>
          <p className="install__note install__note--first">{firstBoot}</p>
          <ul className="install-facts">
            {installFacts.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>
        </aside>
      </div>

      <div className="install__foot">
        <a className="link-arrow" href={links.setup} rel="noopener noreferrer">
          Full setup{' '}
          <span className="arrow" aria-hidden="true">
            ↗
          </span>
        </a>
        <span className="annotation">Docker / Python 3.11+ / AGPL-3.0</span>
      </div>
    </div>
  );
}
