import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import NavBar from '@/components/templates/NavBar'
import Footer from '@/components/templates/Footer'
import Provider from '@/components/providers/Provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode,
}) {
	
	return (
		<html lang="en">
			<body className={`${inter.className} min-h-[100svh] flex flex-col`} data-theme="forest">
				<Provider>
					<NavBar />
					<div className='grow flex flex-col'>
						{children}
					</div>
					<Footer />
				</Provider>
			</body>
		</html>
	)
}
