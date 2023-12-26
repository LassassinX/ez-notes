"use client"
import { Note } from "@/utils/types"
import { useEffect } from "react"

export default function NoteWritingBoard({ note, editDivRef }: {
	note: Note,
	editDivRef: React.RefObject<HTMLDivElement>
}) {

	useEffect(() => {
		if (editDivRef.current) {
			editDivRef.current.innerText = note.content
			editDivRef.current.focus()
		}
	}, [editDivRef.current])


	return (
		<div ref={editDivRef} className="px-2 py-4 gap-4 grow w-full h-full border-primary transition-all border-dashed border-2 focus-visible:outline-none rounded-lg" contentEditable={true}
		>
			{/* A note writing template */}
		</div>
	)
}