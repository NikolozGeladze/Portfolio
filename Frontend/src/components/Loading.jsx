import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const easeOut = [0.22, 1, 0.36, 1];
const MIN_DURATION = 1800;

const pageLoaded = () =>
  new Promise((resolve) => {
    if (document.readyState === 'complete') return resolve();
    window.addEventListener('load', resolve, { once: true });
  });

const Loader = ({ phase = 'loading', onDone }) => {
  const reduce = useReducedMotion();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = reduce ? 300 : MIN_DURATION;
    const startTime = performance.now();
    let raf;
    let timeoutId;
    let loaded = false;
    let finished = false;

    pageLoaded().then(() => (loaded = true));

    const tick = (now) => {
      const t = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const value = t < 1 ? eased * 100 : loaded ? 100 : 99;
      setProgress(Math.round(value));

      if (value >= 100 && !finished) {
        finished = true;
        timeoutId = setTimeout(onDone, reduce ? 0 : 350);
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timeoutId);
    };
  }, [reduce, onDone]);

  const leaving = phase !== 'loading';

  return (
    <motion.div
      role="status"
      aria-live="polite"
      aria-label={`Loading ${progress}%`}
      className={`fixed inset-0 z-40 bg-gray-950 ${leaving ? 'pointer-events-none' : ''}`}
      initial={{ opacity: 1 }}
      animate={{ opacity: leaving ? 0 : 1 }}
      transition={{ duration: reduce ? 0.2 : 0.9, ease: easeOut }}
    >
      <motion.div
        className="absolute left-1/2 top-1/2 mt-[72px] w-48 -translate-x-1/2"
        animate={{ opacity: leaving ? 0 : 1 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        <div className="h-[3px] w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full origin-left rounded-full bg-blue-500"
            style={{ transform: `scaleX(${progress / 100})` }}
          />
        </div>
        <p className="mt-3 text-right text-sm tabular-nums text-gray-400">{progress}%</p>
      </motion.div>
    </motion.div>
  );
};

export default Loader;