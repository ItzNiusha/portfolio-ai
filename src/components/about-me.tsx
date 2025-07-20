'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';
import type { Variants, Transition } from 'framer-motion';


const profile = {
  name: 'Niusha Nessa Shahrivar',
  age: '25',
  location: 'Stockholm, Sweden',
  src: '/profile-niush.PNG',
  tags: ['Developer', 'Tech Girl', 'Stockholm', 'Challenge', 'Coding'],
  resume: '/ResumeNessa.pdf',
};


const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (custom: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.56,
      ease: 'easeOut',
      delay: custom,
      type: 'tween' as Transition['type'], // cast type
    },
  }),
};


export function Presentation() {
  return (
    <div className="mx-auto w-full max-w-4xl py-10 font-sans">
      <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
        {/* Avatar */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="mx-auto flex justify-center"
        >
          <div className="relative h-64 w-64 overflow-hidden rounded-full bg-gradient-to-br from-slate-100 via-slate-300 to-slate-100 shadow-2xl">
            <Image
              src={profile.src}
              alt={profile.name}
              fill
              className="object-cover object-center"
              priority
            />
            {/* Chat bubble */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 36 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="absolute bottom-8 left-full z-10 ml-3 w-40 rounded-xl border border-gray-200 bg-white/90 p-3 text-xs text-gray-700 shadow-lg"
              style={{ pointerEvents: 'none' }}
            >
              <span>Ask me about AI, code, or cool projects!</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Info, Resume, Tags */}
        <motion.div
          initial="hidden"
          animate="visible"
          custom={0.15}
          variants={fadeInUp}
          className="flex flex-col gap-6"
        >
          <div>
            <h1 className="from-foreground to-muted-foreground bg-gradient-to-r bg-clip-text text-3xl font-bold text-transparent">
              {profile.name}
            </h1>
            <div className="text-muted-foreground mt-2 flex flex-wrap items-center gap-3 text-sm">
              <span>{profile.age} yrs</span>
              <span className="hidden h-1 w-1 rounded-full bg-white md:inline-block" />
              <span>{profile.location}</span>
            </div>
          </div>

          {/* Modern Resume Button */}
          <motion.div
            initial="hidden"
            animate="visible"
            custom={0.28}
            variants={fadeInUp}
            className="flex items-center"
          >
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/80 focus:ring-secondary inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold shadow transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none"
              style={{ borderWidth: 1, borderColor: 'var(--border)' }}
            >
              <span role="img" aria-label="Resume" className="text-base">
                📝
              </span>
              <span>Resume</span>
            </a>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            custom={0.4}
            variants={fadeInUp}
            className="flex flex-wrap gap-2"
          >
            {profile.tags.map((tag) => (
              <span
                key={tag}
                className="bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default Presentation;
