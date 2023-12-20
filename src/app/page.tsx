import Image from 'next/image'
import CreateNote from '@/components/templates/CreateNote'
import Container from '@/components/atoms/Container'

export default function Home() {
	return <>
		<Container>
			<CreateNote />
		</Container>
	</>
}
