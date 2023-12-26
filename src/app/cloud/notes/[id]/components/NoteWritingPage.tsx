import NoteWritingBoard from "./NoteWritingBoard"
import NoteTitle from "./NoteTitle"
import Container from "@/components/atoms/Container"
import { Note } from "@/utils/types"

// red dot icon
import CircleIcon from '@mui/icons-material/Circle';
import { useState } from "react";

export default function NoteWritingPage({ note, setNote }: {
	note: Note,
	setNote: (note: Note) => void
}){
	const [saved, setSaved] = useState(true)

	return <Container className="grow flex flex-col items-start !gap-1 py-2">
		<Container className="flex items-center self-stretch !justify-between gap-2 !p-0 sticky top-0">
			<NoteTitle note={note} setNote={setNote} />
			<div className={`p-2 text-sm rounded-lg bg-primary-content flex gap-1 items-center ${saved ? 'text-primary' : 'text-secondary animate-pulse'}`}> 
				<CircleIcon className="text-xs" />
				<span>{ saved ? 'saved' : 'saving...' }</span>
			</div>
		</Container>
		<NoteWritingBoard note={note} setNote={setNote} savingState={setSaved} />
	</Container>
}


