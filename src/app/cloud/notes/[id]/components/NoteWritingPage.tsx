import NoteWritingBoard from "./NoteWritingBoard"
import NoteTitle from "./NoteTitle"
import Container from "@/components/atoms/Container"
import { Note } from "@/utils/types"

// red dot icon
import CircleIcon from '@mui/icons-material/Circle';
import { useRef, useState } from "react";
import { useSession } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";

export default function NoteWritingPage({ note, setNote }: {
	note: Note,
	setNote: (note: Note) => void
}) {
	const [saving, setSaving] = useState(false)
	const { data: session } = useSession()
	const editDivRef = useRef<HTMLDivElement>(null)

	const updateNote = async () => {
		const content = editDivRef.current?.innerText
		if (!content) return
		setSaving(true)

		const response = await fetch(`/api/users/${session?.user?.id}/notes/${note.id}`, {
			method: 'PATCH',
			body: JSON.stringify({ content }),
			headers: {
				'Content-Type': 'application/json'
			}
		})

		const data = await response.json()

		if (data.error) {
			console.error(data.error)
			return
		}

		setTimeout(() => {
			setSaving(false)
			toast.success('Saved')
		}, 1000)
		editDivRef.current?.focus()
		setNote({
			...note,
			content
		})
	}

	return <>
	<Toaster />
	<Container className="grow flex flex-col items-start !gap-1 py-2">
		<Container className="flex items-center self-stretch !justify-between gap-2 !p-0 sticky top-0">
			<NoteTitle note={note} setNote={setNote} />
			<button className={`btn btn-primary min-h-0 h-auto px-3 py-2 ${saving ? 'pointer-events-none opacity-50' : ''}`}  onClick={()=>{
				updateNote()
			}} >
				{
					saving && <>
						<div className="loading loading-spinner loading-xs"></div>
						Saving
					</>
				}
				{
					!saving && <>
						Save
					</>
				}
			</button>
		</Container>
		<NoteWritingBoard note={note} editDivRef={editDivRef} updateNoteHandler = {updateNote}/>
	</Container>
	</>
	
}


