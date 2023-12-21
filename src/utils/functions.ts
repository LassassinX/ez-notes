
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