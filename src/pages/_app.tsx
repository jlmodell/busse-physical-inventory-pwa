// src/pages/_app.tsx
import type { AppRouter } from '@/server/router'
import type { AppType } from 'next/dist/shared/lib/utils'

import superjson from 'superjson'
import { withTRPC } from '@trpc/next'
import { SessionProvider } from 'next-auth/react'

import AuthComponent from '@/components/login'
import Meta from '@/components/meta'

import '@/styles/globals.css'

const App: AppType = ({ Component, pageProps: { session, ...pageProps } }) => {
	return (
		<SessionProvider session={session}>
			<AuthComponent />
			<Meta />
			<main className='container mx-auto flex min-h-screen flex-col items-center justify-start py-8 px-4'>
				<Component {...pageProps} />
			</main>
		</SessionProvider>
	)
}

const getBaseUrl = () => {
	if (typeof window !== 'undefined') {
		return ''
	}
	if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}` // SSR should use vercel url

	return `http://localhost:${process.env.PORT ?? 3000}` // dev SSR should use localhost
}

export default withTRPC<AppRouter>({
	config({ ctx }) {
		/**
		 * If you want to use SSR, you need to use the server's full URL
		 * @link https://trpc.io/docs/ssr
		 */
		const url = `${getBaseUrl()}/api/trpc`

		return {
			url,
			transformer: superjson,
			/**
			 * @link https://react-query.tanstack.com/reference/QueryClient
			 */
			// queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
		}
	},
	/**
	 * @link https://trpc.io/docs/ssr
	 */
	ssr: false,
})(App)
