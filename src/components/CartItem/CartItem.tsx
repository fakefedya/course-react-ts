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
		dispatch(cartActions.add(props.id))
	}

	const remove = () => {}

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
				<div className={styles['currency']}>{props.price}</div>
			</div>
			<div className={styles['actions']}>
				<button className={styles['button']} onClick={decrease}>
					<img src='' alt='Удалить из корзины' />
				</button>
				<div>{props.count}</div>
				<button className={styles['button']} onClick={increase}>
					<img src='' alt='Добавить в корзину' />
				</button>
				<button className={styles['remove']} onClick={increase}>
					<img src='' alt='Очистить корзину' />
				</button>
			</div>
		</div>
	)
}
export default CartItem
