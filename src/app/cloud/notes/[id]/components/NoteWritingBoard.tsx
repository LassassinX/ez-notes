"use client"
import { Note } from "@/utils/types"
import { SyntheticEvent, forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react"
import { useSession } from "next-auth/react"

import ReactDOM from "react-dom"

import anime from 'animejs'

let timeout: NodeJS.Timeout | undefined

interface PopupInstance {
	show: () => void
}

export default function NoteWritingBoard({ note, setNote, savingState }: {
	note: Note,
	setNote: (note: Note) => void,
	savingState: (state: boolean) => void
}) {
	const editDivRef = useRef<HTMLDivElement>(null)
	const popupRef = useRef<PopupInstance>(null)
	const x = useRef(0)
	const y = useRef(0)

	const [boardContent, setBoardContent] = useState(note.content) // [boardContent, setBoardContent

	const { data: session } = useSession()
	const { id } = note

	useEffect(() => {
		if (editDivRef.current) {
			editDivRef.current.innerText = note.content
			editDivRef.current.focus()
		}
	}, [])

	useEffect(() => {
		const selection = window.getSelection()
		const range = selection?.getRangeAt(0)
		const rect = range?.getBoundingClientRect()
		x.current = rect?.x || 0
		y.current = rect?.y || 0
		savingState(false)
		// get the cursor x and y
		if (!editDivRef.current) return
		// check if the user is idle for 5 seconds
		if (boardContent !== note.content && boardContent.length - note.content.length > 10) {
			updateNote()
		} else {
			if (timeout) clearTimeout(timeout)
			timeout = setTimeout(() => {
				updateNote()
			}, 1000)
		}

		return () => clearTimeout(timeout)
	}, [boardContent])

	const handleInput = (e: SyntheticEvent) => {
		setBoardContent(editDivRef.current?.innerText || '')
	}

	const updateNote = async () => {
		const content = editDivRef.current?.innerText
		if (!content) return

		const response = await fetch(`/api/users/${session?.user?.id}/notes/${id}`, {
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

		savingState(true)
		setNote({
			...note,
			content
		})
	}

	return (
		<div ref={editDivRef} className="px-2 py-4 gap-4 grow w-full h-full border-primary transition-all border-dashed border-2 focus-visible:outline-none rounded-lg" contentEditable={true}
			onInput={handleInput}
		>
			{/* A note writing template */}
		</div>
	)
}

const SavePopup = forwardRef(({ x, y }: { x: number, y: number, }, ref) => {
	const [show, setShow] = useState(false)

	const divRef = useRef<HTMLDivElement>(null)
	const animeRef = useRef<any>(null)

	if (!ref) ref = useRef<PopupInstance>(null)

	useEffect(() => {
		if (show) {
			if (animeRef.current) animeRef.current.pause()
			divRef.current?.setAttribute('style', 'opacity: 1;')

			animeRef.current = anime({
				targets: divRef?.current,
				opacity: 0,
				duration: 800,
				top: '-=10px',
				easing: 'easeInOutQuad',
				complete: () => {
					// put the animation back to the original state
					setShow(false)
					animeRef.current?.seek(0)
					divRef.current?.setAttribute('style', '')
				}
			})
		}
	}, [show])

	useImperativeHandle(ref, () => {
		return {
			show: () => setShow(true),
		}
	})

	return ReactDOM.createPortal(
		<div className="absolute z-[100] bg-neutral shadow-lg rounded-box p-2 pointer-events-none select-none opacity-0" ref={divRef}
			style={{
				top: y,
				left: x,
			}}>
			saved
		</div>
		, document.body)
})