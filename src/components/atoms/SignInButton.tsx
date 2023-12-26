"use client"
import { ComponentPropsWithoutRef } from "react"
import GoogleIcon from '@mui/icons-material/Google';
import { signIn } from "next-auth/react"

const SignInButton: React.FC<ComponentPropsWithoutRef<'button'>> = ({ ...restProps }) => {
	return (
		<div className="dropdown dropdown-end">
			<div tabIndex={0} role="button" className="btn btn-outline btn-primary py-2 text-sm min-h-0 h-auto">Sign in</div>
			<ul tabIndex={0} className="dropdown-content z-[1] mt-2 menu shadow bg-neutral rounded-box">
				<li>
					<button className="p-2 pr-4 whitespace-nowrap" onClick={() => signIn('google')}>
						<GoogleIcon className="text-primary" />
						Sign in with Google
					</button>
				</li>
			</ul>
		</div>
	)
}

export default SignInButton