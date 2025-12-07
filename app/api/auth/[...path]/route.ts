import { toNextJsHandler } from '@neondatabase/auth/next';

export const { GET, POST } = toNextJsHandler(
  'https://ep-broad-wave-ah1vzqk8.neonauth.c-3.us-east-1.aws.neon.tech/neondb/auth'
);
