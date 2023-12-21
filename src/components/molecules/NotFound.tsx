import { ArrowBackIosNew } from "@mui/icons-material";
import Link from "next/link";
import Container from "@/components/atoms/Container";

export default function NotFoundPage({message}: {message?: string}){
	return <Container className="flex grow flex-col items-center justify-center gap-4">
		<h1 className="text-3xl text-primary font-bold">{`${message ?? '404 ~ Not Found :<'}`}</h1>
		<Link href="/" className="text-primary flex items-center">
			<ArrowBackIosNew className="text-primary text-lg" />
			Go back
		</Link>
	</Container>
}