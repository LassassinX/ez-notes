"use client";
import { notFound } from "next/navigation"
import { useEffect, useState } from "react";

import { useSession } from "next-auth/react";

import Loader from "@/components/atoms/MainPageLoader";
import NoteWritingPage from "./components/NoteWritingPage";
import { Note } from "@/utils/types";


export default function Page({ params }: {
	params: {
		id: string
	}
}) {
	const { id } = params
	const { data: session, status } = useSession();

	const [note, setNote] = useState(undefined as Note | undefined | false); // Use undefined as initial state

	const fetchNote = async () => {
		const res = await fetch(`/api/users/${session?.user?.id}/notes/${id}`);
		const data = await res.json();

		if (data.error) {
			setNote(false);
			return;
		}

		setNote(data.note);
	}

	useEffect(() => {
		if (status === 'authenticated') {
			fetchNote();
		}
	}, [status])

	// Render loading state while checking
	if (note === undefined || status === 'loading') {
		return <Loader />;
	}

	return (
		note ? <NoteWritingPage note={note} setNote={setNote} /> : notFound() // Render the note page if found, otherwise render 404
	)
}