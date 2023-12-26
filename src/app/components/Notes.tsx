"use client";
import { Note } from '@/utils/types';
import NoteCard from '@/components/templates/NoteCard';

const LocalNotes = ({ notes, handleNoteDelete, handleNoteOnClick }: { notes: Note[]; handleNoteDelete: (id: string) => void; handleNoteOnClick: (id: string) => void }) => {
	return <>
		{notes.map((note) => {
			return <NoteCard key={note.id} note={note} handleNoteDelete={handleNoteDelete} handleNoteOnClick={handleNoteOnClick} />;
		})}
	</>;
};

export default LocalNotes;
