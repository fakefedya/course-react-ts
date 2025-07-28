import styles from './Heading.module.css'
import type { HeadingProps } from './Heading.props'
import cn from 'classnames'

function Heading({ children, className, ...props }: HeadingProps) {
	return (
		<h1 {...props} className={cn(className, styles['h1'])}>
			{children}
		</h1>
	)
}

export default Heading
