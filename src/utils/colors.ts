const colors = [
	'#00ffcc', '#07c8f9', '#f61379', '#ffff00', '#ff690f'
];
	
const getRandomColor = () => {
	return colors[Math.floor(Math.random() * colors.length)];
}

export { colors, getRandomColor};