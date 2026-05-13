'use client';

import { motion } from 'framer-motion';

const variants = {
  fadeUp:    { hidden: { opacity: 0, y: 32 },          visible: { opacity: 1, y: 0 } },
  fadeIn:    { hidden: { opacity: 0 },                  visible: { opacity: 1 } },
  fadeLeft:  { hidden: { opacity: 0, x: -32 },          visible: { opacity: 1, x: 0 } },
  fadeRight: { hidden: { opacity: 0, x: 32 },           visible: { opacity: 1, x: 0 } },
  scaleUp:   { hidden: { opacity: 0, scale: 0.92 },     visible: { opacity: 1, scale: 1 } },
};

export function AnimateIn({ children, variant = 'fadeUp', delay = 0, className = '' }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
      variants={variants[variant]}
      className={className}
    >
      {children}
    </motion.div>
  );
}
