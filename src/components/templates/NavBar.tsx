"use client"
import Container from "../atoms/Container";
import Logo from "../atoms/Logo";
import { useSession, signIn, signOut } from "next-auth/react"

// google icon from mui
import GoogleIcon from '@mui/icons-material/Google';

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
				<div className="dropdown dropdown-end">
					<div tabIndex={0} role="button" className="btn btn-outline btn-primary py-2">Sign in</div>
					<ul tabIndex={0} className="dropdown-content z-[1] menu shadow bg-base-100 rounded-box">
						<li>
							<button className="p-1">
								<GoogleIcon className="text-primary" onClick={() => signIn('google')}/>
							</button>
						</li>
					</ul>
				</div>
			}

		</Container>
	</>
}

export default NavBar;