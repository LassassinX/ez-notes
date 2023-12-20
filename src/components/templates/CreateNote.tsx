// plus icon from mui
import AddIcon from '@mui/icons-material/Add';

export default function CreateNote() {
	return <>
		<div className="w-noteCardWidth h-noteCardHeight flex flex-col items-center justify-center gap-6 rounded-lg border-2 border-primary border-dashed p-4 shadow-md select-none
		hover:bg-primary hover:bg-opacity-10 hover:-translate-y-1 transition duration-300 ease-in-out cursor-pointer 
		">
			<AddIcon className="text-primary text-4xl mr-2 border-primary border rounded-full" />
			<p className="text-primary">
				Create Note
			</p>
		</div>
	</>
}