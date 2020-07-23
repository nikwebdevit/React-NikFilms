import React from 'react'

const IconFA = props => {
	return (
		<i
			className={props.faClass}
			style={{ fontSize: `${props.fontSize}px` }}
			title={props.title}
			onClick={props.onPopupPost}
		/>
	)
}

export default IconFA