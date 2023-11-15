import OpenAI from 'openai';
import { type ChatCompletionMessageParam } from 'openai/resources';

import env from '@/utils/env';

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

export const InstructionMessage: ChatCompletionMessageParam = {
  role: 'system',
  content: 'You are a carbon footprint advisor. You must help the user reduce their carbon footprint. You must provide advice in actionable bullet points.',
};

export default openai;
