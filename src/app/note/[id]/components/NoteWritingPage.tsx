import NoteWritingBoard from "@/components/templates/NoteWritingBoard"
import NoteTitle from "@/components/templates/NoteTitle"
import Container from "@/components/atoms/Container"


export default function NoteWritingPage({ note }: {
	note: Note
}){
	return <Container className="grow flex flex-col items-start gap-0 py-2">
		<NoteTitle note={note} />
		<NoteWritingBoard note={note} />
	</Container>
}
