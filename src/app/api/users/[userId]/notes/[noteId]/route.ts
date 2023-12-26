import { checkSession } from "@/utils/functions"
import { PrismaClient } from "@prisma/client"
import { Session } from "next-auth"
import { NextRequest, NextResponse } from "next/server"

const prisma = new PrismaClient()

const isAuthorized = async (userId: string, session: Session | null) => {

	if (!session) {
		return false
	}

	if (!session.user) {
		return false
	}

	if (session.user.id !== userId) {
		return false
	}

	return true
}

export async function GET(req: NextRequest, { params }: {
	params: {
		userId: string
		noteId: string
	}
}) {
	const { userId, noteId } = params

	const session = await checkSession()

	if (!isAuthorized(userId, session)) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
	}

	// query the database for the user's notes
	const note = await prisma.note.findFirst({
		where: {
			id: noteId,
		},
	})

	// if the note doesn't exist, return an error
	if (!note) {
		return NextResponse.json({ error: "Note not found" }, { status: 404 })
	}

	// return the note
	return NextResponse.json({ note: note }, { status: 200 })
}

// update a note
export async function PATCH(req: NextRequest, { params }: {
	params: {
		userId: string
		noteId: string
	}
}) {
	const session = await checkSession()
	const { userId, noteId } = params
	const { content, title } = await req.json()

	if (!isAuthorized(userId, session)) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
	}
	
	const updateObj: {
		content?: string
		title?: string
	} = {}

	if (content) {
		updateObj["content"] = content
	}

	if (title) {
		updateObj["title"] = title
	}


	// update the note
	const updatedNote = await prisma.note.update({
		where: {
			id: noteId
		},
		data: {
			...updateObj,
		}
	})
	// return the updated note
	return NextResponse.json({ note: updatedNote }, { status: 200 })
}

// delete a note
export async function DELETE(req: NextRequest, { params }: {
	params: {
		userId: string
		noteId: string
	}
}) {
	const session = await checkSession()
	const { userId, noteId } = params

	if (!isAuthorized(userId, session)) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
	}

	// delete the note
	await prisma.note.delete({
		where: {
			id: noteId
		}
	})

	// return success
	return NextResponse.json({ success: true }, { status: 200 })
}