import { easeIn } from 'framer-motion';

export const fadeIn = (delay, duration, direction, type) => ({
  hidden: {
    opacity: 0,
    y: direction === 'up' ? -150 : direction === 'down' ? 150 : 0,
    x: direction === 'left' ? -150 : direction === 'right' ? 150 : 0,
  },
  show: {
    opacity: 1,
    y: 0,
    x: 0,
    transtion: {
      type: type,
      delay: delay,
      duration: duration,
      ease: easeIn,
    },
  },
});
