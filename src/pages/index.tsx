import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'

import SearchForItemForm from '@/components/searchForItem'

const Home: NextPage = () => {
	const data = useSession()

	return (
		<>
			<h1 className='mt-8 text-center text-3xl font-bold leading-normal tracking-tight text-gray-700 md:mt-4'>
				<span className='text-4xl font-extrabold italic text-blue-300'>
					Busse
				</span>{' '}
				Hospital Disposables
			</h1>
			<h2 className='-mt-1 text-center text-3xl font-semibold leading-normal tracking-tighter text-gray-700 underline'>
				Physical Inventory 2022
			</h2>

			<div className='flex min-h-full flex-1 flex-col items-center justify-center'>
				{data.data?.user && <SearchForItemForm />}
			</div>
		</>
	)
}

export default Home
