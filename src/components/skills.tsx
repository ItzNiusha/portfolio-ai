'use client';

import React from 'react';

const userSkills = [
  'JavaScript',
  'TypeScript',
  'React.js',
  'Blazor',
  'C#',
  '.NET',
  'Java',
  'Python',
  'API development',
  'REST API',
  'Go',
  'MVC',
  'SQL',
  'PostgreSQL',
  'SQL Server',
  'Docker',
  'Git',
  'GitHub Actions',
  'GCP',
  'Unit Test',
  'Data Structure',
  'Algorithm',
];

export default function Skills() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-center px-4 py-14">
      <div className="w-full rounded-xl border border-neutral-800 bg-neutral-900 p-8 shadow-2xl md:p-10">
        <div className="flex flex-col items-start gap-6">
          {/* Card header like ChatGPT bubble */}
          <div className="mb-1 flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#23272F] to-[#384152] shadow">
              <span className="text-2xl">🤖</span>
            </div>
            <div className="text-lg font-semibold text-neutral-100">Skills</div>
          </div>
          {/* Skills tags */}
          <div className="flex flex-wrap gap-2">
            {userSkills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-neutral-800 bg-neutral-800 px-3 py-1 text-[13px] font-medium text-neutral-100 shadow-sm"
              >
                {skill}
              </span>
            ))}
          </div>
          <div className="mt-4 w-full"></div>
        </div>
      </div>
    </div>
  );
}
