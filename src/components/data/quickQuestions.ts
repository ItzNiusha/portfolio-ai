export const questions = {
  Me: 'Tell me about yourself.',
  Projects: 'What projects are you working on?',
  Skills: 'What are your key strengths?',
  Contact: 'How can I reach you?',
} as const;

export const questionConfig = [
  { key: 'Me', emoji: '🤠' },
  { key: 'Projects', emoji: '👩🏼‍💻' },
  { key: 'Skills', emoji: '🤓' },
  { key: 'Contact', emoji: '📧' },
] as const;
