import Head from 'next/head'

const Meta = () => (
	<Head>
		<title>Busse | Physical Inventory</title>
		<meta charSet='utf-8' />
		<meta name='mobile-web-app-capable' content='yes' />
		<meta name='apple-mobile-web-app-capable' content='yes' />
		<meta
			name='apple-mobile-web-app-status-bar-style'
			content='black-translucent'
		/>
		<meta
			name='apple-mobile-web-app-title'
			content='Busse Physical Inventory'
		/>
		<meta name='application-name' content='Busse Physical Inventory' />
		<meta
			name='description'
			content='internal application for physical inventory'
		/>
		<link rel='icon' href='/favicon.ico' />
		<meta
			name='theme-color'
			content='#f4f4f5'
			media='(prefers-color-scheme: light)'
		/>
		<meta
			name='theme-color'
			content='#18181b'
			media='(prefers-color-scheme: dark)'
		/>
		<meta
			name='viewport'
			content='width=device-width, initial-scale=1, user-scalable=0, viewport-fit=cover'
		/>
		<link rel='apple-touch-icon' href='/favicon/android-chrome-512x512.png' />
		<link rel='icon' type='image/png' href='/images/favicon-32x32.png' />
		<link rel='manifest' href='/favicon/manifest.json' />
	</Head>
)

export default Meta
