'use client';

import React from 'react';

const skillCategories = [
  {
    title: 'Frontend',
    skills: ['JavaScript', 'TypeScript', 'React.js', 'Blazor'],
  },
  {
    title: 'Backend',
    skills: [
      'C#',
      '.NET',
      'Java',
      'Python',
      'Go',
      'API development',
      'REST API',
      'MVC',
    ],
  },
  {
    title: 'Databases',
    skills: ['SQL', 'PostgreSQL', 'SQL Server'],
  },
  {
    title: 'DevOps & Cloud',
    skills: ['Docker', 'Git', 'GitHub Actions', 'GCP'],
  },
  {
    title: 'Soft Skills',
    skills: [
      'Communication',
      'Problem Solving',
      'Teamwork',
      'Adaptability',
      'Self-motivation',
      'Leadership',
    ],
  },
];

export default function Skills() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-center px-4 py-14">
      <div
        className="w-full rounded-2xl border p-4 shadow-sm md:p-6"
        style={{
          background: '#f7f7f8',
          borderColor: '#ececf1',
          boxShadow: '0 2px 8px 0 rgba(0,0,0,0.03)',
        }}
      >
        <div className="flex flex-col items-start gap-6">
          {/* Bubble header */}
          <div className="mb-1 flex items-center gap-2">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-full shadow"
              style={{
                background: 'linear-gradient(135deg,#ececf1 0%,#d9d9e3 100%)',
              }}
            >
              <span className="text-2xl">🤖</span>
            </div>
            <div className="text-lg font-semibold text-[#353740]">Skills</div>
          </div>
          {/* Categorized skills */}
          <div className="flex w-full flex-col gap-4">
            {skillCategories.map((category) => (
              <div key={category.title} className="w-full">
                <div className="mb-2 text-[15px] font-semibold text-[#555c6a]">
                  {category.title}
                </div>
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full px-4 py-2 text-[13px] font-medium shadow-sm"
                      style={{
                        background: '#fff',
                        color: '#353740',
                        border: '1px solid #ececf1',
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
