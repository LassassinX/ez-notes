import { type DefaultSession } from 'next-auth';

type Note = {
	id: string
	title: string
	content: string
	color: string
}


declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user?: {
      id: string;
      role?: string;
      username?: string;
      someExoticUserProperty?: string;
    } & DefaultSession['user'];
  }
}