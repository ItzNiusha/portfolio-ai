'use client';

import React from 'react';
import { Mail, User, Link2 } from 'lucide-react';

export function Contact() {
  // Contact information
  const contactInfo = {
    name: 'Niusha Shahrivar',
    email: 'itzniusha@gmail.com',
    handle: '@Niusha.Shahrivar',
    socials: [
      {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/in/niushashahrivar',
      },
      {
        name: 'Instagram',
        url: 'https://www.instagram.com/niushashahrivar',
      },
      {
        name: 'Github',
        url: 'https://github.com/ItzNiusha',
      },
    ],
  };

  const openLink = (url: string) => {
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="mx-auto mt-10 w-full max-w-md">
      <div className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white px-6 py-8 shadow-sm">
        <div className="mb-6 flex flex-col items-center">
          <span className="mt-1 text-sm text-gray-500">
            {contactInfo.handle}
          </span>
          <span className="mt-3 text-center text-xs text-gray-400">
            I'm Niusha's AI assistant.
            <br />
            Want to get in touch with the human? Here’s how:
          </span>
        </div>

        {/* Name */}
        <div className="mb-4 flex flex-col items-center">
          <span className="font-medium text-gray-800">{contactInfo.name}</span>
        </div>

        {/* Email */}
        <button
          className="group mb-6 flex w-full items-center justify-center gap-2 rounded-lg border border-gray-100 py-2 text-gray-800 transition-colors hover:border-gray-300"
          onClick={() => openLink(`mailto:${contactInfo.email}`)}
          title={contactInfo.email}
        >
          <Mail className="text-gray-600" size={18} />
          <span className="group-hover:underline">{contactInfo.email}</span>
        </button>

        {/* Social Links */}
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          {contactInfo.socials.map((social) => (
            <button
              key={social.name}
              className="flex items-center gap-1 rounded-md bg-gray-100 px-3 py-1 text-sm text-gray-600 transition-all hover:bg-gray-200"
              onClick={() => openLink(social.url)}
              title={social.name}
            >
              <Link2 size={14} className="opacity-70" />
              {social.name}
            </button>
          ))}
        </div>
        {/* AI Footer */}
        <div className="mt-8 text-center text-xs text-gray-400">
          <span>
            I can answer questions, but for real conversations, use the links
            above!
          </span>
        </div>
      </div>
    </div>
  );
}

export default Contact;
