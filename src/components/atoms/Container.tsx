export default function Container({className, children, style}:{
	className?: string,
	children?: React.ReactNode,
	style?: React.CSSProperties
}) { 

	return <>
		<div className={`${className ?? ''} p-4 flex gap-4`} style={style}>
			{children}
		</div>
	</>
}