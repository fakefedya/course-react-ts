import './Button.module.css'
import cn from 'classnames'
import type { ButtonProps } from './Button.props'

function Button({ children, className, ...props }: ButtonProps) {
	return (
		<button className={cn('button', 'accent', className)} {...props}>
			{children}
		</button>
	)
}

export default Button
