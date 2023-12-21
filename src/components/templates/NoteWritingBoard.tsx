"use client"
import { getNoteFromLocalStorage, saveNotesToLocalStorage } from "@/utils/functions"
import { SyntheticEvent, useEffect, useRef, useState } from "react"

export default function NoteWritingBoard({ note }: {
	note: Note
}) {
	const editDivRef = useRef<HTMLDivElement>(null)
	const { id } = note

	useEffect(() => {
		if (editDivRef.current) {
			editDivRef.current.innerText = note.content
			editDivRef.current.focus()
		}
	}, [])

	const handleInput = (e: SyntheticEvent) => {
		const { notes, currentNote } = getNoteFromLocalStorage(id)
		currentNote.content = editDivRef.current?.innerText || ''
		saveNotesToLocalStorage(notes)
	}

	return (
		<div ref={editDivRef} className="px-2 py-4 gap-4 grow w-full h-full border-primary border-dashed border-2 focus-visible:outline-none rounded-lg" contentEditable={true}
			onInput={handleInput}
		>
			{/* A note writing template */}
		</div>
	)
}