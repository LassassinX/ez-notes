import Container from "../atoms/Container";
import Logo from "../atoms/Logo";

const NavBar = () => {
	return <>
		<Container className="navbar bg-base-200 shadow-md p-4 px-8">
			<Logo />
		</Container>
	</>
}

export default NavBar;