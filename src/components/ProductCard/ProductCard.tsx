import { Link } from 'react-router-dom'
import styles from './ProductCard.module.css'
import type { ProductCardProps } from './ProductCard.props'
import type { MouseEvent } from 'react'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../../store/store'
import { cartActions } from '../../store/cart.slice'

function ProductCard({ ...props }: ProductCardProps) {
	const dispatch = useDispatch<AppDispatch>()

	const addProduct = (e: MouseEvent) => {
		e.preventDefault()
		dispatch(cartActions.add(props.id))
	}

	return (
		<Link to={`/product/${props.id}`} className={styles['link']}>
			<div className={styles['card']}>
				<div
					className={styles['head']}
					style={{
						backgroundImage: `url('${props.image}')`,
						backgroundRepeat: 'no-repeat',
						backgroundSize: 'cover',
					}}
				>
					<div className={styles['price']}>
						{props.price}&nbsp;
						<span className={styles['currency']}>₽</span>
					</div>
					<button className={styles['add-to-cart']} onClick={addProduct}>
						<img src='/cart-button-icon.svg' alt='Иконка корзины' />
					</button>
					<div className={styles['rating']}>
						{props.rating}&nbsp;
						<img src='rating-icon.svg' alt='Иконка рейтинга' />
					</div>
				</div>
				<div className={styles['footer']}>
					<div className={styles['title']}>{props.name}</div>
					<div className={styles['description']}>{props.description}</div>
				</div>
			</div>
		</Link>
	)
}

export default ProductCard
