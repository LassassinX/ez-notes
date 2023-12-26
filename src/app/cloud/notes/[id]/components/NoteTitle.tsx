import Container from "@/components/atoms/Container"

import ArrowBackIosNew from '@mui/icons-material/ArrowBackIosNew';
import CheckIcon from '@mui/icons-material/Check';
import CrossIcon from '@mui/icons-material/Close';


import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import { Note } from "@/utils/types";
import { useSession } from "next-auth/react";

export default function NoteTitle({ note, setNote }: {
	note: Note,
	setNote: (note: Note) => void
}) {
	const { title, id } = note
	const { data: session, status } = useSession()

	const [noteTitle, setNoteTitle] = useState(title)
	const [editing, setEditing] = useState(false)
	const inputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		if (editing) {
			inputRef.current?.focus()
		}
	}, [editing])

	const updateNote = async () => {
		const response = await fetch(`/api/users/${session?.user?.id}/notes/${id}`, {
			method: 'PATCH',
			body: JSON.stringify({ title: noteTitle }),
			headers: {
				'Content-Type': 'application/json'
			}
		})

		const data = await response.json()

		if (data.error) {
			console.error(data.error)
			return
		}

		setNote({
			...note,
			title: noteTitle
		})
	}

	return <div className="join items-center rounded-lg bg-primary-content bg-opacity-50
							[&>*]:transition-all">

		<Link href="/">
			<ArrowBackIosNew className="join-item ml-2 text-base text-primary hover:brightness-110 hover:cursor-pointer" />
		</Link>

		{
			editing &&
			<>
				<Container className="!p-2 !gap-2 join-item flex-grow flex items-center">
					<input className="input py-1 px-2 min-h-0 h-auto input-ghost input-primary w-full text-sm text-primary font-bold" ref={inputRef} value={noteTitle} onChange={(e) => {
						setNoteTitle(e.target.value)
						// fetch and update note title
					}} />

					<div className="flex ">
						<CheckIcon className="text-sm text-success rounded-md p-0.5 bg-opacity-0 w-7 h-7 bg-success hover:bg-opacity-25 hover:cursor-pointer hover:brightness-110 " onClick={() => {
							setEditing(false)
							updateNote()
						}} />

						<div className="divider divider-horizontal mx-1">
						</div>

						<CrossIcon className="text-sm transition-all text-error rounded-md p-0.5 bg-opacity-0 w-7 h-7 bg-error hover:bg-opacity-25 hover:cursor-pointer hover:brightness-110" onClick={() => {
							setEditing(false)
							setNoteTitle(note.title)
						}} />
					</div>
				</Container>
			</>
		}
		{
			!editing &&
			<h1 className="join-item text-sm text-primary font-bold p-2 pl-2 hover:brightness-110 hover:cursor-pointer" onClick={() => {
				setEditing(true)
			}}>
				{noteTitle}
			</h1>
		}
	</div>
}