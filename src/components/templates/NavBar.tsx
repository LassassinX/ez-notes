"use client"
import Container from "../atoms/Container";
import Logo from "../atoms/Logo";
import { useSession, signIn, signOut } from "next-auth/react"

const NavBar = () => {
	const { data: session, status } = useSession()

	return <>
		<Container className="navbar bg-base-200 shadow-md py-2 justify-between">
			<Logo />
			{
				session &&
				<button className="btn btn-outline btn-primary py-2 text-sm min-h-0 h-auto" onClick={() => { signOut() }}>
					Sign out
				</button>
			}{
				!session &&
				<button className="btn btn-outline btn-primary py-2 text-sm min-h-0 h-auto" onClick={() => { signIn() }}>
					Sign in
				</button>
			}

		</Container>
	</>
}

export default NavBar;