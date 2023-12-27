"use client"
import uniqid from 'uniqid'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { useSession } from 'next-auth/react'

import { getRandomColor } from '@/utils/colors'
import Container from '@/components/atoms/Container'
import CreateNoteCard from '@/components/templates/CreateNoteCard'
import { Note } from '@/utils/types'
import ComponentLoader from '@/components/atoms/ComponentLoader'
import Notes from './Notes'
import NProgress from 'nprogress'

export default function CloudNotesContainer() {
	const [notes, setNotes] = useState(undefined as Note[] | undefined)
	const { data: session, status } = useSession()
	const { push } = useRouter()

	useEffect(() => {
		// get notes
		const fetchNotes = async () => {
			const res = await fetch(`/api/users/${session?.user?.id}/notes`)
			const { notes } = await res.json()
			setNotes(notes)
		}

		status === 'authenticated' && fetchNotes()
	}, [status])

	const handleNoteCreate = async () => {
		if (notes === undefined) return
		// create a new note
		const newNote: Note = {
			id: uniqid(),
			title: 'Untitled Note ' + (notes.length + 1),
			content: '',
			color: getRandomColor()
		}

		// add note to db
		await fetch(`/api/users/${session?.user?.id}/notes`, {
			method: 'POST',
			body: JSON.stringify(newNote),
		})

		// update the state
		setNotes([...notes, newNote])

		NProgress.start()
		// redirect to the new note
		push(`/cloud/notes/${newNote.id}`)
	}

	const handleNoteOnClick = (id: string) => {
		NProgress.start()
		
		push(`/cloud/notes/${id}`)
	}

	const handleNoteDelete = async (id: string) => {
		// delete the note
		if (notes === undefined) return

		const newNotes = notes.filter((note: any) => note.id !== id)
		NProgress.start()
		// add note to db
		await fetch(`/api/users/${session?.user?.id}/notes/${id}`, {
			method: 'DELETE',
		})

		NProgress.done()
		// update the state 
		setNotes(newNotes)
	}

	const RenderedContent = () => {
		if (status === 'loading') return <ComponentLoader />
		if (!session) return <div className='text-primary'>Sign in to create cloud notes</div>
		if (session) return <>
			<Container className='grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] !p-0'>
				<CreateNoteCard onClick={handleNoteCreate}>Create Cloud Note</CreateNoteCard>
				{
					notes === undefined ? <div className='flex items-center justify-center'><ComponentLoader /></div> :
					<Notes handleNoteDelete={handleNoteDelete} handleNoteOnClick={handleNoteOnClick} routePrefix="/cloud" notes={notes} />
				}
			</Container>
		</>
	}

	return <>
		<div className="divider divider-start divider-primary text-primary font-bold mb-0">
			Cloud Notes
		</div>
		<RenderedContent />
	</>
}
