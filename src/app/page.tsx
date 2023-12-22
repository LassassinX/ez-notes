"use client"
import uniqid from 'uniqid'
import { useEffect, useState, Suspense } from 'react'

import { useRouter } from 'next/navigation'

import CreateNoteCard from '@/components/templates/CreateNoteCard'
import NoteCard from '@/components/templates/NoteCard'
import Container from '@/components/atoms/Container'
import { getRandomColor } from '@/utils/colors'
import { deleteNoteFromLocalStorage } from '@/utils/functions'

// auth
import { useSession } from 'next-auth/react'

export default function Home() {
	const { data: session, status } = useSession()
	console.log(session, status)
	const [notes, setNotes] = useState([] as any)
	const { push } = useRouter()

	useEffect(() => {
		// when you hit this page you want to check if the browser's local storage contains notes
		if (!localStorage.getItem('notes')) {
			localStorage.setItem('notes', JSON.stringify([]))
		}

		const rawNotesDataFromLocalStorage = localStorage.getItem('notes') || '';
		setNotes(JSON.parse(rawNotesDataFromLocalStorage));
	}, [])

	const handleNoteCreate = () => {
		// create a new note
		const newNote: Note = {
			id: uniqid(),
			title: 'Untitled Note ' + (notes.length + 1),
			content: '',
			color: getRandomColor()
		}

		// update the local storage
		localStorage.setItem('notes', JSON.stringify([newNote, ...notes]))

		// redirect to the new note
		push(`/note/${newNote.id}`)
	}

	const handleNoteDelete = (id: string) => {
		// delete the note
		const newNotes = notes.filter((note: any) => note.id !== id)

		// update the local storage
		deleteNoteFromLocalStorage(id)

		// update the state 
		setNotes(newNotes)
	}



	return <>
		<Container className='grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))]'>
			<CreateNoteCard onClick={handleNoteCreate} />
			
			{
				<Suspense fallback={<div>Loading...</div>}>
					<Notes notes={notes} handleNoteDelete={handleNoteDelete}/>
				</Suspense>
			}
		</Container>
	</>
}

const Notes = ({ notes, handleNoteDelete }: { notes: Note[], handleNoteDelete: (id: string) => void }) => {
	return <>
		{
			notes.map((note) => {
				return <NoteCard key={note.id} note={note} handleNoteDelete={handleNoteDelete} />
			})
		}
	</>
} 
 