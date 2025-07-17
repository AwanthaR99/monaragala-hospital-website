import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: '9ut0ga9a',
  dataset: 'production',
  apiVersion: '2025-07-15',
  useCdn: false,
  // Add the token you just copied here
  token: 'sklZYZXEzx9xzfOMGcRxhuguy0GmC0afws7Nf5jn1ZzZ7ls3zEdIGX1hJS6ImZszbU4geNft6dczoTM3LQwopiqzpW98TLj8TkkAKFEfzlPRFC0WPsrMe2ZS36hxow5EjJHF0DZaAsHvP1msvKf6cud1ehvUf2nOTgLwWQWFSx7t5P73GSGr', // <-- ඔබ COPY කරගත්තු TOKEN එක මෙතනට PASTE කරන්න
});