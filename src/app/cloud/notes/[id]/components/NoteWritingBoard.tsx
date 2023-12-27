"use client"
import { Note } from "@/utils/types"
import { useEffect, useRef, useState } from "react"

export default function NoteWritingBoard({ note, editDivRef, updateNoteHandler }: {
	note: Note,
	editDivRef: React.RefObject<HTMLDivElement>,
	updateNoteHandler: () => void
}) {

	const [content, setContent] = useState(note.content)
	const timeoutRef = useRef<any>()

	const ctrlSaveHandler = (e: KeyboardEvent): void => {
		if (e.ctrlKey && e.key === 's') {
			e.preventDefault()
			updateNoteHandler()
		}
	}

	useEffect(() => {
		document.addEventListener('keydown', ctrlSaveHandler)

		if (editDivRef.current) {
			editDivRef.current.innerText = note.content
			editDivRef.current.focus()
		}

		return () => {
			document.removeEventListener('keydown', ctrlSaveHandler)
		}
	}, [editDivRef.current])

	useEffect(() => {
		if (!editDivRef.current) return
		clearTimeout(timeoutRef.current)
		timeoutRef.current = setTimeout(() => {
			updateNoteHandler()
		}, 3000)

		return () => {
			clearTimeout(timeoutRef.current)
		}
	}, [content])

	return (
		<div ref={editDivRef} className="px-2 py-4 gap-4 grow w-full h-full border-primary transition-all border-dashed border-2 focus-visible:outline-none rounded-lg" contentEditable={true} onInput={(e) => { setContent(e.currentTarget.innerText) }}
		>
			{/* A note writing template */}
		</div>
	)
}