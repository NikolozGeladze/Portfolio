import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { Link } from "react-router";
import { motion, animate, useMotionValue, useReducedMotion } from "framer-motion";

const easeOut = [0.22, 1, 0.36, 1];
const easeInOut = [0.65, 0, 0.35, 1];

const DOCKED_SCALE = 1 / 3;
const DOCK_DURATION = 1.1;

const linkClass =
    "text-white/70 hover:text-white transition duration-300 after:content-[''] after:block after:w-full after:h-[2px] after:bg-white after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300";

const links = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/projects", label: "Projects" },
    { to: "/contact", label: "Contact" },
];

const Navbar = ({ phase = "done", onDocked }) => {
    const reduce = useReducedMotion();
    const slotRef = useRef(null);
    const logoRef = useRef(null);

    const phaseRef = useRef(phase);
    phaseRef.current = phase;

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const scale = useMotionValue(phase === "loading" ? 1 : DOCKED_SCALE);

    const measure = useCallback(() => {
        if (phaseRef.current !== "loading") return;
        const slot = slotRef.current;
        const logo = logoRef.current;
        if (!slot || !logo) return;

        const rect = slot.getBoundingClientRect();
        const vw = document.documentElement.clientWidth;
        const vh = document.documentElement.clientHeight;

        x.set(vw / 2 - logo.offsetWidth / 2 - rect.left);
        y.set(vh / 2 - logo.offsetHeight / 2 - rect.top);
    }, [x, y]);

    useLayoutEffect(() => {
        measure();
        const ro = new ResizeObserver(measure);
        ro.observe(document.documentElement);
        document.fonts?.ready.then(measure);
        return () => ro.disconnect();
    }, [measure]);

    useEffect(() => {
        if (phase !== "docking") return;

        if (reduce) {
            x.set(0);
            y.set(0);
            scale.set(DOCKED_SCALE);
            const t = setTimeout(() => onDocked?.(), 250);
            return () => clearTimeout(t);
        }

        const transition = { duration: DOCK_DURATION, ease: easeInOut };
        const ax = animate(x, 0, transition);
        const ay = animate(y, 0, transition);
        const as = animate(scale, DOCKED_SCALE, {
            ...transition,
            onComplete: () => onDocked?.(),
        });

        return () => {
            ax.stop();
            ay.stop();
            as.stop();
        };
    }, [phase, reduce, onDocked, x, y, scale]);

    const hidden = phase === "loading";

    return (
        <>
            <nav
                className={`fixed top-5 left-1/2 -translate-x-1/2 w-[90%] max-w-6xl px-6 py-4 flex items-center justify-between rounded-2xl z-50 hover:scale-[1.05] transition-all duration-300 ${
                    phase !== "done" ? "pointer-events-none" : ""
                }`}
            >
                <motion.div
                    aria-hidden="true"
                    className="absolute inset-0 -z-10 rounded-2xl border border-white/20 bg-white/10 shadow-xl backdrop-blur-xl"
                    initial={hidden ? { opacity: 0 } : false}
                    animate={{ opacity: hidden ? 0 : 1 }}
                    transition={{ duration: reduce ? 0.2 : 0.9, delay: reduce ? 0 : 0.2, ease: easeOut }}
                />
                <h1 className="flex min-h-[1.75rem] items-center">
                    <span ref={slotRef} className="relative block">
                        <span aria-hidden="true" className="invisible block whitespace-nowrap text-xl font-bold leading-none">NG.</span>
                        <motion.span
                            ref={logoRef}
                            className="cursor-default absolute left-0 top-0 block whitespace-nowrap text-6xl font-bold leading-none text-white"
                            style={{ x, y, scale, originX: 0, originY: 0 }}
                        >
                            <motion.span
                                className="block"
                                initial={reduce || !hidden ? false : { opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, ease: easeOut }}
                            >
                                NG
                                <motion.span
                                    className="text-blue-500"
                                    animate={reduce ? undefined : { opacity: [1, 0.2, 1] }}
                                    transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    .
                                </motion.span>
                            </motion.span>
                        </motion.span>
                    </span>
                </h1>

                <motion.div
                    className="flex gap-8"
                    initial={hidden ? { opacity: 0, y: reduce ? 0 : -8 } : false}
                    animate={{ opacity: hidden ? 0 : 1, y: 0 }}
                    transition={{ duration: reduce ? 0.2 : 0.7, delay: reduce ? 0 : 0.45, ease: easeOut }}
                >
                    {links.map(({ to, label }) => (
                        <Link key={to} to={to} className={linkClass}>
                            {label}
                        </Link>
                    ))}
                </motion.div>
            </nav>
        </>
    );
};

export default Navbar;