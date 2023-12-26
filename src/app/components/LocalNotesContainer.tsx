"use client"
import uniqid from 'uniqid'
import { useEffect, useState, Suspense } from 'react'

import { useRouter } from 'next/navigation'

import CreateNoteCard from '@/components/templates/CreateNoteCard'
import Container from '@/components/atoms/Container'
import { getRandomColor } from '@/utils/colors'
import { deleteNoteFromLocalStorage } from '@/utils/functions'
import ComponentLoader from '@/components/atoms/ComponentLoader'

import LocalNotes from './Notes'
import { Note } from '@/utils/types'


export default function LocalNotesContainer() {
	const [notes, setNotes] = useState(undefined as any | [])
	const { push } = useRouter()

	useEffect(() => {
		async function load() {
			// when you hit this page you want to check if the browser's local storage contains notes
			if (!localStorage.getItem('notes')) {
				localStorage.setItem('notes', JSON.stringify([]))
			}

			setTimeout(() => {
				const rawNotesDataFromLocalStorage = localStorage.getItem('notes') || '';
				setNotes(JSON.parse(rawNotesDataFromLocalStorage));
			}, 0)
		}


		load()
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
		push(`/local/notes/${newNote.id}`)
	}

	const handleNoteDelete = (id: string) => {
		// delete the note
		const newNotes = notes.filter((note: any) => note.id !== id)

		// update the local storage
		deleteNoteFromLocalStorage(id)

		// update the state 
		setNotes(newNotes)
	}

	const handleNoteOnClick = (id: string) => {
		// redirect to the note
		push(`/local/notes/${id}`)
	}

	return <>
		<div className="divider divider-start divider-primary text-primary font-bold mb-0">
			Local Notes
		</div>
		<Container className='grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] !p-0'>
			<CreateNoteCard onClick={handleNoteCreate}>Create Local Note</CreateNoteCard>
			{
				notes === undefined ? <div className='self-center mx-auto'><ComponentLoader /></div> : <LocalNotes notes={notes} handleNoteDelete={handleNoteDelete} handleNoteOnClick={handleNoteOnClick} />
			}

		</Container>
	</>
}
