import React from 'react';
import { motion, type HTMLMotionProps } from 'motion/react';

export type RevealDirection = 
  | 'up' 
  | 'down' 
  | 'left' 
  | 'right' 
  | 'zoom' 
  | 'fly-left' 
  | 'fly-right' 
  | 'fly-up' 
  | 'fly-down' 
  | 'zoom-blur'
  | 'rotate-in'
  | 'none';

interface ScrollRevealProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  direction?: RevealDirection;
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  once?: boolean;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  distance = 24,
  className = '',
  once = true,
  ...rest
}) => {
  const getInitial = () => {
    switch (direction) {
      case 'up':
        return { opacity: 0, y: distance, filter: 'blur(3px)' };
      case 'down':
        return { opacity: 0, y: -distance, filter: 'blur(3px)' };
      case 'left':
        return { opacity: 0, x: distance, filter: 'blur(3px)' };
      case 'right':
        return { opacity: 0, x: -distance, filter: 'blur(3px)' };
      case 'zoom':
        return { opacity: 0, scale: 0.94, filter: 'blur(4px)' };
      case 'fly-left':
        return { opacity: 0, x: distance * 1.2, y: 12, scale: 0.97, filter: 'blur(2px)' };
      case 'fly-right':
        return { opacity: 0, x: -distance * 1.2, y: 12, scale: 0.97, filter: 'blur(2px)' };
      case 'fly-up':
        return { opacity: 0, y: distance * 1.3, scale: 0.97, filter: 'blur(3px)' };
      case 'fly-down':
        return { opacity: 0, y: -distance * 1.3, scale: 0.97, filter: 'blur(3px)' };
      case 'zoom-blur':
        return { opacity: 0, scale: 0.92, y: 16, filter: 'blur(6px)' };
      case 'rotate-in':
        return { opacity: 0, y: distance, rotate: -2, scale: 0.96, filter: 'blur(2px)' };
      case 'none':
        return { opacity: 0 };
      default:
        return { opacity: 0, y: distance, filter: 'blur(3px)' };
    }
  };

  const getAnimate = () => {
    switch (direction) {
      case 'up':
      case 'down':
      case 'fly-up':
      case 'fly-down':
        return { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' };
      case 'left':
      case 'right':
      case 'fly-left':
      case 'fly-right':
        return { opacity: 1, x: 0, y: 0, scale: 1, filter: 'blur(0px)' };
      case 'zoom':
      case 'zoom-blur':
        return { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' };
      case 'rotate-in':
        return { opacity: 1, y: 0, rotate: 0, scale: 1, filter: 'blur(0px)' };
      case 'none':
        return { opacity: 1 };
      default:
        return { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' };
    }
  };

  return (
    <motion.div
      initial={getInitial()}
      whileInView={getAnimate()}
      viewport={{ 
        once, 
        amount: 0.05,
        margin: '0px 0px 80px 0px'
      }}
      transition={{
        duration,
        delay: Math.min(delay, 0.35),
        ease: [0.22, 1, 0.36, 1], // Smooth organic cubic-bezier easing
      }}
      className={`will-change-[transform,opacity] ${className}`}
      {...rest}
    >
      {children}
    </motion.div>
  );
};



