import { AuthOptions } from 'next-auth'
import Google from "next-auth/providers/google"

import { PrismaClient } from '@prisma/client'
import { PrismaAdapter } from "@auth/prisma-adapter"
import { Adapter } from 'next-auth/adapters'

const prisma = new PrismaClient()


const authOptions: AuthOptions = {
	adapter: PrismaAdapter(prisma) as Adapter,
	providers: [
		Google({
			clientId: process.env.OAUTH_GOOGLE_CLIENT_ID || '',
			clientSecret: process.env.OAUTH_GOOGLE_CLIENT_SECRET || '',
		})
	],
	session: {
		strategy: 'database',
	},
	callbacks: {
		session: async ({session, token, user}) => {
			return {
				...session,
				user: {
					...session.user,
					id: user.id,
				}
			}
		},
	}
} 

export default authOptions