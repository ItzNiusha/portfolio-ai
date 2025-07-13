import { tool } from 'ai';
import { z } from 'zod';

export const getProjects = tool({
  description: 'Displays a list of all projects created by Niusha.',
  parameters: z.object({}),
  execute: async () => {
    return 'Here’s a list of projects created by Niusha! Feel free to ask me for more details about any of them.';
  },
});
