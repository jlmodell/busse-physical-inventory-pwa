import NextAuth, { type User, type NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import clientPromise from '../../../utils/mongodb'
import argon2 from 'argon2'
import { BusseJWT } from '../../../types/auth'

export const authOptions: NextAuthOptions = {
	// Include user.id on session
	callbacks: {
		session({ session, token, user }) {
			if (token) {
				const busseToken = token as BusseJWT

				delete busseToken.user.Password
				delete busseToken.user.NewPassword
				delete busseToken.user.OldPassword

				session.user = busseToken.user as User
			}
			return session
		},
		jwt({ token, user, account, profile, isNewUser }) {
			if (user) {
				token.user = user
			}

			return token
		},
	},
	// Configure one or more authentication providers
	providers: [
		CredentialsProvider({
			// The name to display on the sign in form (e.g. 'Sign in with...')
			name: 'Credentials',
			// The credentials is used to generate a suitable form on the sign in page.
			// You can specify whatever fields you are expecting to be submitted.
			// e.g. domain, username, password, 2FA token, etc.
			// You can pass any HTML attribute to the <input> tag through the object.
			credentials: {
				username: {
					label: 'Email',
					type: 'email',
					placeholder: 'noreply@busseinc.com',
				},
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials, req) {
				const client = await clientPromise
				const db = client.db('busseforce')

				const user = await db
					.collection('user')
					.findOne({ Username: credentials?.username })

				// Return null if user data could not be retrieved
				if (!user) {
					return null
				}

				const verify = await argon2.verify(
					user?.Password,
					credentials?.password as string
				)

				// If no error and we have user data, return it
				if (user && verify) {
					return user
				}
				// Return null if user data could not be verified
				return null
			},
		}),
	],
}

export default NextAuth(authOptions)
