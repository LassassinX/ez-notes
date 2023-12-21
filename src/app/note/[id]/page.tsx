"use client";
import { useRouter, notFound } from "next/navigation"

import { useEffect, useState } from "react";
import Loader from "@/components/atoms/Loader";
import NoteWritingPage from "./components/NoteWritingPage";


export default function Page({ params }: {
	params: {
		id: string
	}
}) {
	const { id } = params
	const [note, setNote] = useState(undefined as Note | undefined | false); // Use undefined as initial state
	const router = useRouter();

	useEffect(() => {
		// check if the browser's local storage contains this note
		if (localStorage.getItem('notes')) {
			const notes = JSON.parse(localStorage.getItem('notes') || '')
			const note = notes.find((note: any) => note.id === id)

			setNote(note); // Set noteFound based on whether the note is found or not
		} else {
			setNote(false);
		}
	}, [id, router]);

	// Render loading state while checking
	if (note === undefined) {
		return <Loader />;
	}

	return (
		note ? <NoteWritingPage note={note} /> : notFound() // Render the note page if found, otherwise render 404
	)
}