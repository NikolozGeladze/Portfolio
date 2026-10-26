import { useEffect, useState } from 'react';
import {
    motion,
    useReducedMotion,
} from 'framer-motion';
import MyImage from '../assets/my-image.jpeg';

const NAME = 'Nikoloz Geladze';
const TYPE_SPEED = 70;
const START_DELAY = 500;

const easeOut = [0.22, 1, 0.36, 1];

const Hero = () => {
    const reduce = useReducedMotion();
    const [count, setCount] = useState(0);
    const typed = reduce || count >= NAME.length;

    useEffect(() => {
        if (reduce) return;

        let interval;

        const start = setTimeout(() => {
            interval = setInterval(() => {
                setCount((c) => {
                    if (c >= NAME.length) {
                        clearInterval(interval);
                        return c;
                    }

                    return c + 1;
                });
            }, TYPE_SPEED);
        }, START_DELAY);

        return () => {
            clearTimeout(start);
            clearInterval(interval);
        };
    }, [reduce]);

    const rise = (delay = 0) => ({
        initial: reduce ? false : { opacity: 0, y: 14, },
        animate: typed ? { opacity: 1, y: 0, } : { opacity: 0, y: 14, },
        transition: { duration: 0.7, ease: easeOut, delay },
    });

    return (
        <>
            <div className="pt-30 px-50 flex">
                <div
                    className="w-full flex flex-col justify-center items-start gap-5"
                >
                    <div className="flex flex-col gap-1">
                        <motion.p
                            className="w-fit text-gray-400 cursor-default transition-all duration-300 hover:text-white hover:translate-x-1"
                            initial={reduce ? false : { opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: easeOut, }}>
                            Hello, I am
                        </motion.p>

                        <h1
                            className="w-fit relative text-4xl font-bold text-white min-h-[1.25em] cursor-default transition-all duration-300 hover:text-blue-100 hover:scale-[1.03] hover:drop-shadow-[0_0_12px_rgba(59,130,246,0.35)]"
                            aria-label={NAME}
                        >
                            <span aria-hidden="true">{reduce ? NAME : NAME.slice(0, count)}</span>
                            <motion.span
                                aria-hidden="true"
                                className="inline-block align-middle ml-1 h-[1em] w-[3px] rounded-full bg-blue-500"
                                animate={typed && !reduce ? { opacity: [1, 0, 1] } : { opacity: 1 }}
                                transition={
                                    typed && !reduce
                                        ? { duration: 1.1, repeat: Infinity, ease: 'easeInOut' }
                                        : { duration: 0 }
                                }
                            />
                        </h1>

                        <motion.h2
                            className="w-fit text-xl text-blue-500 font-bold cursor-default transition-all duration-300 hover:text-blue-300 hover:translate-x-1 hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.4)]"
                            {...rise(0)}
                        >
                            Full Stack Developer
                        </motion.h2>
                    </div>

                    <motion.p className="text-gray-400 max-w-xl cursor-default transition-all duration-300 hover:text-gray-200 hover:translate-x-1" {...rise(0.15)}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae sunt minima tempora ad
                        deserunt! Cupiditate ut alias maxime ipsam, aperiam aut.
                    </motion.p>

                    <motion.div className="flex gap-3" {...rise(0.3)}>
                        <a href="#projects" className="group rounded-full bg-blue-500 px-6 py-2.5 font-medium text-white shadow-lg shadow-blue-500/20 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:bg-blue-400 hover:shadow-xl hover:shadow-blue-500/40 active:translate-y-0 active:scale-[0.98]">
                            <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5">
                                See my work
                            </span>
                        </a>

                        <a href="#contact" className="group rounded-full border border-white/15 px-6 py-2.5 font-medium text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:border-blue-400/50 hover:bg-white/10 hover:shadow-lg hover:shadow-blue-500/10 active:translate-y-0 active:scale-[0.98]">
                            <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5">
                                Get in touch
                            </span>
                        </a>
                    </motion.div>
                </div>

                <motion.div>
                    <motion.div
                        initial={reduce ? false : { opacity: 0, filter: 'blur(14px)' }}
                        animate={{ opacity: 1, filter: 'blur(0px)' }}
                        transition={{ duration: 1.4, ease: easeOut, delay: 0.2 }}
                        className="overflow-hidden mask-x-from-70% mask-x-to-100% mask-y-from-70% mask-y-to-100%"
                    >
                        <motion.img
                            src={MyImage}
                            alt="Profile"
                            whileHover={reduce ? undefined : { scale: 1.08 }}
                            transition={{ duration: 0.4, ease: easeOut }}
                            className="w-full h-full object-cover object-center"
                        />
                    </motion.div>
                </motion.div>
            </div>
        </>
    );
};

export default Hero;