import React from "react"

export default function Container({className, children}:{
	className?: string,
	children?: React.ReactNode
}) { 

	return <>
		<div className={`${className ?? ''} p-4 flex gap-4`}>
			{children ?? ''}
		</div>
	</>
}