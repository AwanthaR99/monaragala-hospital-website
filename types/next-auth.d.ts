// types/next-auth.d.ts

import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      hasChangedInitialPassword?: boolean;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    hasChangedInitialPassword?: boolean;
  }
}