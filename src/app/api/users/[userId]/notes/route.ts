import { middleware, isNote, checkSession } from "@/utils/functions";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Note } from "@/utils/types";


const prisma = new PrismaClient()

export async function GET(req: NextRequest, { params }: {
	params: {
		userId: string
	}
}) {
	const { userId } = params

	// query the database for the user's notes
	// return the notes as JSON
	const notes = await prisma.note.findMany({
		where: {
			userId: userId
		}
	})

	return middleware(NextResponse.json({ notes: notes }, { status: 200 }))
}


export async function POST(req: NextRequest, { params }: {
	params: {
		userId: string
	}
}) {
	// create a note on this user's account
	const body: Note = await req.json()
	const { userId } = params

	if (!checkSession())
		return middleware(NextResponse.json({ error: "Unauthorized" }, { status: 401 }))

	if (!isNote(body))
		return middleware(NextResponse.json({ error: "Invalid note body" }, { status: 400 }))
		
	const note = await prisma.note.create({
		data: {
			...body,
			user: {
				connect: {
					id: userId
				}
			}
		}
	})
	
	return NextResponse.json({ note: note }, { status: 200 })
}