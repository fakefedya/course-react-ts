import styles from './Button.module.css'
import cn from 'classnames'
import type { ButtonProps } from './Button.props'

function Button({
	children,
	className,
	appearance = 'small',
	...props
}: ButtonProps) {
	return (
		<button
			className={cn(
				styles['button'],
				styles['accent'],
				styles[appearance],
				className
			)}
			{...props}
		>
			{children}
		</button>
	)
}

export default Button
