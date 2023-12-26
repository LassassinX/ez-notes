import { getServerSession } from "next-auth"
import authOptions from "@/config/authOptions"
import { NextResponse } from "next/server"
import { Note } from "./types"

export async function checkSession() {
	const session = await getServerSession(authOptions)
	return session
}

export async function middleware(response: NextResponse) {
	const session = await getServerSession(authOptions)
	if (!session) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
	} else {
		return response
	}
}

export function getNoteFromLocalStorage(id?: string): {
	currentNote: Note
	notes: Note[]
} {
	if (!localStorage.getItem('notes'))
		return {
			currentNote: {
				id: '',
				title: '',
				content: '',
				color: '',
			},
			notes: [],
		}

	const notes = JSON.parse(localStorage.getItem('notes') || '')
	const currentNote = notes.find((otherNote: any) => otherNote.id === id)
	return { currentNote, notes }
}

export function deleteNoteFromLocalStorage(id: string): void {
	if (!localStorage.getItem('notes')) return

	const notes = JSON.parse(localStorage.getItem('notes') || '')
	const newNotes = notes.filter((note: any) => note.id !== id)
	localStorage.setItem('notes', JSON.stringify(newNotes))
}

export function saveNotesToLocalStorage(notes: Note[]): void {
	localStorage.setItem('notes', JSON.stringify(notes))
}

export function isNote(note: any): note is Note {
	return (
		typeof note.id === 'string' &&
		typeof note.title === 'string' &&
		typeof note.content === 'string' &&
		typeof note.color === 'string'
	)
}