"use client"
import Loader from "@/components/atoms/MainPageLoader"
import LocalDrinkIcon from '@mui/icons-material/LocalDrink';

// next-auth
import { useSession } from "next-auth/react"
import LocalNotesContainer from "./components/LocalNotesContainer"
import CloudNotesContainer from "./components/CloudNotesContainer"
import Container from "@/components/atoms/Container"
import { useEffect } from "react"

export default function Home() {
	const { data: session, status } = useSession()

	useEffect(() => {
		// show a welcome modal for the first time
		if (status === 'authenticated' || status === 'unauthenticated') {
			if (localStorage.getItem('first_time') === null) {
				console.log('showing modal');
				(document.getElementById('my_modal_1') as any)?.showModal()
				localStorage.setItem('first_time', 'false')
			}
		}
	}, [status])

	if (status === 'loading') {
		return <Loader />
	}

	return (
		<Container className={`flex flex-col gap-2 transition-all`}>
			<CloudNotesContainer />
			<LocalNotesContainer />

			{/* show a welcome modal for the first time */}
			{/* Open the modal using document.getElementById('ID').showModal() method */}
			<dialog id="my_modal_1" className="modal">
				<div className="modal-box text-center whitespace-nowrap w-auto max-w-fit">
					<h3 className="font-bold text-xl">Welcome to EzNotes!</h3>
					<h4 className="font-bold text-base mb-4">Taking notes have never been so convinient before</h4>
					<div className="flex flex-col gap-2 text-start space-y-4">
						<p className="text-base">🗒️ Cloud notes are stored on the cloud against your account
							<br />
							<span className="text-sm ml-8">• When editing a cloud note, it auto saves after 3 seconds of inactivity</span>
							<br />
							<span className="text-sm ml-8">• You can save a cloud note manually by clicking the save button</span>
						</p>
						<p className="text-base">🗒️ Local notes are stored on the current browser you are on
							<br />
							<span className="text-sm ml-8">• Local notes are saved per key stroke</span>
						</p>
						<p className="mt-4 text-center text-xs">If you love this app please support it by buying me a <a href="https://www.buymeacoffee.com/LassassinX" className="text-amber-200 inline-flex gap-1">Coffee <LocalDrinkIcon className="text-base" /></a></p>
					</div>
					<div className="modal-action flex flex-col items-center">
						<form method="dialog">
							<button className="btn">Let's make a note!</button>
						</form>
					</div>
				</div>
			</dialog>
		</Container>
	)

}