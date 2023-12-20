import React from "react"

export default ({className, children}:{
	className?: string,
	children?: React.ReactNode
}) => { 

	return <>
		<div className={`${className ?? ''} p-8 flex gap-4`}>
			{children ?? ''}
		</div>
	</>
}