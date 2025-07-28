import { forwardRef } from 'react'
import styles from './Search.module.css'
import cn from 'classnames'
import type { SearchProps } from './Search.props'

const Search = forwardRef<HTMLInputElement, SearchProps>(function Input(
	{ isValid = true, className, ...props },
	ref
) {
	return (
		<div className={styles['search-wrapper']}>
			<input
				ref={ref}
				className={cn(className, styles['search'], {
					[styles['invalid']]: isValid,
				})}
				{...props}
			/>
			<img
				className={styles['search-icon']}
				src='/search-icon.svg'
				alt='Иконка поиска'
			/>
		</div>
	)
})

export default Search
