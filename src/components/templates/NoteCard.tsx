import Link from 'next/link'
import CrossIcon from '@mui/icons-material/Close';
import { deleteNoteFromLocalStorage } from '@/utils/functions';

export default function NoteCard({
	note,
	handleNoteDelete
}: {
	note: {
		id: string
		title: string
		content: string,
		color: string,
	},
	handleNoteDelete: (id: string) => void
}) {
	const { id, title, content, color } = note

	// set the border and text color
	const style = {
		borderColor: color,
		color: color
	}

	const hoverStyle = {
		backgroundColor: `${color}`,
	}

	return (
		<div className='grow relative group hover:-translate-y-1 transition duration-300 ease-in-out cursor-pointer '>
			<CrossIcon className='text-error text-xl p-1 font-bold absolute z-20 opacity-0 -top-4 -right-4 w-8 h-8 bg-white rounded-full group-hover:opacity-100 transition-all' onClick={()=>{
				handleNoteDelete(id)
			}} />
			<Link href={`/note/${id}`}>
				<div className="h-noteCardHeight flex flex-col items-stretch justify-center gap-6 rounded-lg p-4 shadow-md select-none
		hover:bg-primary hover:bg-opacity-10 transition duration-300 ease-in-out cursor-pointer 
		" style={Object.assign({}, style, hoverStyle)}>
					<p className="text-white w-full bg-black opacity-75 text-center p-2 rounded-lg">
						{title}
					</p>
				</div>
			</Link>
		</div>
	)
}