"use client"
import { useSession } from "next-auth/react"

function Page() {
	const { data: session, status } = useSession()

	if (status === 'loading') {
		return <div>Loading...</div>
	}

	if (status === 'unauthenticated') {
		return <div>Unauthenticated</div>
	}

	return (
		<div>Wohoo</div>
	)
}

export default Page