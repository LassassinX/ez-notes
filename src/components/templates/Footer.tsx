import LocalDrinkIcon from '@mui/icons-material/LocalDrink';
import Container from '../atoms/Container';

export default function Footer() {
	return (
		<footer className="footer footer-center bg-base-300 text-base-content">
			<Container className='py-4 bg-base-300 text-base-content w-full'>
				<aside className="flex grow">
					<p className='grow text-start'>
						Made by <a href="https://www.github.com/LassassinX" className="text-primary">@SanjidIslamChowdhury</a> with 💖
					</p>
					<div className="flex gap-1 grow justify-end">
						Buy me a <a href="https://www.buymeacoffee.com/LassassinX" className="text-amber-200 flex gap-1">Coffee <LocalDrinkIcon className='text-lg' /></a>
					</div>
				</aside>
			</Container>
		</footer>
	)
}