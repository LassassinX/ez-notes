"use client";
import { Note } from '@/utils/types';
import NoteCard from '@/components/templates/NoteCard';

const Notes = ({ notes, handleNoteDelete, handleNoteOnClick, routePrefix }: { notes: Note[]; handleNoteDelete: (id: string) => void; handleNoteOnClick: (id: string) => void, routePrefix: string }) => {
	return <>
		{notes.map((note) => {
			return <NoteCard key={note.id} note={note} handleNoteDelete={handleNoteDelete} handleNoteOnClick={handleNoteOnClick}/>;
		})}
	</>;
};

export default Notes;
