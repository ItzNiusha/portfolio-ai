import { tool } from 'ai';
import { z } from 'zod';

export const getPresentation = tool({
  description:
    'This tool returns a concise personal introduction of Nessa Shahrivar. It is used to answer the question "Who are you?" or "Tell me about yourself"',
  parameters: z.object({}),
  execute: async () => {
    return {
      presentation:
        "I'm Nessa Shahrivar, a 25-year-old full-stack developer based in Stockholm with a passion for AI, DevOps, and building cool things that actually work. I studied Computer Science at the University of Gävle, and I love bringing optimism and a lot of determination to every project. Outside of coding, you’ll find me enjoying fika or learning new tech.",
    };
  },
});
