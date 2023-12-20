import Container from "@/components/atoms/Container"
import NoteWritingBoard from "@/components/templates/NoteWritingBoard"
// back button mui icon
import ArrowBackIosNew from '@mui/icons-material/ArrowBackIosNew';

export default function Page() {
	return (
		<Container className="grow flex flex-col items-start gap-0">
			<div className="join items-center rounded-lg bg-primary-content bg-opacity-50
				[&>*:hover]:brightness-110 [&>*:hover]:cursor-pointer [&>*]:transition-all
			">
				<ArrowBackIosNew className="join-item ml-2 text-primary" />
				<h1 className="join-item text-lg text-primary font-bold p-4 pl-2">Untitled Note 1</h1>
			</div>
			<NoteWritingBoard />
		</Container>
	)
}