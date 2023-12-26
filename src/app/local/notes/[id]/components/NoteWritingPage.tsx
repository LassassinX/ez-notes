import NoteWritingBoard from "./NoteWritingBoard"
import NoteTitle from "./NoteTitle"

import Container from "@/components/atoms/Container"
import { Note } from "@/utils/types"


export default function NoteWritingPage({ note }: {
	note: Note
}){
	return <Container className="grow flex flex-col items-start gap-0 py-2">
		<NoteTitle note={note} />
		<NoteWritingBoard note={note} />
	</Container>
}
