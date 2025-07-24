import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: '9ut0ga9a',
  dataset: 'production',
  apiVersion: '2025-07-15',
  useCdn: false,
  // Add the token you just copied here
  token: process.env.SANITY_API_WRITE_TOKEN,
});