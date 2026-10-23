import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll, useSpring } from 'motion/react';
import { requestTrace, spineSteps, supportingFolders } from '@/data/spine';

const pathD = [
  'M 380 56 V 490',
  'M 380 77 H 330',
  'M 380 179 H 430',
  'M 380 281 H 330',
  'M 380 383 H 430',
  'M 380 479 H 330',
].join(' ');

const nodeY = [40, 142, 244, 346, 448];

const Trace = () => (
  <div className="terminal spine__trace">
    <div className="terminal__bar">
      <span className="terminal__dots" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      <span>SSE / trace</span>
      <span>text/event-stream</span>
    </div>
    <div className="terminal__body">
      <code>{requestTrace}</code>
    </div>
  </div>
);

export default function SpineSequence() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ['start start', 'end end'],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.35,
  });

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(motionQuery.matches);
    setMounted(true);
    setActive(Math.min(4, Math.floor(scrollYProgress.get() * 5)));
    const onChange = () => setReduced(motionQuery.matches);
    motionQuery.addEventListener('change', onChange);
    return () => motionQuery.removeEventListener('change', onChange);
  }, [scrollYProgress]);

  useMotionValueEvent(progress, 'change', (value) => {
    setActive(Math.min(4, Math.max(0, Math.floor(value * 5))));
  });

  const showAll = !mounted || reduced;
  const pathLength = showAll ? 1 : progress;

  return (
    <>
      <div className="spine__stage" ref={stageRef}>
        <div className="spine__sticky">
          <div className="shell spine__layout">
            <div className="spine__visual">
              <ol className="spine__steps" aria-label="Request path layers">
                {spineSteps.map((step, index) => (
                  <li
                    key={step.index}
                    className="spine__step"
                    data-active={String(showAll || index <= active)}
                    data-passed={String(!showAll && index < active)}
                  >
                    <span className="spine__step-num" aria-hidden="true">
                      {step.index}
                    </span>
                    <span>
                      <span className="spine__step-name">{step.name}</span>
                      <span className="spine__step-path">{step.path}</span>
                      <span className="spine__step-note">{step.what}</span>
                    </span>
                  </li>
                ))}
              </ol>

              <div className="spine__support" aria-label="Supporting folders">
                {supportingFolders.map((folder) => (
                  <span key={folder.path}>
                    <b>{folder.path}</b> {folder.note}
                  </span>
                ))}
              </div>
            </div>

            <div className="spine__visual">
              <div className="spine__diagram">
                <div className="spine__diagram-label">
                  <span>Spine / request path</span>
                  <span>SSE</span>
                </div>
                <svg viewBox="0 0 760 540" aria-hidden="true" focusable="false">
                  <defs>
                    <pattern id="spine-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path
                        d="M 40 0 L 0 0 0 40"
                        fill="none"
                        stroke="rgba(242,242,240,.055)"
                        strokeWidth="1"
                      />
                    </pattern>
                  </defs>
                  <rect width="760" height="540" fill="url(#spine-grid)" opacity="0.65" />

                  <motion.path
                    d={pathD}
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ pathLength }}
                  />

                  {spineSteps.map((step, index) => {
                    const isLeft = index % 2 === 0;
                    const x = isLeft ? 30 : 430;
                    const y = nodeY[index] ?? 40;
                    const isActive = showAll || index <= active;
                    return (
                      <g
                        key={step.index}
                        className="spine-node"
                        data-active={String(isActive)}
                        transform={`translate(${x} ${y})`}
                      >
                        <rect
                          className="spine-node__box"
                          width="300"
                          height="74"
                          fill="var(--surface-2)"
                          stroke="var(--hairline)"
                        />
                        <circle
                          className="spine-node__dot"
                          cx={isLeft ? 300 : 0}
                          cy="37"
                          r="3"
                          fill={isActive ? 'var(--accent)' : 'var(--hairline-strong)'}
                        />
                        <text
                          x="12"
                          y="19"
                          fill="var(--faint)"
                          fontFamily="var(--font-mono)"
                          fontSize="9"
                          letterSpacing="1.4"
                        >
                          {step.index}
                        </text>
                        <text
                          x="12"
                          y="41"
                          fill={isActive ? 'var(--text)' : 'var(--muted)'}
                          fontFamily="var(--font-display)"
                          fontSize="14"
                          fontWeight="600"
                          letterSpacing="0.5"
                        >
                          {step.name.toUpperCase()}
                        </text>
                        <text
                          x="12"
                          y="60"
                          fill="var(--muted)"
                          fontFamily="var(--font-mono)"
                          fontSize="10"
                        >
                          {step.path}
                        </text>
                        <text
                          x={isLeft ? 288 : 12}
                          y="60"
                          textAnchor={isLeft ? 'end' : 'start'}
                          fill="var(--faint)"
                          fontFamily="var(--font-mono)"
                          fontSize="8"
                          letterSpacing="1"
                        >
                          {step.what.toUpperCase()}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
              <Trace />
            </div>
          </div>
        </div>
      </div>

      <div className="shell spine__mobile">
        <ol aria-label="Request path layers">
          {spineSteps.map((step) => (
            <li className="spine__mobile-step" key={step.index}>
              <span className="spine__step-num" aria-hidden="true">
                {step.index}
              </span>
              <div>
                <span className="spine__step-name">{step.name}</span>
                <span className="spine__step-path">{step.path}</span>
                <p>{step.note}</p>
              </div>
            </li>
          ))}
        </ol>
        <Trace />
      </div>
    </>
  );
}
