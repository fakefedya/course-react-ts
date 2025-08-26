import { useDispatch } from 'react-redux'
import styles from './CartItem.module.css'
import type { CartItemProps } from './CartItem.props'
import type { AppDispatch } from '../../store/store'
import { cartActions } from '../../store/cart.slice'

function CartItem(props: CartItemProps) {
	const dispatch = useDispatch<AppDispatch>()

	const increase = () => {
		dispatch(cartActions.add(props.id))
	}

	const decrease = () => {
		dispatch(cartActions.remove(props.id))
	}

	const remove = () => {
		dispatch(cartActions.clear(props.id))
	}

	return (
		<div className={styles['item']}>
			<div
				className={styles['image']}
				style={{
					backgroundImage: `url('${props.image}')`,
					backgroundRepeat: 'no-repeat',
					backgroundSize: 'cover',
				}}
			></div>
			<div className={styles['description']}>
				<div className={styles['name']}>{props.name}</div>
				<div className={styles['price']}>{props.price} ₽</div>
			</div>
			<div className={styles['actions']}>
				<button className={styles['minus']} onClick={decrease}>
					<img src='/minus.svg' alt='Удалить из корзины' />
				</button>
				<div className={styles['count']}>{props.count}</div>
				<button className={styles['plus']} onClick={increase}>
					<img src='/plus.svg' alt='Добавить в корзину' />
				</button>
				<button className={styles['remove']} onClick={remove}>
					<img src='/clear.svg' alt='Очистить корзину' />
				</button>
			</div>
		</div>
	)
}
export default CartItem
