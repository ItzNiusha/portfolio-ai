import { tool } from 'ai';
import { z } from 'zod';

export const getContact = tool({
  description: 'Displays my contact information.',
  parameters: z.object({}),
  execute: async () => {
    return 'You can find my contact information above. Feel free to reach out — I’d be happy to hear from you! 😉';
  },
});
