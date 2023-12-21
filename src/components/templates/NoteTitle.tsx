import { getNoteFromLocalStorage, saveNotesToLocalStorage } from "@/utils/functions"
import Container from "@/components/atoms/Container"

import ArrowBackIosNew from '@mui/icons-material/ArrowBackIosNew';
import CheckIcon from '@mui/icons-material/Check';
import CrossIcon from '@mui/icons-material/Close';


import Link from "next/link"
import { useState, useRef, useEffect } from "react"

export default function NoteTitle({ note }: {
	note: Note
}) {
	const { title, id } = note
	const [noteTitle, setNoteTitle] = useState(title)
	const [editing, setEditing] = useState(false)
	const inputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		if (editing) {
			inputRef.current?.focus()
		}
	}, [editing])

	return <div className="join items-center rounded-lg bg-primary-content bg-opacity-50
							[&>*]:transition-all">

		<Link href="/">
			<ArrowBackIosNew className="join-item ml-2 text-primary hover:brightness-110 hover:cursor-pointer" />
		</Link>

		{
			editing &&
			<>
				<Container className="p-2 !gap-2 join-item flex-grow flex items-center">
					<input className="input py-2 input-ghost input-primary w-full text-lg text-primary font-bold" ref={inputRef} value={noteTitle} onChange={(e) => {
						setNoteTitle(e.target.value)
					}} />

					<div className="flex ">
						<CheckIcon className="text-xl text-success rounded-md p-0.5 bg-opacity-0 w-7 h-7 bg-success hover:bg-opacity-25 hover:cursor-pointer hover:brightness-110 " onClick={() => {
							setEditing(false)

							// update the note title
							const { notes, currentNote } = getNoteFromLocalStorage(id)
							currentNote.title = noteTitle
							saveNotesToLocalStorage(notes)
						}} />

						<div className="divider divider-horizontal mx-1">
						</div>

						<CrossIcon className="text-xl transition-all text-error rounded-md p-0.5 bg-opacity-0 w-7 h-7 bg-error hover:bg-opacity-25 hover:cursor-pointer hover:brightness-110" onClick={() => {
							setEditing(false)
							const { currentNote } = getNoteFromLocalStorage(id)
							setNoteTitle(currentNote.title)
						}} />
					</div>
				</Container>
			</>
		}
		{
			!editing &&
			<h1 className="join-item text-lg text-primary font-bold p-4 pl-2 hover:brightness-110 hover:cursor-pointer" onClick={() => {
				setEditing(true)
			}}>
				{noteTitle}
			</h1>
		}
	</div>
}