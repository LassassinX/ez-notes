"use client"
import Loader from "@/components/atoms/MainPageLoader"

// next-auth
import { useSession } from "next-auth/react"
import LocalNotesContainer from "./components/LocalNotesContainer"
import CloudNotesContainer from "./components/CloudNotesContainer"
import Container from "@/components/atoms/Container"

export default function Home() {
	const { data: session, status } = useSession()

	if (status === 'loading') {
		return <Loader />
	}

	return (
		<Container className={`flex flex-col gap-2 transition-all`}>
			<CloudNotesContainer />
			<LocalNotesContainer />
		</Container>
	)

}