import { ComponentPropsWithoutRef } from "react"

const SignInButton: React.FC<ComponentPropsWithoutRef<'button'>> = ({...restProps}) => {
	return (
		<button {...restProps} >Sign in</button>
	) 
}

export default SignInButton