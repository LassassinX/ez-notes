"use client"
import Container from "../atoms/Container";
import Loader from "../atoms/ComponentLoader";
import UserAvatar from "./UserAvatar";
import Logo from "../atoms/Logo";
import SignInButton from "../atoms/SignInButton";

import { useSession } from "next-auth/react"

const NavBar = () => {
	const { data: session, status } = useSession()
	

	const RenderedContent = () => {
		if (status === 'loading') {
			return <div className="flex ml-auto w-12 justify-start">
				<Loader />
			</div> 
		}

		if (status === 'unauthenticated') {
			return <SignInButton />
		}


		return <UserAvatar
			imageSrc={session?.user?.image}
			userName={session?.user?.name?.split(' ')[0]}
			email={session?.user?.email}
		/>
	}

	return <>
		<Container className="navbar bg-base-200 shadow-md py-2 justify-between">
			<Logo />
			<RenderedContent />
		</Container>
	</>
}

export default NavBar;